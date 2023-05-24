import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn():boolean {
    return !!localStorage.getItem('token');
  }

  loggedOut():boolean{
     localStorage.removeItem('token');
     return true;
  }

  constructor(private http:HttpClient) { }
  
  
  private nregisterUrl = "http://localhost:3100/api/register";
  private loginUrl = "http://localhost:3100/api/login"
 
  registerCandidate(candidate:any) {
    
    return this.http.post<any>(this.nregisterUrl,candidate)
  } 
  
  loginUser(user:any){
    return this.http.post<any>(this.loginUrl, user)
  }
}
