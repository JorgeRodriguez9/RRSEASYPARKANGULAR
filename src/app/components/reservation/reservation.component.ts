import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkingLot } from 'Models/ParkingLot';
import { TypeVehicle } from 'Models/TypeVehicle';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';
import { TypeVehicleService } from 'src/app/service/typeVehicle/type-vehicle.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  public ListVehicles: TypeVehicle[] = [];
  id!: string;
  park!: ParkingLot
  parking!: ParkingLot;


  constructor(private _typeVehicle: TypeVehicleService, private route: ActivatedRoute, private _parkingLot: ParkingLotService) {

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
      this.id = params ['id']
    })

    this.getParkingLot();    

  }
  getTypeVehicle() {
    this._typeVehicle.getTypeVehicle().subscribe(response => { this.ListVehicles = response; });
  }

  getParkingLot() {
    this._parkingLot.getParkingLot(this.id).subscribe(data => {
      this.parking = data;
    })
  }

}


