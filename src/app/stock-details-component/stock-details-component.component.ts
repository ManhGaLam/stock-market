import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.sevice';
import { Stock } from '../model/stock';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details-component.component.html',
  styleUrls: ['./stock-details-component.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Thêm FormsModule để dùng [(ngModel)]
})
export class StockDetailsComponent implements OnInit {
  stock!: Stock;
  isEditing = false; // Trạng thái chỉnh sửa
  updatedStock!: Stock; // Lưu trữ thông tin chỉnh sửa

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Thêm Router để điều hướng
    private httpService: HttpServiceService
  ) {}

  ngOnInit() {
    const stockId = this.route.snapshot.paramMap.get('id');
    console.log('Stock ID:', stockId); // Debug log
    if (stockId) {
      this.httpService.getStockById(stockId).subscribe(
        (data) => {
          console.log('Stock data:', data); // Debug log
          this.stock = data;
          this.updatedStock = { ...data }; // Tạo bản sao để chỉnh sửa
        },
        (error) => console.error('Error fetching stock details:', error)
      );
    }
  }

  // Xóa cổ phiếu
  deleteStock() {
    if (!this.stock.id) return;
    if (confirm('Bạn có chắc muốn xóa cổ phiếu này không?')) {
      this.httpService.deleteStock(this.stock.id.toString()).subscribe(
        () => {
          alert('Cổ phiếu đã được xóa!');
          this.router.navigate(['/stocks']); // Chuyển hướng về danh sách sau khi xóa
        },
        (error) => console.error('Lỗi khi xóa cổ phiếu:', error)
      );
    }
  }

  // Bật/tắt chế độ chỉnh sửa
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.updatedStock = { ...this.stock }; // Tạo bản sao để chỉnh sửa
    }
  }

  // Lưu cập nhật cổ phiếu
  saveUpdate() {
    if (!this.updatedStock || !this.updatedStock.id) {
      console.error('Không thể cập nhật vì thiếu ID');
      return;
    }

    this.httpService.updateStock(this.updatedStock.id.toString(), this.updatedStock).subscribe(
      () => {
        alert('Cổ phiếu đã được cập nhật!');
        this.stock = { ...this.updatedStock };
        this.isEditing = false;
      },
      (error) => console.error('Lỗi khi cập nhật cổ phiếu:', error)
    );
  }
  goBack() {
    this.router.navigate(['/stocks']);
  }
}
