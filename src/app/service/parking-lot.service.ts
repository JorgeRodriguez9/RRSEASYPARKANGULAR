import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ParkingLot } from 'Models/ParkingLot';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiParkingLot";

  constructor(private _http: HttpClient) { }

  public getParkingLots():Observable<ParkingLot[]>{
    return this._http.get<ParkingLot[]>(this.Endpoint + this.complement);
  }
  public AddParkingLot(parkingLot:ParkingLot):Observable<ParkingLot>
  {
   return this._http.post<ParkingLot>(this.Endpoint + this.complement,parkingLot);
  }

}
