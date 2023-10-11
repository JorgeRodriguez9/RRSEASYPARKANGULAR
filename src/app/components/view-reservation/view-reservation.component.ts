import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'Models/Reservation';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent {
  dataSource = new MatTableDataSource<Reservation>();
  displayedColumns: string[] = ['Name','Telephone','Price', 'Disabled', 'Date'];

  fechaSeleccionada!: Date | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _reservation:ReservationService){

  }

  ngOnInit(): void {
    this.getReservations();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getReservations(){
    this._reservation.getReservations().subscribe(response =>{ this.dataSource.data = response;});
  }

  onFechaSeleccionada(event: any) {

     this.fechaSeleccionada = event.value;
     if(this.fechaSeleccionada){
      const selectedDate = this.fechaSeleccionada.toISOString().split('T')[0]; // Obtén la fecha seleccionada en formato 'YYYY-MM-DD'
      this.dataSource.filter = selectedDate
     }
  }

  quitarFiltroFecha() {
    this.dataSource.filter = '';
    this.fechaSeleccionada = null; // También puedes reiniciar la fecha seleccionada si lo deseas
  }

}
