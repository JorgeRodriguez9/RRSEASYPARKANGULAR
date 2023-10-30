import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { City } from 'Models/City';
import { ParkingLot } from 'Models/ParkingLot';
import { ParkingLotEdit } from 'Models/ParkingLotEdit';
import { CityService } from 'src/app/service/city/city.service';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';

@Component({
  selector: 'app-modify-parking-lot',
  templateUrl: './modify-parking-lot.component.html',
  styleUrls: ['./modify-parking-lot.component.css']
})
export class ModifyParkingLotComponent {

  id!: string;
  parking!: ParkingLot;
  inputsHabilitados = false;
  public ListCities: City[] = [];
  images:string="assets/images/Logo.jpg";
  public numImg:number=0;
  form: FormGroup;
  public i:number=0;
  public imagen:Array<string> = [this.images]
  
constructor(private _snackBar: MatSnackBar, private fb: FormBuilder, private route: ActivatedRoute, private _parkingLot: ParkingLotService, private _CityService: CityService){
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


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id']
    })

    this.getParkingLot();
    this.getCity();

  }

  getParkingLot() {
    this._parkingLot.getParkingLot(this.id).subscribe(data => {
      this.parking = data;
      console.log(data);
    })
  }
  toggleInput(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    inputElement.disabled = !inputElement.disabled;
  }
  getCity() {
    this._CityService.getCity().subscribe(response => { this.ListCities = response; });
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
  AddParkingLot() {
    const model: ParkingLotEdit = {
      id: this.id,
      name: this.form.value.name || this.parking.name,
      adress: this.form.value.adress || this.parking.adress,
      nit: this.form.value.nit || this.parking.nit,
      telephone: this.form.value.telephone || this.parking.telephone,
      normalPrice: this.form.value.normalPrice || this.parking.normalPrice,
      disabilityPrice: this.form.value.disabilityPrice || this.parking.disabilityPrice,
      info: this.form.value.info || this.parking.info,
      cantSpacesMotorcycle: this.form.value.cantSpacesMotorcycle || this.parking.cantSpacesMotorcycle,
      cantSpacesCar: this.form.value.cantSpacesCar || this.parking.cantSpacesCar,
      cantSpacesDisability: this.form.value.cantSpacesDisability || this.parking.cantSpacesDisability,
      disabilityservices: this.form.value.disabilityservices || this.parking.disabilityservices,
      image: this.imagen[0] || this.parking.image,
      cityId: this.form.value.cityId || this.parking.cityId
    }
    console.log(model);
    this._parkingLot.UpdateParkingLot(model).subscribe(
      {

        next: (data) => {
          console.log(data);

        this._snackBar.open('Parqueadero modificado correctamente', 'Cerrar', {
          duration: 3000, 
        });

        this.form.reset();
        }, error: (e) => {
          console.error(e);
          this._snackBar.open('Parqueadero no modificado correctamente', 'Cerrar', {
            duration: 3000, 
          });
         }
      })
  }
}
