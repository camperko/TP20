import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.sass']
})
export class ChangeEmailComponent implements OnInit {
  oldEmail: string;
  newEmail: string;
  newEmailRep: string;
  correctEmail = true;
  matchingEmails = true;

  constructor(
      public dialogRef: MatDialogRef<ChangeEmailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.oldEmail = JSON.parse(JSON.stringify(data.email));
    this.newEmail = '';
    this.newEmailRep = '';
  }

  ngOnInit() {
  }

  validateEmail() {
    const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$');
    if (this.newEmail !== this.newEmailRep) {
      this.matchingEmails = false;
      return;
    } else {
      this.matchingEmails = true;
    }
    if (!regex.test(this.newEmail)) {
      this.correctEmail = false;
      return;
    } else {
      this.correctEmail = true;
    }
    this.dialogRef.close(this.newEmail);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
