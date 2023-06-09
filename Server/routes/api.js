const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../model/user')


const secretKey = 'mySecretKey';

// Middleware to check if user is authenticated
function checkAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send('Invalid token');
  }
}

// Protected route that requires authentication
router.get('/protected', checkAuth, (req, res) => {
    res.status(200).send(`Authorised`);
  });

router.post('/register', (req, res) => {
    let user = req.body;
    let newUser = new User({
        name: req.body.Name,
        email: req.body.Email,
        phone: req.body.Phone,
        passwordHash: bcrypt.hashSync(req.body.Password, 10)
    });
    console.log(req.body);
    newUser.save((err, data) => {
        if (err) {
            console.log("error in saving", err);
            res.status(403).send(err);
        }
        else {
            let payload = { subject: data._id };
            let token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

            res.status(200).send({ token });
        }
    })
  
})

router.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    const key = 'secretKey';

    if (!user) {
        return res.status(400).send('user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userID: user.id,
            },
            key,
            {
                expiresIn: '1d'
            }
        )
        res.cookie('token', token, {
            expires: Date.now() + 3600 * 1000,
            httpOnly  : true
        });
        res.status(200).send({ name: user.name, email: user.eamil, token: token });
    }
    else {
        return res.status(400).send('Incorrect Username or password')
    }

})

module.exports = router;
