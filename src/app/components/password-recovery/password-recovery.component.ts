import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Recovery } from 'Models/Recovery';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {

  form: FormGroup;


constructor(private _snackBar: MatSnackBar,private fb: FormBuilder,public _apiauth: AuthService, private _router: Router){
  this.form = this.fb.group({
    email: ['', Validators.required]
  })
}

recovery(){

const email: Recovery = {
  email: this.form.value.email,
} 

this._apiauth.recovery(email).subscribe({ 
  next: (data) => {
    
    console.log(data);

    if(data.result == 0){
      this._snackBar.open('El correo se envio exitosamente', 'Cerrar', {
        duration: 3000, 
      });
      this._router.navigate(['/Login']);
      
    }

  }, error: (e) => {
    console.error(e);

   }
 });
}

}
