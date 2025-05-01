import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  nombre: string = '';

  // Paso 3 crear el formulario
  registerForm!: FormGroup;

  constructor(
    // Paso 2, importar el servicio de formulario
    public formBuilder: FormBuilder,
  ) {

    // Paso 4 inicializar el formulario y agrergar 'FormGroup' en la importacion
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required]],
      password2: [''],
    });
  }

  ngOnInit() {
  }

  register() {
    // aqui viene la logica para registrar al usuario

    if (this.registerForm.valid) {
      console.log('formulario valido', this.registerForm.valid);
      console.log('valores del formulario', this.registerForm.value);
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

}
