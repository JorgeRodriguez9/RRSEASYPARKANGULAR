import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, Subject } from 'rxjs';
import { Responses } from 'Models/Response';
import { environment } from 'src/environments/environment.development';
import { User } from 'Models/User';
import { UserPost } from 'Models/UserPost';
import { Login } from 'Models/Login';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
//import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiUser/Login";



  public get userData(): User | null{
    return this.userSubject.value;
  }
 // private userSubject = new BehaviorSubject<User>();
  private userSubject = new BehaviorSubject<User | null>(null);
  public useer! :Observable<User | null>;

  

  constructor(private _http: HttpClient, private router : Router) { 

    const storedUser = localStorage.getItem('Usuario');
/*
    if (storedUser !== null) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(storedUser));
    } 
    */
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        this.userSubject = new BehaviorSubject<User | null>(parsedUser);
      } 
    } 
    this.useer = this.userSubject.asObservable();
  }

    login(login: Login): Observable<Responses>{

      const Password = login.Password;
      const nameUser = login.nameUser;
      
     return this._http.post<Responses>(this.Endpoint + this.complement,{nameUser, Password}).pipe(
      map(res => {
        if(res.result == 0){
          
           const user: User = res.data;
           localStorage.setItem('Usuario', JSON.stringify(user));
           this.userSubject.next(user);
           console.log(user);
        }
        return res;
      })
     );
}

getTokenUserInfo(): UserPost | null{

  const token = localStorage.getItem('Usuario');

  if (token) {
    const user = jwt_decode(token) as UserPost;
    
  console.log(user.Id); // Acceso al ID del usuario
  console.log(user.Name); // Acceso al nombre del usuario
  console.log(user.RolId); // Acceso al ID del rol del usuario
    return user;
  }


  return null;
  
}

logout(){
  localStorage.removeItem('Usuario');
  this.userSubject.next(null);
  this.router.navigate(['/Login']);
}


  

}
