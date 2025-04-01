import { Component } from '@angular/core';
import { UserService } from '../../api/User/user.service';
import Swal from 'sweetalert2';
import { ReservationService } from '../../api/reservation/reservation.service';

@Component({
  selector: 'app-info',
  standalone: false,
  
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  constructor(private userService : UserService , private reservationservice : ReservationService) { }

  info: any[] = [];
  pass: string | null = '';

  data: any[] = [];

  getData() {
    this.reservationservice.getReservation().subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
    });
  }

  getUser() {
    this.userService.getUserId().subscribe((res: any) => {
      this.info = res;
      this.makePass();
    },
    (err) => {
      if (err.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Login again to continue",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
      }
    });
  }

  makePass() {
    this.userService.getUserId().subscribe((res: any) => {
      const change = res[0].Password.length / 6;
      this.pass = '';
      for (let i = 0; i < change; i++) {
        this.pass += '*';
      }
    });
  }

  ngOnInit() {
    if (typeof window === 'undefined' || !localStorage) {
      return;
    }
    this.getUser();
    this.getData();
  }

  onSubmit() {
    Swal.fire("SweetAlert2 is working!");
  }
}
