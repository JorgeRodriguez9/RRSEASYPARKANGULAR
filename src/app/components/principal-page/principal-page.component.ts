import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.css']
})
export class PrincipalPageComponent implements OnInit{
images:string="assets/images/Logo.jpg";
public numImg:number=0;
public i:number=0;
public imagen:Array<string> = [this.images]
public loginForm = this.fb.group({
  nameUser: ['', Validators.required],
  Password: ['', Validators.required]
});
constructor(private fb: FormBuilder,private _ParkingLotService: ParkingLotService) { }
ngOnInit(): void {
  
}

getImage(event: any, num: number) {
  //console.log(event)
  this.numImg = num;
  this.imgToBase64(event.target.files[0]);
  //console.log(this.publication.images);
}
private imgToBase64(file: Blob) {
  if (file) {
    const reader = new FileReader();

    reader.onload = this.toBase64.bind(this);

    reader.readAsBinaryString(file);
    return file;
  }
  return null;
}
toBase64(e: any) {
  if (this.imagen[this.numImg] != null) {
this.imagen[this.numImg] = (btoa(e.target.result));
  } else {
    this.imagen[this.numImg] =  (btoa(e.target.result))
  }
}
add(){
  console.log(this.imagen[0]);
this._ParkingLotService.AddImages(this.imagen[0]).subscribe(x=>{console.log(x.errorMessage)})
}

}
