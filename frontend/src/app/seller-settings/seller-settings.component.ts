import { Component, OnInit } from '@angular/core';
import {SellerSettingsService} from '@app/seller-settings/seller-settings.service';
import {MatDialog} from '@angular/material';
import {DeleteDialogComponent} from '@app/seller-settings/dialogs/delete-dialog/delete-dialog.component';
import {EditDialogComponent} from '@app/seller-settings/dialogs/edit-dialog/edit-dialog.component';
import {CreateDialogComponent} from '@app/seller-settings/dialogs/create-dialog/create-dialog.component';
import {ChangeEmailComponent} from '@app/seller-settings/dialogs/change-email/change-email.component';
import {ChangePasswordComponent} from '@app/seller-settings/dialogs/change-password/change-password.component';
import {PopUpDialogComponent} from '@app/dialogs/pop-up-dialog/pop-up-dialog.component';

@Component({
  selector: 'app-seller-settings',
  templateUrl: './seller-settings.component.html',
  styleUrls: ['./seller-settings.component.sass']
})
export class SellerSettingsComponent implements OnInit {
  sellerWallets: any[];

  constructor(private sellerSettingsService: SellerSettingsService, public dialog: MatDialog) {
    this.sellerWallets = [];
    this.sellerSettingsService.getSellerWallets().subscribe(data => {
      if (data.wallets !== 'failed') {
        this.sellerWallets = data.wallets;
      }
    });
  }

  ngOnInit() {

  }

  openDeleteDialog(index: number, currentWallet: any): void {
    const deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '550px',
      data: {
        currency_name: currentWallet.type_name,
        currency_display: currentWallet.type_display,
        wallet_address: currentWallet.wallet_address
      }
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteWallet(index);
      }
    });
  }

  deleteWallet(index: number): void {
    const walletId = this.sellerWallets[index].user_trans_id;
    this.sellerWallets.splice(index, 1);
    this.sellerSettingsService.deleteWallet(walletId).subscribe(data => {
      console.log(data.delete);
    });
  }

  openEditDialog(index: number, currentWallet: any): void {
    const editDialogRef = this.dialog.open(EditDialogComponent, {
      width: '1000px',
      data: {
        currencies: this.sellerSettingsService.transactionTypes,
        wallet: currentWallet,
        wallets: this.sellerWallets
      }
    });

    editDialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        currentWallet = result;
        currentWallet.type_display = this.sellerSettingsService.transactionTypes.find(transType => transType.type_name === currentWallet.type_name).type_display;
        this.editWallet(index, currentWallet);
      }
    });
  }

  editWallet(index: number, currentWallet: any): void {
    this.sellerWallets[index] = currentWallet;
    const transTypeId = this.sellerSettingsService.transactionTypes.find(transType => transType.type_name === currentWallet.type_name).trans_type_id;
    this.sellerSettingsService.updateWallet(currentWallet.user_trans_id, currentWallet.wallet_address, transTypeId).subscribe(data => {
      console.log(data);
    });
    if (currentWallet.is_primary) {
      this.setPrimary(currentWallet.user_trans_id);
      this.updatePrimaryFlag(currentWallet);
    } else {
      this.unsetPrimary(currentWallet.user_trans_id);
    }
  }

  openCreateDialog(): void {
    const createDialogRef = this.dialog.open(CreateDialogComponent, {
      width: '1000px',
      data: {
        currencies: this.sellerSettingsService.transactionTypes,
        wallets: this.sellerWallets
      }
    });

    createDialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newWallet = {
          user_trans_id: undefined,
          wallet_address: result.wallet_address,
          is_primary: result.is_primary,
          type_name: result.type_name,
          type_display: this.sellerSettingsService.transactionTypes.find(transType => transType.type_name === result.type_name).type_display
        };
        this.createWallet(newWallet);
      }
    });
  }

  createWallet(newWallet: any): void {
    const transTypeId = this.sellerSettingsService.transactionTypes.find(transType => transType.type_name === newWallet.type_name).trans_type_id;
    this.sellerSettingsService.createWallet(newWallet.wallet_address, transTypeId).subscribe(data => {
      newWallet.user_trans_id = data.wallet.user_trans_id;
      this.sellerWallets.push(newWallet);
      console.log(data);
      if (newWallet.is_primary) {
        this.setPrimary(newWallet.user_trans_id);
        this.updatePrimaryFlag(newWallet);
      }
    });
  }

  changePrimary(currentWallet: any): void {
    if (currentWallet.is_primary) {
      this.setPrimary(currentWallet.user_trans_id);
      this.updatePrimaryFlag(currentWallet);
    } else {
      this.unsetPrimary(currentWallet.user_trans_id);
    }
  }

  updatePrimaryFlag(currentWallet: any): void {
    this.sellerWallets.forEach(wallet => {
      if (wallet !== currentWallet) {
        wallet.is_primary = false;
      }
    });
  }

  setPrimary(walletId: number): void {
    this.sellerSettingsService.updatePrimaryWallet(walletId).subscribe(data => {
      console.log(data);
    });
  }

  unsetPrimary(walletId: number): void {
    this.sellerSettingsService.unsetPrimaryWallet(walletId).subscribe(data => {
      console.log(data);
    });
  }

  openEmailDialog(): void {
    const changeEmailDialogRef = this.dialog.open(ChangeEmailComponent, {
      width: '800px',
      data: {
        email: this.sellerSettingsService.merchantEmail
      }
    });

    changeEmailDialogRef.afterClosed().subscribe(newEmail => {
      if (newEmail !== undefined) {
        this.changeEmail(newEmail);
        this.sellerSettingsService.merchantEmail = newEmail;
      }
    });
  }

  changeEmail(newEmail: string): void {
    this.sellerSettingsService.changeEmail(newEmail).subscribe(data => {
      console.log(data);
    });
  }

  openPasswordDialog(): void {
    const changePasswordDialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '700px'
    });

    changePasswordDialogRef.afterClosed().subscribe(newPassword => {
      if (newPassword !== undefined) {
        this.changePassword(newPassword);
      }
    });
  }

  changePassword(newPassword: string): void {
    this.sellerSettingsService.changePassword(newPassword).subscribe(data => {
      if (data.changePassword === 'success') {
        this.dialog.open(PopUpDialogComponent, {
          width: '350px',
          data: {
            message: 'Password successfully changed!'
          }
        });
      }
    });
  }
}
