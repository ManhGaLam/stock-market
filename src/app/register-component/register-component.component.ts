import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpServiceService } from '../services/http-service.sevice';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private httpService: HttpServiceService) {}

  register() {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }

    const newUser: User = {
      id: Date.now(), // ID tự động
      username: this.username,
      password: this.password
    };

    this.httpService.addUser(newUser).subscribe(
      () => {
        alert('Tạo tài khoản thành công!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Lỗi khi đăng ký:', error);
        this.errorMessage = 'Đăng ký thất bại, vui lòng thử lại!';
      }
    );
  }
}
