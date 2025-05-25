import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component.component';
import { StockListComponent } from './stock-list/stock-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stocks', component: StockListComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
