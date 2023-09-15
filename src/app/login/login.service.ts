import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private route: Router) {}
  login(email: string, password: string) {
    if (email === 'admin@gmail.com' && password === 'Admin') {
      // this.route.navigateByUrl('/rooms/add');
      this.isLoggedIn = true;
      this.isAdmin = true;
    }
    if (email === 'user@gmail.com' && password === 'user') {
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
    return this.isLoggedIn;
  }
}
