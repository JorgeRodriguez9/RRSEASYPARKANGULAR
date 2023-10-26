import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientParkingLotPost } from 'Models/ClientParkingLotPost';
import { Login } from 'Models/Login';
import { PropietaryParkPost } from 'Models/PropietaryParkPost';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ClientService } from 'src/app/service/client/client.service';
import { PropietaryParkService } from 'src/app/service/propietaryPark/propietary-park.service';
import { RolserviceService } from 'src/app/service/rol/rolservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showPassword = false;
  password: string = '';
  form: FormGroup;
  id! : string;

  constructor(private fb: FormBuilder, private _clientService: ClientService, private _propietaryService: PropietaryParkService, private _apiauth: AuthService, private _rolService: RolserviceService, private _router: Router) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      identification: [''],
      telephone: [''],
      nameUser: [''],
      password: [''],
      rol: [''],
    })
  }

  register() {
    const rol = this.form.value.rol;

    if (rol === "Client") {
      const model: ClientParkingLotPost = {
        name: this.form.value.name,
        identification: this.form.value.identification,
        email: this.form.value.email,
        telephone: this.form.value.telephone,
        nameUser: this.form.value.nameUser,
        password: this.form.value.password,
        rol: this.form.value.rol,
      }
      this._clientService.AddClient(model).subscribe();

      const log: Login = {
        nameUser: this.form.value.nameUser,
        Password: this.form.value.password,
      } 

      this._apiauth.login(log).subscribe(response =>{
        if(response.result == 0){
          const user = this._apiauth.getTokenUserInfo()
          if(user){
            this.id = user.RolId;
          }
  
          this._rolService.getRol(this.id).subscribe(data =>{
            const roleName = data.name;
            if (roleName && roleName == 'Propietary Park') {
              this._router.navigate(['/ViewParkingLot']);
            }
            if (roleName && roleName == 'Client') {
              this._router.navigate(['/ParkingLot']);
            }
          });
          
        }});
    }
    if (rol === "Propietary Park") {
      const model: PropietaryParkPost = {
        name: this.form.value.name,
        identification: this.form.value.identification,
        email: this.form.value.email,
        telephone: this.form.value.telephone,
        nameUser: this.form.value.nameUser,
        password: this.form.value.password,
        rol: this.form.value.rol,
      }
      this._propietaryService.AddPropietary(model).subscribe();

      const log: Login = {
        nameUser: this.form.value.nameUser,
        Password: this.form.value.password,
      } 

      this._apiauth.login(log).subscribe(response =>{
        if(response.result == 0){
          const user = this._apiauth.getTokenUserInfo()
          if(user){
            this.id = user.RolId;
          }
  
          this._rolService.getRol(this.id).subscribe(data =>{
            const roleName = data.name;
            if (roleName && roleName == 'Propietary Park') {
              this._router.navigate(['/ViewParkingLot']);
            }
            if (roleName && roleName == 'Client') {
              this._router.navigate(['/ParkingLot']);
            }
          });
          
        }});
    }


  }

}
