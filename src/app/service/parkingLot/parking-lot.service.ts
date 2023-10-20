import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ParkingLot } from 'Models/ParkingLot';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Responses } from 'Models/Responses';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiParkingLot";
  private complement1 = "Api/ApiParkingLot/imagenes";

  constructor(private _http: HttpClient) { }

  public getParkingLots(): Observable<ParkingLot[]> {
    return this._http.get<ParkingLot[]>(this.Endpoint + this.complement);
  }
  
  public getParkingLot(id: string): Observable<ParkingLot> {
    return this._http.get<ParkingLot>(`${this.Endpoint}${this.complement}/obtener/${id}`);
  }
 
  public AddParkingLot(parkingLot: ParkingLot): Observable<ParkingLot> {
    return this._http.post<ParkingLot>(this.Endpoint + this.complement, parkingLot);
  } 

  //public AddImages(images: string): Observable<Responses> {
  //  return this._http.post<Responses>(this.Endpoint + this.complement1, images);
  //}
  
  public AddImages(images: string): Observable<Responses> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    return this._http.post<Responses>(this.Endpoint + this.complement1, JSON.stringify(images), httpOptions);
  }

  

   

}
