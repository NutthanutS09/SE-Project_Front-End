import { Component } from '@angular/core';
import { UserService } from '../../../api/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: false,
  
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private userService : UserService) { }
  
  users: any[] = [];

  ngOnInit() {
    if (typeof window === 'undefined' || !localStorage) {
      return;
    }
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res;
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

  async ngSubmit(index: number) {
    if (localStorage.getItem('Role') !== '1') {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You are not authorized to perform this action",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    const { value: Role } = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: {
        Role: {
          Admin: "Admin",
          Customer: "Customer"
        }
      },
      inputValue: this.users[index].Role_name,
      showCancelButton: true,
      inputValidator: (value) => {
        console.log(value);
        this.userService.changeRole(value , this.users[index].User_id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Role changed successfully",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
          });
        },
        (err) => {
          if (err.status === 403) {
            Swal.fire({
              icon: "error",
              title: "Can't change role",
              text: "Role Owner can't be changed",
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              window.location.reload();
            });
          }
        });
      }
    });
  }
}
