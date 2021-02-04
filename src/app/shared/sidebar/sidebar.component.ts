import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {


  nombre: string = "";

  storeSubscription: Subscription;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('user').pipe(filter((res) => res.user != null)).subscribe((res) => {
      this.nombre = res.user.nombre;
    });
  }

  ngOnDestroy(){
    this.storeSubscription.unsubscribe();
  }

  cerrarSesion() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
