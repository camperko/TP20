import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string;
  newPasswordRep: string;
  matchingPasswords = true;
  passwordLength = true;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>) {
    this.newPasswordRep = '';
    this.newPassword = '';
  }

  ngOnInit() {
  }

  validatePassword() {
    if (this.newPassword !== this.newPasswordRep) {
      this.matchingPasswords = false;
      return;
    } else {
      this.matchingPasswords = true;
    }
    if (this.newPassword.length < 8) {
      this.passwordLength = false;
      return;
    } else {
      this.passwordLength = true;
    }
    this.dialogRef.close(this.newPassword);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
