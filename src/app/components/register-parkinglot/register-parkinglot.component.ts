import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from 'Models/City';
import { ParkingLot } from 'Models/ParkingLot';
import { CityService } from 'src/app/service/city/city.service';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';

@Component({
  selector: 'app-register-parkinglot',
  templateUrl: './register-parkinglot.component.html',
  styleUrls: ['./register-parkinglot.component.css']
})
export class RegisterParkinglotComponent implements OnInit {

  images:string="assets/images/Logo.jpg";
  public numImg:number=0;
  public i:number=0;
  public imagen:Array<string> = [this.images]
  form: FormGroup;
  select: boolean = false;
  select2: boolean = false;
  public ListCities: City[] = [];




  constructor(private _CityService: CityService, private _ParkingLotService: ParkingLotService,private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      adress: [''],
      nit: [''],
      telephone: [''],
      normalPrice: [''],
      disabilityPrice: [''],
      info: [''],
      cantSpacesMotorcycle: [''],
      cantSpacesCar: [''],
      cantSpacesDisability: [''],
      disabilityservices: [''],
      cityId: ['']
    })
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

  onSeleccionChange() {
    this.select = true;
  }
  onSelectChange() {
    this.select2 = true;
  }

  ngOnInit(): void {
    this.getCity();
  }

  getCity() {
    this._CityService.getCity().subscribe(response => { this.ListCities = response; });
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
      disabilityservices: this.form.value.disabilityservices,
      image: JSON.stringify(this.imagen[0]),
      cityId: this.form.value.cityId,
      cityName: "",
      propietaryParkId: ""
    }
    console.log(model);
    this._ParkingLotService.AddParkingLot(model).subscribe(
      {

        next: (data) => {
          console.log(data);
        }, error: (e) => { }
      })
  }
 
}
