import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  
  private url = `http://localhost:3100/api`;
  private nregisterUrl = "http://localhost:3100/api/register";
  private loginUrl = "http://localhost:3100/api/login"
 
  registerCandidate(candidate:any) {
    
    return this.http.post<any>(this.nregisterUrl,candidate,{
      withCredentials: true
    })
  } 
  
  loginUser(user:any){
    return this.http.post<any>(this.loginUrl, user, {
      withCredentials: true
    })
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(this.url + "/protected", { withCredentials: true });
  }
}
