/*
This component handles login form.
- Lenočka
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = '';
  loading = false;
    submitted = false;
    returnUrl: string;
    captcha = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService) {
    

   }

  ngOnInit() {
     this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            recaptchaReactive: new FormControl()
        });

        // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user/home';
  }

  get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        if (!this.captcha) {
          this.error = 'Captcha authentification required!';
          this.loading = false;
          return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.cookieService.set('id', data.id);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

  async resolved(captchaResponse: string, res) {
    console.log(`Resolved response token: ${captchaResponse}`);
    await this.sendTokenToBackend(captchaResponse);
  }

    // function to send the token to the node server
  sendTokenToBackend(tok) {
    // calling the service and passing the token to the service
    this.authenticationService.sendToken(tok).subscribe(
      data => {
        console.log(data);
        this.captcha = data.success;
      },
      err => {
        console.log(err);
      },
      () => {}
    );
    }
}
