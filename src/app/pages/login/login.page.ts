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
}) export class LoginPage {

  form: FormGroup;
  // La función constructor se ejecuta al crear la clase
  constructor(
    public db: DatabaseService,
    public auth: AuthService,
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  // La función ngOnInit se ejecuta al inicializar la clase
  login() {
    if(this.form.valid){
      console.log('formulario valido', this.form.valid);
      console.log('valores del formulario', this.form.value);
      this.auth.loginUser(this.form.value.email, this.form.value.password)
    }
    else{
      this.form.markAllAsTouched();
    }
  }
}
