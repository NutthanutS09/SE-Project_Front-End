import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MenuService } from '../../api/menu/menu.service';
import { ReservationService } from '../../api/reservation/reservation.service';
import { get } from 'http';

@Component({
  selector: 'app-reservation',
  standalone: false,
  
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  constructor(private menuservice : MenuService , private reservationservice : ReservationService) { }

  minDate: string = new Date().toISOString().split('T')[0]; // กำหนดค่า minDate เป็นวันที่ปัจจุบัน
  courses : any = [];

  ngOnInit() {
    if (typeof window === 'undefined' || !localStorage) {
      return;
    }
    this.menuservice.getCourses().subscribe((res) => {
      this.courses = res;
    }, (err) => {
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

  table: string = '';
  reservation = {
    date: '',
    time: '',
    people: 1,
    course: '',
    note: ''
  };

  setTable(value: string) {
    this.table = value;
    this.changePage(2);
  }

  selectCourse: string = '';

  setCourse(value: string) {
    this.reservation.course = value;
  }

  price: number = 0;
  total: number = 0;
  onReservation() {
    const selectedCourse = this.courses.find((courses: { Type_name: string; Price: number }) => courses.Type_name === this.reservation.course);
    
    if (selectedCourse) {
      this.price = selectedCourse.Price * this.reservation.people;
      this.payment({ target: { value: 'full' } });
    } else {
      console.warn('⚠️ ไม่พบคอร์สที่เลือก');
    }
  
    this.changePage(3);
  }
  

  payment(event: any) {
    const paymentMethod = event.target.value;
    if (paymentMethod === 'full') {
      this.total = this.price;
      return;
    }
    if (paymentMethod === 'deposit') {
      this.total = this.price / 2;
      return;
    }
  }

  onPayment() {
    console.log('💳 ข้อมูลการชำระเงิน:', this.price , this.total);
    if (!this.price) {
      Swal.fire("กรุณาเลือกวิธีการชำระเงิน!");
      return;
    }
    this.reservationservice.onReservation
    (this.reservation.course , this.table , this.reservation.date , this.reservation.time , this.reservation.people , this.reservation.note , this.price , this.total)
    .subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ!',
        text: 'จองโต๊ะสำเร็จ!',
      }).then(() => {
        window.location.reload();
      });
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Table Full!',
        text: 'โต๊ะนี่เต็มแล้ว!',
      }).then(() => {
        window.location.reload();
      });
    });
  }

  changePage(value: number) {
    const tableForm = document.getElementById('table') as HTMLFormElement;
    const reservationForm = document.getElementById('reservation') as HTMLFormElement;
    const paymentForm = document.getElementById('pay') as HTMLFormElement;

    const progressBar = document.getElementById('progress') as HTMLProgressElement;
    const pageOne = document.getElementById('page1') as HTMLProgressElement;
    const pageTwo = document.getElementById('page2') as HTMLProgressElement;
    const pageThree = document.getElementById('page3') as HTMLProgressElement;
    if (value === 1) {
      tableForm.style.display = 'block';
      reservationForm.style.display = 'none';
      paymentForm.style.display = 'none';
      progressBar.style.width = '0%';
      pageOne.style.backgroundColor = '#0d6efd';
      pageTwo.style.backgroundColor = '#6c757d';
      pageThree.style.backgroundColor = '#6c757d';
    }
    if (value === 2) {
      if (this.table) {
        tableForm.style.display = 'none';
        reservationForm.style.display = 'block';
        paymentForm.style.display = 'none';
        progressBar.style.width = '50%';
        pageTwo.style.backgroundColor = '#0d6efd';
        pageThree.style.backgroundColor = '#6c757d';
      }
      else {
        Swal.fire("กรุณาเลือกโต๊ะก่อนทำการจอง!");
        return;
      }
    }
    if (value === 3) {
      if (!this.table) {
        Swal.fire("กรุณาเลือกโต๊ะก่อนทำการจอง!");
        return;
      }
      if (this.reservation.date && this.reservation.time && this.reservation.people && this.reservation.course) {
        tableForm.style.display = 'none';
        reservationForm.style.display = 'none';
        paymentForm.style.display = 'block';
        progressBar.style.width = '100%';
        pageTwo.style.backgroundColor = '#0d6efd';
        pageThree.style.backgroundColor = '#0d6efd';
      }
      else {
        Swal.fire("กรุณากรอกข้อมูลการจองก่อนทำการชำระเงิน!");
        return;
      }
    }
  }
}
