import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private route: Router, private loginService: LoginService) {}

  ngOnInit(): void {}
  // login() {
  //   if (this.email === 'admin@gmail.com' && this.password === 'Admin') {
  //     // this.route.navigate([/rooms]); // Unterminated regular expression literal. with out use of quotyation ''
  //     // 1st method take list of commands
  //     // this.route.navigate(['/rooms', 'add']);
  //     // 2nd method navigateByUrl give url path string just give url path
  //     this.route.navigateByUrl('/rooms/add');
  //     // alert('Login Successful');
  //   }
  // }
  login() {
    if (this.loginService.login(this.email, this.password)) {
      this.route.navigate(['/rooms']);
    }
  }
}
