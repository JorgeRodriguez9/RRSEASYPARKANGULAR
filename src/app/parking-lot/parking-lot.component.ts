import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ParkingLotService } from '../service/parkingLot/parking-lot.service';
import { ParkingLot } from 'Models/ParkingLot';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from 'Models/City';
import { CityService } from '../service/city/city.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css']
})
export class ParkingLotComponent implements OnInit, AfterViewInit {
  public list : ParkingLot[] = [];
  public ListCities : City[] = [];
  dataSource = new MatTableDataSource<ParkingLot>();
  displayedColumns: string[] = ['Name', 'Adress', 'City']

  @ViewChild(MatPaginator) paginator!: MatPaginator;//! le estamos diciendo que no es nulo
  //esta línea de código está configurando una referencia al paginador de Angular Material
  //para que pueda ser utilizado y manipulado en el componente donde se encuentra esta declaración
  @ViewChild(MatSort) sort!: MatSort;

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
    cityId: "",
    cityName: "",
    propietaryParkId: ""
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
  this.getParkingLots();
  this.getCity();
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
getParkingLots(){
  this._ParkingLotService.getParkingLots().subscribe(response =>{ this.dataSource.data = response;});
}
getCity(){
  this._CityService.getCity().subscribe(response =>{ this.ListCities = response;});
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
