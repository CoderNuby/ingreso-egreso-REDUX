import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Label, MultiDataSet } from 'ng2-charts';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos = 0;
  totalEgresos = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('ingresosEgresos').subscribe((ingresosEgresos) => {
      this.generarEstadistica(ingresosEgresos.items);
    });
  }

  generarEstadistica(items: IngresoEgreso[]){

    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    items.forEach(item => {
      if(item.tipo == 'ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos++;
      }else{
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    });

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }
}
