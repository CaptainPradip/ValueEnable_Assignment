import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './Models/role';
import { User } from './Models/user';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get role() {
      return this.currentUser && this.currentUser.role;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
