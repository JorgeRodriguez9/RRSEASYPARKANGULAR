import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserPost } from 'Models/UserPost';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RolserviceService } from 'src/app/service/rol/rolservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user! : UserPost | null;
  id! : string;

/*  public loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });*/

  public loginForm = this.fb.group({
    nameUser: ['', Validators.required],
    Password: ['', Validators.required]
  });
  /*new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });*/

constructor(public _apiauth: AuthService, private _router: Router, private fb: FormBuilder, public _rolService: RolserviceService) {
  if(this._apiauth.userData){
    this._router.navigate(['/ParkingLot'])
  }
}

  ngOnInit(): void {
    
  }

  login(){
    
     this._apiauth.login(this.loginForm.value).subscribe(response =>{
      if(response.result == 0){
        const user = this._apiauth.getTokenUserInfo()
        if(user){
          this.id = user.RolId;
        }

        this._rolService.getRol(this.id).subscribe(data =>{
          const roleName = data.name;
          if (roleName && roleName == 'Propietary Park') {
            this._router.navigate(['/Reservation']);
          }
          if (roleName && roleName == 'Client') {
            this._router.navigate(['/ParkingLot']);
          }
        });
        
      }});
   
  }
}
