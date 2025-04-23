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

  // Las variables se crean sobre el constructor
  saludo: any;
  nombre: string = '';
  numero: number = 0;
  boleana: boolean = false;
  fecha: Date = new Date();
  objeto: any = {
    nombre: 'Juan',
    edad: 25,
    ciudad: 'Madrid'
  }
  arreglo: any[] = ['manzana', 'banana', 'naranja'];
  // variables sin dato incial
  variableVacia: any;
  variableNula: any = null;
  variableIndefinida: any = undefined;
  variable!: string;

  // variable de tipo Book
  nuevoLibro: Book ={
    name: 'El principito',
    author: 'Antoine de Saint-Exupéry'
  }
  // La función constructor se ejecuta al crear la clase
  constructor() {
    console.log('constructor de la página de login');
    this.saludo = 'Hola mundo desde Ionic';
    console.log('el valor de saludo es: ', this.saludo);
    console.log('el valor nuevo libro: ', this.nuevoLibro);

    let variableNueva: string = 'Hola mundo desde Ionic en constructor';
  }

  // La función ngOnInit se ejecuta al inicializar la clase
  ngOnInit() {



  }

}
