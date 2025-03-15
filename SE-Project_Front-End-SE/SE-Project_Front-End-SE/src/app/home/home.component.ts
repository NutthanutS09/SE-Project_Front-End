import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user = {
    username: '',
    password: '',
    checkbox: false,
  };

  onSubmit() {
    console.log(this.user);
  }
}
