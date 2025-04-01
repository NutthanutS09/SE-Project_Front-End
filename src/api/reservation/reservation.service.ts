import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private url = 'http://localhost:5000/reservation';

  constructor(private http : HttpClient) { }

  onReservation(type : any , table : any , date : any , time : any , customer : any , note : any , total : any , price : any) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.url}`, { type, table, date, time, customer, note, total , price }, { headers });
  }

  getReservation() {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.url}/data`, { headers });
  }

  getReservationById(i : any) {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.url}/data/${i}`, { headers });
  }
}
