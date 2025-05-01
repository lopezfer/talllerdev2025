import { Component, OnInit } from '@angular/core';
import { ComponentInterface } from 'ionicons/dist/types/stencil-public-runtime';

interface Book {
  name: string;
  author: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
}) export class LoginPage implements OnInit {



  // La función constructor se ejecuta al crear la clase
  constructor() {
  }

  // La función ngOnInit se ejecuta al inicializar la clase
  ngOnInit() {

  }

}
