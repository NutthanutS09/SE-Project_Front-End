import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url = 'http://localhost:5000/menu';

  constructor(private http : HttpClient) { }

  getCourses() {
    return this.http.get(`${this.url}/course`);
  }

  getCategories() {
    return this.http.get(`${this.url}/category`);
  }

  getAllmenu() {
    return this.http.get(`${this.url}/all`);
  }

  getPremium() {
    return this.http.get(`${this.url}/premium`);
  }

  getRagular() {
    return this.http.get(`${this.url}/ragular`);
  }

  addCourse(course : any) {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.url}/addCourse`, course, { headers });
  }

  updateCourse(past : any , name : any, price : any) {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.url}/updateCourse`, { past, name, price }, { headers });
  }

  deteleCourse(course : any) {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.url}/deleteCourse`, { course }, { headers });
  }

  addFood(type : any, food : any, quantity : any) {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.url}/addFood`, { type, food, quantity }, { headers });
  }
}
