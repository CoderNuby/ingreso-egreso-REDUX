import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formulario: FormGroup;

  usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nombre: [ '', Validators.required ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]
    });
  }

  registrarUsuario() {
    if(this.formulario.valid) {
      this.guardarUsuario();
    }else {
      console.log("Formulario invalido!!");
    }
  }

  private guardarUsuario() {
    Swal.fire({
      title: 'Cargando...',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    this.guardarDataUsuario();
    this.authService.crearUsuario(this.usuario).then((credenciales) => {
      console.log(credenciales);
      Swal.close();
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,      
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
    });;
  }

  private guardarDataUsuario() {
    this.usuario = new Usuario();
    this.usuario.nombre = this.formulario.value.nombre;
    this.usuario.email = this.formulario.value.email;
    this.usuario.password = this.formulario.value.password;
  }
}
