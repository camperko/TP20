import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent implements OnInit {
  alreadyExists = false;
  currentWallet: any;
  sellerWallets: any[];
  constructor(
      public dialogRef: MatDialogRef<EditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentWallet = JSON.parse(JSON.stringify(data.wallet));
    this.sellerWallets = JSON.parse(JSON.stringify(data.wallets));
    this.sellerWallets = this.sellerWallets.filter(wallet => wallet.type_name !== this.currentWallet.type_name);
  }

  ngOnInit() {
  }

  checkExistingWallets() {
    if (this.sellerWallets.find(wallet => wallet.type_name === this.currentWallet.type_name) !== undefined) {
      this.alreadyExists = true;
    } else {
      this.alreadyExists = false;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
