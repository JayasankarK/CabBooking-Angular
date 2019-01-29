import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isAdmin:string='';
  constructor() { }

  ngOnInit() {
    this.isAdmin=sessionStorage.getItem('isAdmin');
  }
onLogout(){
  sessionStorage.clear();
}
}
