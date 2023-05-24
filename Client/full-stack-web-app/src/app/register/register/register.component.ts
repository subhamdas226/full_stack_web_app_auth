import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  
 

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router:Router
    ) { }

  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      Name: ['', [Validators.required] ],
    Email: ['', [Validators.required]],
    Phone: ['', [Validators.required]],
    Password: ['', [Validators.required]],
    })
  }
  OnSubmit(){
    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      // Handle invalid form data
      return;
    }
    this._auth.registerCandidate(this.registerForm.value).subscribe(
      (      res: any) =>{
        console.log("res:",res)
        localStorage.setItem('token',res.token);
        this._router.navigate(['./main-page'],{ queryParams: { 
          name : this.registerForm.value.Name, email:this.registerForm.value.Email 
        } } )
        
      },
      (      err: any) =>{
        console.log("etr",err);
      }
    )
  }
}
