import { Component } from '@angular/core';
import { LoginService } from '../api/Login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SE-Project';

  constructor(private loginService : LoginService) { }

  isLogin: boolean = false;
  role: string | null = '';
  admin: boolean = false;

  name: string = '';
  
  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage) {
      const role = localStorage.getItem('Role');
      this.name = localStorage.getItem('Name') || '';
        if (role) {
          this.isLogin = true;
          this.role = role;

          if (role === '1' || role === '2') {
            this.admin = true;
          }
        }
    }
  }

  onLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "success!",
          text: "Logged out successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          localStorage.clear();
          window.location.href = '/login';
        });
      }
    });
  }
}
