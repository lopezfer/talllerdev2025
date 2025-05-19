import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
  standalone: false
})
export class Step1Page implements OnInit {

  form: FormGroup
  constructor(
        public formBuilder: FormBuilder,
        public router: Router
  ) {
    this.form =  this.formBuilder.group({
      nombre: []
    })
  }

  ngOnInit() {}

  avanzar() {
    console.log(this.form.value);
    //revisa si el formulario es valido
    if(this.form.valid) {
      //almacena el nombre en el localStorage
      localStorage.setItem('nombre', this.form.value.nombre);
      //luego navega a la siguiente pagina
      this.router.navigate(['/step2']);
    }
  }

}
