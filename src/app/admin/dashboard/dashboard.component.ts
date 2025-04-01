import { Component } from '@angular/core';
import { ReservationService } from '../../../api/reservation/reservation.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../api/User/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  data: any [] = [];
  users: any[] = [];

  constructor(private reservationservice : ReservationService , private userService : UserService) { }

  getUsers() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  getDatabyId(i : number) {
    this.reservationservice.getReservationById(this.users[i].User_id).subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
    });
  }

  ngOnInit() {
    if (typeof window === 'undefined' || !localStorage) {
      return;
    }
    this.getUsers()
  }
}
