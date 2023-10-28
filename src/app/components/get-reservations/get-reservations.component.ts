import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from 'Models/Reservation';
import { ReservationGet } from 'Models/ReservationGet';
import { ReservationService } from 'src/app/service/reservation/reservation.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-get-reservations',
  templateUrl: './get-reservations.component.html',
  styleUrls: ['./get-reservations.component.css']
})
export class GetReservationsComponent implements OnInit{

  public list: ReservationGet[] = [];

constructor(private _reservation: ReservationService, private dialog: MatDialog){

}
ngOnInit(): void {
  this.getReservas();
}
getReservas() {
  this._reservation.getReservationsClient().subscribe(response => { this.list = response;});
}
openConfirmDialog(reservationId: string): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '250px',
    data: '¿Estás seguro de que deseas eliminar esta reserva?'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
     this._reservation.DeleteReservation(reservationId).subscribe(response =>{
      this.getReservas();
     })
    }
  });
}
}
