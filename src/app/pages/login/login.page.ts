import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

interface Book {
  name: string;
  author: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
}) export class LoginPage  {


  // La función constructor se ejecuta al crear la clase
  constructor(
    public db: DatabaseService,
    // Paso 2, importar el servicio de formulario
    public formBuilder: FormBuilder,
    //paso 6, importar el servicio de auth
    public auth: AuthService,
  ) {
   console.log('LoginPage constructor');
  }

  // La función ngOnInit se ejecuta al inicializar la clase
  login() {

  }
}
