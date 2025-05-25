import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.sevice';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  username = '';
  password = '';
  submitted = false;
  errorMessage = '';

  users: User[] = []; // Danh sách người dùng từ data.json

  constructor(private router: Router, private httpService: HttpServiceService) {
    this.loadUsers();
  }

  // Load danh sách user từ data.json
  loadUsers() {
    this.httpService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Lỗi khi tải danh sách user:', error);
      }
    );
  }

  login() {
    this.submitted = true;

    if (!this.username || !this.password) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }

    const user = this.users.find(u => u.username === this.username && u.password === this.password);

    if (user) {
      console.log('Đăng nhập thành công!');
      this.router.navigate(['/stocks']); // Điều hướng đến danh sách cổ phiếu
    } else {
      this.errorMessage = 'Tài khoản hoặc mật khẩu không đúng!';
    }
  }
}
