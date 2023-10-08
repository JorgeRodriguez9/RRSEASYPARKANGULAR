import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParkingLot } from 'Models/ParkingLot';
import { Reservation } from 'Models/Reservation';
import { TypeVehicle } from 'Models/TypeVehicle';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tile } from 'Interfaces/Tile';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';
import { ReservationService } from 'src/app/service/reservation/reservation.service';
import { TypeVehicleService } from 'src/app/service/typeVehicle/type-vehicle.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  public ListVehicles: TypeVehicle[] = [];
  public ListVehiclesFilter: TypeVehicle[] = [];
  id!: string;
  park!: ParkingLot
  parking!: ParkingLot;
  
  public reservationform = new FormGroup({
    id: new FormControl(''),
    startdate: new FormControl(''),
    enddate: new FormControl(''),
    totalPrice: new FormControl(''),
    Disable: new FormControl(''),
    parkingType: new FormControl(''),
    vehicleType: new FormControl('')
  });

  dataSource = new MatTableDataSource<Reservation>();
  displayedColumns: string[] = ['startdate', 'enddate', 'totalPrice', 'Disable', 'parkingType', 'vehicleType'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;//! le estamos diciendo que no es nulo
  //esta línea de código está configurando una referencia al paginador de Angular Material
  //para que pueda ser utilizado y manipulado en el componente donde se encuentra esta declaración

  UpdateList(NewValue: any) {
    console.log(NewValue)
    if (NewValue == "SI") {
      this.ListVehiclesFilter = this.ListVehicles.filter(x => x.disabilityEnable === true)
    } else {
      this.ListVehiclesFilter = this.ListVehicles
    }
  }

  constructor(private _typeVehicle: TypeVehicleService, private _ReservationService: ReservationService, private route: ActivatedRoute, private router: Router, private _parkingLot: ParkingLotService, private formBuilder: FormBuilder, private fb: FormBuilder) {

    this.reservationform = this.fb.group({

      startdate: [''],
      enddate: [''],
      parkingType: [''],
      vehicleType: ['']
    })
  }
    AddReservation() {
      
      let startdate = this.reservationform.value.startdate? new Date(this.reservationform.value.startdate):new Date();
      let enddate = this.reservationform.value.enddate? new Date(this.reservationform.value.enddate):new Date();
      const model: Reservation = {
        startdate: startdate,
        enddate: enddate,
        parkingType: "",
        vehicleType: "",
        id: '',
        totalPrice: 0,
        Disable: ''
      }
      console.log(model);
      this._ReservationService.AddReservation(model).subscribe(
        {

          next: (data) => {
            console.log(data);
          }, error: (e) => { }

        }
      )

      //this.aRoute.paramMap.subscribe(params => {
      // const elementJson = params.get('id');
      // if(elementJson){
      //  const element = JSON.parse(decodeURIComponent(elementJson));
      //  this.id = element;
      //}

      // });

    }
    ngOnInit(): void {
      this.getTypeVehicle();

      this.route.params.subscribe(params => {
        this.id = params['id']
      })

      this.getParkingLot();

    }
    getTypeVehicle() {
      this._typeVehicle.getTypeVehicle().subscribe(response => { this.ListVehicles = response; this.ListVehiclesFilter = this.ListVehicles });
    }

    getParkingLot() {
      this._parkingLot.getParkingLot(this.id).subscribe(data => {
        this.parking = data;
      })
    }

  }