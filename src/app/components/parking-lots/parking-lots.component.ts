import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingLot } from 'Models/ParkingLot';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';

@Component({
  selector: 'app-parking-lots',
  templateUrl: './parking-lots.component.html',
  styleUrls: ['./parking-lots.component.css']
})
export class ParkingLotsComponent {
  public list: ParkingLot[] = [];

  constructor(private _ParkingLotService: ParkingLotService, private router: Router){

  }
  ngOnInit(): void {
    this.getParkingLots();
  }
  getParkingLots() {
    this._ParkingLotService.getParkingLotsPropietary().subscribe(response => { this.list = response; });
  }
  modify(parking: any) {
    this.router.navigate([`/Modify/${parking.id}`]);
  }
}
