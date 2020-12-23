import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  
  readonly INGRESO: string = "ingreso";
  readonly EGRESO: string = "egreso";

  formularioIngresoEgreso: FormGroup;

  loadingSubscription: Subscription;

  tipo: string = this.INGRESO;

  cargando: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.loadingSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });

    this.formularioIngresoEgreso = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }

  agregar(){

    if(this.formularioIngresoEgreso.invalid) return;

    this.store.dispatch(ui.isLoading());
    let descripcion = this.formularioIngresoEgreso.value.descripcion;
    let monto = this.formularioIngresoEgreso.value.monto;
    let ingresoEgreso: IngresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Agregado',
        text: (this.tipo + " agregado correctamente"),      
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      
      this.store.dispatch(ui.stopLoading());
      this.formularioIngresoEgreso.reset();
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Agregado',
        text: "Sucedio un error",      
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      this.store.dispatch(ui.stopLoading());
    });
  }

  cambiarTipo(){
    if(this.tipo == this.INGRESO){
      this.tipo = this.EGRESO;
    }else{
      this.tipo = this.INGRESO;
    }
  }
}
