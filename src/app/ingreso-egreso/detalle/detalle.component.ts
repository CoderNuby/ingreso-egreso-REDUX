import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  readonly INGRESO: string = "ingreso";
  readonly EGRESO: string = "egreso";

  ingresosEgresos: IngresoEgreso[] = [];

  ingresoEgresoSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.ingresoEgresoSubs = this.store.select('ingresosEgresos').subscribe((ingresosEgresos) => {
      this.ingresosEgresos = ingresosEgresos.items;
      console.log("Ingreso Egreso:: ", this.ingresosEgresos);
    });
  }

  ngOnDestroy() {
    this.ingresoEgresoSubs.unsubscribe();
  }

  borrar(ingresoEgreso: IngresoEgreso){
    this.ingresoEgresoService.borrarIngresoEgreso(ingresoEgreso.uid).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Item',
        text: 'item borrado correctamente',      
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      });

    }).catch((error) => {
      Swal.fire({
        icon: 'warning',
        title: 'Item',
        text: 'error al borrar item',      
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}
