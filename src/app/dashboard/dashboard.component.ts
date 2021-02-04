import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as ingresoEgreso from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  userSubscription: Subscription;
  ingresosEgresosSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user').pipe(filter(auth => auth.user != null)).subscribe(({user}) => {
      this.ingresosEgresosSubscription = this.ingresoEgresoService.initIngresoEgresoListener(user.id).subscribe((res: any) => {
        this.store.dispatch(ingresoEgreso.setItems({items: res}));
      });
    });
  }

  ngOnDestroy(){
    this.ingresosEgresosSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
