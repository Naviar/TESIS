import { Component, OnInit } from '@angular/core';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import decode from 'jwt-decode'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  condition:number;
  constructor() { }

  ngOnInit() {
    this.getValidRol();
  }
  getValidRol(){
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token); 
    this.condition = parseInt(tokenPayload.rol_usuario);    
  }
}
