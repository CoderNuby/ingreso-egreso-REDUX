import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormulario: FormGroup;

  usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loginFormulario = this.formBuilder.group({
      email: [ '', [Validators.required , Validators.email]],
      password: [ '', Validators.required]
    });
  }

  loginUsuario(){
    Swal.fire({
      title: 'Cargando...',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    this.guardarDataUsuario();
    this.authService.loginUsuario(this.usuario).then((res) => {
      console.log(res);
      Swal.close();
      this.router.navigate(['/']);
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,      
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  private guardarDataUsuario() {
    this.usuario = new Usuario();
    this.usuario.nombre = this.loginFormulario.value.nombre;
    this.usuario.email = this.loginFormulario.value.email;
    this.usuario.password = this.loginFormulario.value.password;
  }
}
