import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.sevice';

@Component({
  selector: 'app-get-data',
  imports: [],
  templateUrl: './get-data.component.html',
  styleUrl: './get-data.component.scss'
})
export class GetDataComponent {
  constructor(private httpServerService: HttpServiceService) {}

  ngOnInit(): void {
    this.httpServerService.getStocks().subscribe((data) => {
      console.log('stocks',data);
    });
  }
}
