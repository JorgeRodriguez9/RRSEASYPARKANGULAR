import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingLotComponent } from './components/parking-lot/parking-lot.component';

const routes: Routes = [
  {path: 'ParkingLot', component:ParkingLotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
