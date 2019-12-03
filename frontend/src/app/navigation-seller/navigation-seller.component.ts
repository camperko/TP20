/*
This component handles navigation for logged user.
- Lenočka.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-navigation-seller',
  templateUrl: './navigation-seller.component.html',
  styleUrls: ['./navigation-seller.component.sass']
})
export class NavigationSellerComponent {

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }


}
