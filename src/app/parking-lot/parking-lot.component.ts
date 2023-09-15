import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ParkingLotService } from '../service/parkingLot/parking-lot.service';
import { ParkingLot } from 'Models/ParkingLot';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from 'Models/City';
import { CityService } from '../service/city/city.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css'],
  
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]  
  
})
export class ParkingLotComponent implements OnInit, AfterViewInit {
  public list : ParkingLot[] = [];
  public ListCities : City[] = [];
  dataSource = new MatTableDataSource<ParkingLot>();
  displayedColumns: string[] = ['Name', 'Adress', 'City'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: ParkingLotComponent | null;
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;//! le estamos diciendo que no es nulo
  //esta línea de código está configurando una referencia al paginador de Angular Material
  //para que pueda ser utilizado y manipulado en el componente donde se encuentra esta declaración

  cityform!: FormGroup;
  form!: FormGroup;

constructor(private _ParkingLotService:ParkingLotService, private _CityService:CityService, private formBuilder: FormBuilder, private fb: FormBuilder){ 
  
  this.cityform = this.fb.group({
    selectedCity: [''],
    filterValue: ['']
  });

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
}
getParkingLots(){
  this._ParkingLotService.getParkingLots().subscribe(response =>{ this.dataSource.data = response;});
}
getCity(){
  this._CityService.getCity().subscribe(response =>{ this.ListCities = response;});
}
/*
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  this.dataSource.filterPredicate = (data, filter) => {
    return data.adress.toLowerCase().includes(filter);
  };

  // La función filterPredicate toma dos argumentos: data (que representa un elemento de tu fuente de datos) 
  //y filter (que es el valor que se está utilizando para filtrar).

  //En este caso, la función de filtro personalizada verifica si el name de data incluye el filtro proporcionado. 
}

applyFilterCity(event: MatSelectChange) {
  const selectedCity = event.value;

  if (selectedCity) {
    this.dataSource.filter = selectedCity.toString();
    this.dataSource.filterPredicate = (data, filter) => {
      return data.cityId.toString() === filter;
    };
  } else {
    this.dataSource.filter = '';
  }
}
*/
applyCityFilter() {
  const selectedCityControl = this.cityform.get('selectedCity');
  const filterValueControl = this.cityform.get('filterValue');

  if (selectedCityControl && filterValueControl) {
    const selectedCity = selectedCityControl.value;
    const filterValue = filterValueControl.value;

    this.dataSource.filter = JSON.stringify({ selectedCity, filterValue });
    //esta cogiendo selectedCity y filterValue, y los une y los convierte en una cadena de texto. Esto le dice al programa qué buscar en los datos.
    //en resumen esta asignando como sera el filtro que necesita

    this.dataSource.filterPredicate = (data, filters) => {
    const { selectedCity, filterValue } = JSON.parse(filters);

    //filterPredicate: aqui le decimos que muestre solo los objetos que cumplan con ciertas condiciones que yo extablesco
    //filterPredicate se ejecuta automáticamente en cada dato cuando se aplica el filtro en la interfaz de usuario.
    let cityFilter = true;
    if (selectedCity) {
      cityFilter = data.cityId.toString() === selectedCity.toString();
    }

    let textFilter = true;
    if (filterValue) {
      textFilter = data.adress.toLowerCase().includes(filterValue.toLowerCase());
    }

    return cityFilter && textFilter;

  };
  if (!filterValue) {
    this.dataSource.filter = JSON.stringify({ selectedCity, filterValue: '' });
  }
  } else {
    console.error('Alguno de los controles no está definido.');
  }

  

  
}
}
