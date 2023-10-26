import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingLot } from 'Models/ParkingLot';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';

@Component({
  selector: 'app-view-parkinglots',
  templateUrl: './view-parkinglots.component.html',
  styleUrls: ['./view-parkinglots.component.css']
})
export class ViewParkinglotsComponent implements OnInit{

  public list: ParkingLot[] = [];

  constructor(private _ParkingLotService: ParkingLotService, private router: Router){

  }
  ngOnInit(): void {
    this.getParkingLots();
  }
  getParkingLots() {
    this._ParkingLotService.getParkingLotsPropietary().subscribe(response => { this.list = response; });
  }
  reserva(parking: any) {
    this.router.navigate([`/viewReservation/${parking.id}`]);
  }
}
