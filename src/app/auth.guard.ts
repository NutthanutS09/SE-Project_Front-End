import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window === 'undefined') {
      return true;
    }

    const token = localStorage.getItem('Token');
    if (token) {
      this.router.navigate(['/menu']);
      return false;
    }
    
    return true;
  }
}
