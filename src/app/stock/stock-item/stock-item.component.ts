import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from '../../model/stock';
import { HttpServiceService } from '../../services/http-service.sevice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stock-item',
  standalone: true,
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class StockItemComponent {
  @Input() stock!: Stock; // Ensure stock is passed correctly
  isEditing = false;
  updatedStock!: Stock;

  constructor(private httpService: HttpServiceService) {}

  toggleFavorite() {
    this.stock.favorite = !this.stock.favorite;
    this.httpService
      .updateStock(this.stock.id!.toString(), this.stock)
      .subscribe(
        () => {
          console.log('Favorite status updated for stock:', this.stock);
        },
        (error) => {
          console.error('Error updating favorite status:', error);
        }
      );
  }

  @Output() stockDeleted = new EventEmitter<number>(); // Thêm event output để thông báo khi xóa

  deleteStock() {
    if (!this.stock.id) {
      console.error('Stock ID is missing, cannot delete stock.');
      return;
    }

    this.httpService.deleteStock(this.stock.id.toString()).subscribe(
      () => {
        console.log('Stock deleted successfully:', this.stock);
        this.stockDeleted.emit(this.stock.id); // Phát event để component cha cập nhật UI
      },
      (error) => {
        console.error('Error deleting stock:', error);
      }
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      // Lưu lại giá hiện tại
      this.stock.previousPrice = this.stock.price;

      // Tạo bản sao để chỉnh sửa
      this.updatedStock = { ...this.stock };
    }
  }

  saveUpdate() {
    if (!this.updatedStock || !this.updatedStock.id) {
      console.error(
        'Updated stock or stock ID is missing, cannot save changes.'
      );
      return;
    }

    console.log('Updating stock:', this.updatedStock); // Debug log

    this.httpService
      .updateStock(this.updatedStock.id.toString(), this.updatedStock)
      .subscribe(
        () => {
          console.log('Stock updated successfully:', this.updatedStock);
          this.stock = { ...this.updatedStock }; // Cập nhật UI ngay lập tức
          this.isEditing = false;
        },
        (error) => console.error('Error updating stock:', error)
      );
  }
}
