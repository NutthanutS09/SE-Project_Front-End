import { Component } from '@angular/core';

@Component({
  selector: 'app-regis',
  standalone: false,
  
  templateUrl: './regis.component.html',
  styleUrl: './regis.component.css'
})
export class RegisComponent {
  regis = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm: '',
    checkbox: false,
  }

  onSubmit() {
    console.log(this.regis);
  }
}
