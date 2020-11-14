import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nombre: [ '', Validators.required ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]
    });
  }

  registrarUsuario() {
    console.log(this.formulario.value);
    console.log(this.formulario.valid);
    console.log(this.formulario);
  }
}
