import { Component } from '@angular/core';
import { ModalController, RouterEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isActionSheetOpen: boolean = false;
  actionSheetButtons = [
    {
      text: 'Borrar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
      handler: () => {
        console.log('Borrar clicked');
      }
    },
    {
      text: 'Compartir',
      data: {
        action: 'share',
      },
      handler: () => {
        console.log('Compartir clicked');
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  constructor(
    public modal: ModalController
  ) { }
  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  onWillDismiss(event: any) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
}
