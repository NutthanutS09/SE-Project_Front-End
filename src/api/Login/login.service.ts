import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import test from 'node:test';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:5000/login';
  constructor(private http : HttpClient) { }

  onLogin(login : any) : Observable<any> {
    return this.http.post(`${this.url}`, login);
  }

  getUserID() {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.url}/userID`, { headers });
  }

  getHaeder() {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.url}/local`, { headers });
    // return this.http.get(`${this.url}/api`, 
    // {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' + localStorage.getItem('Token')
    //   })
    // });
  }
}
