import { Component } from '@angular/core';
import { Stock } from '../model/stock';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-stock',
  standalone: true,
  templateUrl: './create-stock.component.html',
  styleUrl: './create-stock.component.scss',
  imports: [FormsModule, CommonModule],
})
export class CreateStockComponent {
  public newStock: Stock = new Stock('', '', 0, 0);
  public stockExchange: string = '';
  public nameValid: boolean = false;
  public codeTouched: boolean = false;
  public priceTouched: boolean = false;
  public stockList: Stock[] = [];
  public exchangeList: string[] = []; // Danh sách lưu sàn giao dịch tương ứng với từng stock

  validateName() {
    this.nameValid = this.newStock.name.length >= 3;
  }

  onCodeChange() {
    this.codeTouched = this.newStock.code.length == 5;
  }

  onPriceBlur() {
    this.priceTouched = this.newStock.price > 0;
  }

  createStock() {
    if (
      this.nameValid &&
      this.newStock.code &&
      this.newStock.price > 0 &&
      this.stockExchange
    ) {
      const newCreatedStock = new Stock(
        this.newStock.name,
        this.newStock.code,
        this.newStock.price,
        this.newStock.previousPrice
      );
      newCreatedStock.favorite = this.newStock.favorite;
      this.stockList.push(newCreatedStock);
      this.exchangeList.push(this.stockExchange);

      console.log('Danh sách cổ phiếu:', this.stockList);
      this.resetForm();
    }
  }

  resetForm() {
    this.newStock = new Stock('', '', 0, 0);
    this.stockExchange = '';
    this.nameValid = true;
    this.codeTouched = false;
    this.priceTouched = false;
  }
}
