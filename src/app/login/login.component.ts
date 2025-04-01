import { Component } from '@angular/core';
import { LoginService } from '../../api/Login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService : LoginService) { }

  isLogin: boolean = false;
  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage) {
      const role = localStorage.getItem('Role');
        if (role) {
          this.isLogin = true;
        }
    }
  }

  login = {
    email: '',
    password: ''
  }

  onSubmit() {
    this.loginService.onLogin(this.login).subscribe((res : any) => {
      if(!res.message) {
        const Token = res;
        Swal.fire({
          title: "Login success!",
          icon: "success",
          showConfirmButton: false,
          draggable: true,
          timer: 1500
        }).then(() => {
          localStorage.setItem('Token', Token);
          this.loginService.getHaeder().subscribe((res : any) => {
            const role = res.role;
            const name = res.name;
            localStorage.setItem('Role', role);
            localStorage.setItem('Name', name);
            window.location.href = '/menu';
          });
        });
      }
      else if (res.message === 'Not Found' || res.message === 'Not Match') {
        Swal.fire({
          title: "Login fail!",
          text: "Please check your email or password",
          icon: "error",
          showConfirmButton: false,
          draggable: true,
          timer: 1500
        }).then(() => {
          this.login.password = '';
        });
      }
   });
  }
}