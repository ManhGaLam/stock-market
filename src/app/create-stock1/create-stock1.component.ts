import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../services/stock.service';
import { Stock } from '../model/stock';
import { HttpServiceService } from '../services/http-service.sevice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-stock1',
  standalone: true,
  templateUrl: './create-stock1.component.html',
  styleUrl: './create-stock1.component.scss',
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateStock1Component {
  stockForm: FormGroup;
  successMessage = ''; // 🟢 Thêm biến hiển thị thông báo
  errorMessage = '';   // 🔴 Thêm biến hiển thị lỗi

  constructor(private fb: FormBuilder, private httpService: HttpServiceService, private router: Router) {
    this.stockForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      confirm: [false, Validators.requiredTrue]
    });
  }

  get f() {
    return this.stockForm.controls;
  }

  createStock() {
    if (this.stockForm.valid) {
      const newStock = new Stock(
        this.stockForm.value.name,
        this.stockForm.value.code,
        +this.stockForm.value.price,
        0,
        '', 
        false
      );

      this.httpService.addStock(newStock).subscribe(
        () => {
          this.successMessage = '✅ Cổ phiếu đã được tạo thành công!';
          this.errorMessage = ''; // Xóa thông báo lỗi nếu có
          this.stockForm.reset({ price: '', confirm: false });
          
          setTimeout(() => {
            this.router.navigate(['/stocks']); // ⏳ Điều hướng về danh sách
          }, 1500);
        },
        (error) => {
          this.errorMessage = '❌ Lỗi khi tạo cổ phiếu, vui lòng thử lại!';
          this.successMessage = '';
          console.error('Error adding stock:', error);
        }
      );
    }
  }
}
