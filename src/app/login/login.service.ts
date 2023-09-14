import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;

  constructor(private route: Router) {}
  login(email: string, password: string) {
    if (email === 'admin@gmail.com' && password === 'Admin') {
      // this.route.navigateByUrl('/rooms/add');
      return (this.isLoggedIn = true);
    }
    return this.isLoggedIn;
  }
}
