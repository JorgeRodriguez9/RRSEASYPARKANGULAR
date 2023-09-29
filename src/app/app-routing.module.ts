import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingLotComponent } from './components/parking-lot/parking-lot.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';


const routes: Routes = [
  {path: 'ParkingLot', component:ParkingLotComponent},
  {path: 'Reservation/:id', component:ReservationComponent},
  {path: 'PrincipalPage', component:PrincipalPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
