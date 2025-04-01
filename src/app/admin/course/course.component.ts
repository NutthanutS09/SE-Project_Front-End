import { Component } from '@angular/core';
import { MenuService } from '../../../api/menu/menu.service';
import Swal from 'sweetalert2';
import { async } from 'rxjs';

@Component({
  selector: 'app-course',
  standalone: false,
  
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  constructor(private menuservice : MenuService) { }

  courses : any = [];
  categories : any = [];
  menu : any = [];

  course = {
    name: "",
    price: "",
  }

  getCourses() {
    this.menuservice.getCourses().subscribe((res: any) => {
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

  getAllmenu() {
    this.menuservice.getAllmenu().subscribe((res: any) => {
      this.menu = res;
    });
  }

  ngOnInit() {
    if (typeof window === 'undefined' || !localStorage) {
      return;
    }
    this.getCourses()
    this.getAllmenu()
    this.getCategory()
  }

  onAddCourse() {
    this.menuservice.addCourse(this.course).subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Course Added Successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload();
      });
    }, (err) => {
      console.log(err);
    });
  }

  name: string = "";
  price: number = 0;

  getDataCourse(id : number) {
    this.name = this.courses[id].Type_name;
    this.price = this.courses[id].Price;
  }

  onEditCourse(id: number) {
    const past = this.courses[id].Type_name;
    this.menuservice.updateCourse(past , this.name , this.price).subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Course Update Successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload();
      });
    }, (err) => {
      console.log(err);
    });
  }

  onDeleteCourse(id: number) {
    const name = this.courses[id].Type_name;
    Swal.fire({
      title: "Are you sure?",
      text: "Detele this course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuservice.deteleCourse(name).subscribe((res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Course Delete Successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
          });
        }, (err) => {
          console.log(err);
        });
      } 
    });
  }

  category: any [] = [];
  selectCourse: any [] = [];
  food: any [] = [];
  quantity: any [] = [];

  getCategory() {
    this.menuservice.getCategories().subscribe((res: any) => {
      this.category = res;
    });
  }

  onAddMenu() {
    if (this.selectCourse.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Select Course',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    console.log(this.selectCourse , this.food , this.quantity);
    if (this.food.length < 5 && this.quantity.length < 5) {
      Swal.fire({
        icon: 'error',
        title: 'Please add all food',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.menuservice.addFood(this.selectCourse , this.food , this.quantity).subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Menu Added Successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload();
      });
    }, (err) => {
      console.log(err);
    });
  }

}
