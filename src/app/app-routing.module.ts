import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingLotComponent } from './components/parking-lot/parking-lot.component';
import { ReservationComponent } from './components/reservation/reservation.component';


const routes: Routes = [
  {path: 'ParkingLot', component:ParkingLotComponent},
  {path: 'Reservation/:id', component:ReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
