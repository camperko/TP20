import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'blockchain-gateway';
  currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private cookieService: CookieService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.cookieService.delete('id');
        this.router.navigate(['/login']);
    }
}
