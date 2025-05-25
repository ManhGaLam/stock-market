import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.sevice';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class StockListComponent implements OnInit {
  stocks$: Observable<any>;
  allStocks: any[] = [];
  filteredStocks: any[] = [];
  searchQuery: string = '';

  constructor(private httpService: HttpServiceService) {
    this.stocks$ = this.httpService.getStocks();
  }

  ngOnInit(): void {
    this.stocks$.subscribe(
      (data) => {
        console.log('Stocks loaded:', data);
        this.allStocks = data;
        this.filteredStocks = data;
      },
      (error) => console.error('Error fetching stocks:', error)
    );
  }
  searchStocks() {
    if (this.searchQuery.trim() === '') {
      this.filteredStocks = this.allStocks; 
    } else {
    this.filteredStocks = this.allStocks.filter(stock =>
      stock.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }
}
