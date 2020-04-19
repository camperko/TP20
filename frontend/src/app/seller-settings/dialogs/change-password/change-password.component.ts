import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {SellerSettingsService} from '@app/seller-settings/seller-settings.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  newPasswordRep: string;
  matchingPasswords = true;
  passwordLength = true;
  wrongPassword = false;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private sellerSettingsService: SellerSettingsService) {
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
    this.sellerSettingsService.checkPassword(this.oldPassword).subscribe(response => {
      if (response.checkPassword === 'success') {
        this.dialogRef.close(this.newPassword);
      } else {
        this.wrongPassword = true;
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
