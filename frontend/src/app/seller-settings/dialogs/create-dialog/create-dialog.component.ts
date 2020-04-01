import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.sass']
})
export class CreateDialogComponent implements OnInit {
  currentWallet: any;

  constructor(
      public dialogRef: MatDialogRef<CreateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentWallet = {
      type_name: undefined,
      wallet_address: '',
      is_primary: false
    };
  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
