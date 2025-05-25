import { Component,OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.sevice';

@Component({
  selector: 'app-post-data',
  imports: [],
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.scss']
})
export class PostDataComponent implements OnInit {

  constructor(private httpServerService: HttpServiceService) {}

  ngOnInit(): void {
    const body = {"name":"Last Stock Company",
      "code":"LSC",
      "price": "876",
      "previousPrice": "765",
      "exchange":"NYSE",
      "favorite": "false"};
    this.httpServerService.postStock(body).subscribe((data) => {
      console.log('postStock', data);
    })
  }
}
