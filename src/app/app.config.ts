import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { StockListComponent } from './stock-list/stock-list.component';
import { CreateStock1Component } from './create-stock1/create-stock1.component';
import { StockDetailsComponent } from './stock-details-component/stock-details-component.component';
import { RegisterComponent } from './register-component/register-component.component';
import { LoginComponent } from './login-component/login-component.component';
import { GetDataComponent } from './stock/get-data/get-data.component';
import { PostDataComponent } from './stock/post-data/post-data.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stocks', component: StockListComponent },
  { path: 'create1-stock', component: CreateStock1Component },
  { path: 'stocks/:id', component: StockDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'get-data', component: GetDataComponent },
  { path: 'post-data', component: PostDataComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};
