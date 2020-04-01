import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent implements OnInit {

  currentWallet: any;
  constructor(
      public dialogRef: MatDialogRef<EditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentWallet = JSON.parse(JSON.stringify(data.wallet));
  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
