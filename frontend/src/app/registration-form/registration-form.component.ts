import { Component, OnInit, OnChanges } from '@angular/core';
import { RegistrationFormService } from './registration-form.service';
import { format } from 'url';
import { Response } from 'selenium-webdriver/http';
import { discardPeriodicTasks } from '@angular/core/testing';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass']
})

//This component is used for registration form
//and it's inputs validations. If the inputs are not valid
//warning alerts are shown. If inputs are valid, they are
//sent to the server for new user verification. Depending on the response
//from server, different alert messagess are shown(success / fail).

export class RegistrationFormComponent implements OnInit {

  username;
  error;
  validationPwd = '';
  regFail = '';
  regSuccess = '';
  password;
  repPassword;
  constructor(private messageService: RegistrationFormService) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.repPassword = '';
  }

  // method used to send data to server
  sendData() {
    // validation, whether passowrd contains >= 8 characters
    if(this.password.length < 8){
      this.regFail = '';
      this.regSuccess = '';
      this.validationPwd = 'Password is too short. Minimal lenght is 8 characters!';
      return;
    }
   
    // validation, whether password and repeat password inputs are equal
    if (this.password !== this.repPassword) {
      this.regFail = '';
      this.regSuccess = '';
      this.validationPwd = 'Passwords do not match. Please re-enter them!';
      return;
    }
    this.validationPwd = '';
    let data = {username: this.username,
                password: this.password };
    // use of registration-form service to send data to the server
    this.messageService.postDataToServer(data).subscribe(
      response => {
        // getting the response from server
        if(Object.values(response)[0] === 'success'){
          this.regSuccess = 'Registration successful!';
          this.validationPwd = '';
          this.regFail = '';
        }
       
        if(Object.values(response)[0] === 'fail'){
          this.regFail = 'Registration failed! Please change you username!';
          this.validationPwd = '';
          this.regSuccess = '';
        }
      },
      error => this.error
    );
    console.log('Registration data sent');
  }
}