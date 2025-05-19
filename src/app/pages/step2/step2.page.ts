import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
  standalone: false
})
export class Step2Page implements OnInit {

  form: FormGroup
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public auth: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: [],
      password: []
    })
  }

  ngOnInit() { }

  avanzar() {
    console.log(this.form.value);
    //revisa si el formulario es valido
    if (this.form.valid) {
      const datosUser = {
        nombre: localStorage.getItem('nombre'),
        email: this.form.value.email,
        password: this.form.value.password,
      }
      this.auth.registerUser(datosUser.email, datosUser.password, datosUser)
    }
  }
}
