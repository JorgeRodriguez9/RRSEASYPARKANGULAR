import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from 'Models/Reservation';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiReservation";

  constructor(private _http: HttpClient) { }

  public getReservations(): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(this.Endpoint + this.complement);
  }

  public getReservationsParkingLot(id: string): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(`${this.Endpoint}${this.complement}/parkinglot/${id}`);
  }
  public AddReservation(reservation: Reservation): Observable<Reservation> {
    return this._http.post<Reservation>(this.Endpoint + this.complement, reservation);
  } 

}
