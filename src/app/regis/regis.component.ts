import { Component } from '@angular/core';
import { RegisService } from '../../api/Regis/regis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regis',
  standalone: false,
  
  templateUrl: './regis.component.html',
  styleUrl: './regis.component.css'
})
export class RegisComponent {
  constructor(private regisService : RegisService) { }

  isLogin: boolean = false;
  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage) {
      const role = localStorage.getItem('Role');
        if (role) {
          this.isLogin = true;
        }
    }
  }

  regis = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
    checkbox: false,
  }

  ResetInput() {
    this.regis.password = '';
    this.regis.confirm = '';
    this.regis.checkbox = false;
  }

  onPhoneInput(event: any) {
    let phoneNumber = event.target.value;
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
  
    if (phoneNumber.length > 10) {
      phoneNumber = phoneNumber.substring(0, 10);
    }
  
    if (phoneNumber.length > 6) {
      phoneNumber = `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, 10)}`;
    } else if (phoneNumber.length > 3) {
      phoneNumber = `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3)}`;
    }
  
    this.regis.phone = phoneNumber;
  }
  
  checkPhone() {
    Swal.fire({
      title: "Phone number not correct!",
      icon: "error",
      showConfirmButton: false,
      timer: 1500
    });
  }

  onSubmit() {
    if (this.regis.phone.length < 10) {
      this.checkPhone();
      this.ResetInput();
      return;
    }
    if (this.regis.password != this.regis.confirm) {
      Swal.fire({
        title: "Password not match!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.ResetInput();
        return;
      });
    }
    else {
      this.regisService.GetData(this.regis).subscribe((res : any) => {
        if (res.length === 0) {
          Swal.fire({
            title: "Success",
            text: "Register successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.href = '/login';
          });
        }
        else {
          Swal.fire({
            title: "Error",
            text: "Email already exists!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.regis.email = '';
            this.ResetInput();
            return;
          });
        }
      });
    }
  }

}
