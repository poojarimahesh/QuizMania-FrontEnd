import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public loginStatusSubject = new Subject<boolean>();
  //generate Token
  public generateToken(loginDetails :any){
    localStorage.clear();
    return this.http.post(`${baseUrl}/auth/authenticate`,loginDetails);
  }

  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  } 
  public isLogedIn(){
    let tokenStr=localStorage.getItem('token');
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
    return false;
  else
    return true;
  }

  // logout
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');

  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }
  
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/auth/current-user`);

  }
}
