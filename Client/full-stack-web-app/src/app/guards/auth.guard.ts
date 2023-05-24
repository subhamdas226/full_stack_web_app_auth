import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private _router: Router,
    ){}

  canActivate(): boolean {
    if(this.authService.loggedIn()){

      const token = localStorage.getItem('token');
      console.log("AuthGuard 1")
      console.log(token)
      if(token){
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        console.log(tokenDecode)
        if(!tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
          return true;
        }
      }
      //this._router.navigate(['/admin-panel'])
      return false;
    }
    else{
      this._router.navigate(['/register'])
      return false
    }
  }
  private _tokenExpired(exp: any) {
    return Math.floor(new Date().getTime() / 1000) >= exp;
  }
};
