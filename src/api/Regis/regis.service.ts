import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisService {
  private url = 'http://localhost:5000/regis';

  constructor(private http : HttpClient) { }

  GetData(regis : any) : Observable<any> {
    return this.http.post(`${this.url}`, regis);
  }
}
