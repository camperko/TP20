import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.sass']
})
export class CreateDialogComponent implements OnInit {
  alreadyExists = false;
  currentWallet: any;
  sellerWallets: any[];
  constructor(
      public dialogRef: MatDialogRef<CreateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentWallet = {
      type_name: undefined,
      wallet_address: '',
      is_primary: false
    };
    this.sellerWallets = data.wallets;
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
