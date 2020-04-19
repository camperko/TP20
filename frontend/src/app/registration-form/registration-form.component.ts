import { Component, OnInit } from '@angular/core';
import { RegistrationFormService } from './registration-form.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass']
})

// This component is used for registration form
// and it's inputs validations. If the inputs are not valid
// warning alerts are shown. If inputs are valid, they are
// sent to the server for new user verification. Depending on the response
// from server, different alert messagess are shown(success / fail).

export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  error;
  validationPwd = '';
  regFail = '';
  regSuccess = '';
  chckbox = false;
  captcha = false;
  constructor(private messageService: RegistrationFormService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      repEmail: new FormControl(''),
      password: new FormControl(''),
      repPassword: new FormControl(''),
      recaptchaReactive: new FormControl()
    });
    // this.username = '';
    // this.password = '';
    // this.repPassword = '';
  }

  // method used to send data to server
  sendData() {

    if (this.chckbox === false) {
      this.regFail = '';
      this.regSuccess = '';
      this.validationPwd = 'You must agree with the terms of service!';
      return;
    }
    // validation for the username
    if (this.registrationForm.controls.username.value.length < 3) {
      this.regFail = '';
      this.regSuccess = '';
      this.validationPwd = 'Username is too short. Minimal length is 3 characters!';
      return;
    }

    // validation, whether passowrd contains >= 8 characters
    if (this.registrationForm.controls.password.value.length < 8) {
      this.regFail = '';
      this.regSuccess = '';
      this.validationPwd = 'Password is too short. Minimal length is 8 characters!';
      return;
    }

    const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$');
    if (!regex.test(this.registrationForm.controls.email.value)) {
      this.regFail = '';
      this.regSuccess = '';
      this.validationPwd = 'Bad format of entered email!';
      return;
    }
    // validation, whether password and repeat password inputs are equal
    if (this.registrationForm.controls.password.value !== this.registrationForm.controls.repPassword.value) {
      this.regFail = '';
      this.regSuccess = '';
      this.validationPwd = 'Passwords do not match. Please re-enter them!';
      return;
    }
    if (this.registrationForm.controls.email.value !== this.registrationForm.controls.repEmail.value) {
      this.regFail = '';
      this.regSuccess = '';
      this.validationPwd = 'Emails do not match. Please re-enter them!';
      return;
    }
    if (!this.captcha) {
      this.validationPwd = '';
      this.regSuccess = '';
      this.regFail = 'Captcha authentification required!';
      return;
    }
    this.validationPwd = '';
    // use of registration-form service to send data to the server
    this.messageService.postDataToServer(this.registrationForm.controls.username.value,
                                        this.registrationForm.controls.email.value,
                                        this.registrationForm.controls.password.value).subscribe(
      response => {
        // getting the response from server
        if (Object.values(response)[0] === 'success') {
          this.regSuccess = 'Registration successful!';
          this.validationPwd = '';
          this.regFail = '';
        }
        if (Object.values(response)[0] === 'fail') {
          this.regFail = 'Registration failed! Please change your username!';
          this.validationPwd = '';
          this.regSuccess = '';
        }
      },
      error => this.error
    );
    console.log('Registration data sent');
  }

  async resolved(captchaResponse: string, res) {
    console.log(`Resolved response token: ${captchaResponse}`);
    await this.sendTokenToBackend(captchaResponse);
  }

  // function to send the token to the node server
  sendTokenToBackend(tok) {
  // calling the service and passing the token to the service
  this.messageService.sendToken(tok).subscribe(
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
