/*
This component is home page for logged user. Not to be mistaken for home component.
- Lenočka
*/

import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home-seller.component.html' })
export class HomeSellerComponent {

    constructor() { }

    ngOnInit() {
    }
}