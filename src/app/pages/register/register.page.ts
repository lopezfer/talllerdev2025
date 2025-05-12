import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

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
    public db: DatabaseService,
        // Paso 2, importar el servicio de formulario
    public formBuilder: FormBuilder,
    //paso 6, importar el servicio de auth
    public auth: AuthService,
  ) {
    this.db.fetchFirestoreCollection('book').subscribe((res: any) => {

    })
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
    // aPaso 5, crear la lógica, qui viene la logica para registrar al usuario
    if (this.registerForm.valid) {
      console.log('formulario valido', this.registerForm.valid);
      console.log('valores del formulario', this.registerForm.value);
      this.auth.registerUser(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value)
        .then((res: any) => {console.log('usuario creado', res);});

    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

}
