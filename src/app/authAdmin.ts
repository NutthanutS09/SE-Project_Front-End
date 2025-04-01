import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthAdmin implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window === 'undefined') {
      return true;
    }

    const token = localStorage.getItem('Token');
    const role = localStorage.getItem('Role');
    if (token && role !== '1' && role !== '2') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
