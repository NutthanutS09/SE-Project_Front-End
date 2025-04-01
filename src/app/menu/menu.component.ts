import { Component } from '@angular/core';
import { MenuService } from '../../api/menu/menu.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
item: any;
  constructor(private menuService : MenuService) { }

  head: any[] = [];
  allMenu: any[] = [];

  getCourses() {
    this.menuService.getCourses().subscribe((res: any) => {
      this.head = res;
    });
  }

  getMenu() {
    this.menuService.getAllmenu().subscribe((res: any) => {
      this.allMenu = res;
    });
  }

  ngOnInit() {
    if (typeof window === 'undefined' || !localStorage) {
      return;
    }
    this.getCourses();
    this.getMenu();
  }
}