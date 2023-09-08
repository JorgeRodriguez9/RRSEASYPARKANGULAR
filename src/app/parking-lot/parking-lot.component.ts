import { Component, OnInit } from '@angular/core';
import { ParkingLotService } from '../service/parking-lot.service';
import { ParkingLot } from 'Models/ParkingLot';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from 'Models/City';
import { CityService } from '../service/city/city.service';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css']
})
export class ParkingLotComponent implements OnInit {
  public list : ParkingLot[] = [];
  public ListCities : City[] = [];
  form: FormGroup;
constructor(private _ParkingLotService:ParkingLotService, private _CityService:CityService, private formBuilder: FormBuilder){ 
  this.form = this.formBuilder.group({
    name: [''],
    adress:[''],
    nit:[''],
    telephone:[''],
    normalPrice:[''],
    disabilityPrice:[''],
    info:[''],
    cantSpacesMotorcycle: [''],
    cantSpacesCar: [''], 
    cantSpacesDisability: ['']
    }) 
}

AddParkingLot() {
  const model: ParkingLot = {
    id: "",
    name: this.form.value.name,
    adress: this.form.value.adress,
    nit: this.form.value.nit,
    telephone: this.form.value.telephone,
    normalPrice: this.form.value.normalPrice,
    disabilityPrice: this.form.value.disabilityPrice,
    info: this.form.value.info,
    cantSpacesMotorcycle: this.form.value.cantSpacesMotorcycle,
    cantSpacesCar: this.form.value.cantSpacesCar,
    cantSpacesDisability: this.form.value.cantSpacesDisability,
    CityId: "",
    PropietaryParkId: ""
  }
  console.log(model);
  this._ParkingLotService.AddParkingLot(model).subscribe(
    {

      next: (data) => {
        console.log(data);
      }, error: (e) => { }

    }
  )
}

ngOnInit(): void {
  //this.getParkingLot();
  this.getCity();
}
getParkingLot(){
  this._ParkingLotService.getParkingLots().subscribe(response =>{ this.list = response;});
}
getCity(){
  this._CityService.getCity().subscribe(response =>{ this.ListCities = response;});
}
}
