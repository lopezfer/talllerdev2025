import { Component } from '@angular/core';
import { ModalController, RouterEventDetail } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
// PARA SWIPER
import { register} from 'swiper/element/bundle';
register()

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
    public modal: ModalController,
    public db: DatabaseService
  ) {
    //  este metodo funciona
    this.db.fetchFirestoreCollection('cities').subscribe((res: any) => {
      console.log('Local Collection: ', res);
    })
  }

  testDB(){
    //este metodo no funciona y genera error
    this.db.fetchFirestoreCollection('cities').subscribe((res: any) => {
      console.log('Local Collection: ', res);
    })
  }

  loadCities() {
    let listCities = [
      { name: 'La Paz', gps: { lat: -16.500000, lon: -68.150002 }, department: 'La Paz' },
      { name: 'Santa Cruz', gps: { lat: -17.783327, lon: -63.182116 }, department: 'Santa Cruz' },
      { name: 'Cochabamba', gps: { lat: -17.389500, lon: -66.156800 }, department: 'Cochabamba' },
      { name: 'Sucre', gps: { lat: -19.033320, lon: -65.262740 }, department: 'Chuquisaca' },
      { name: 'Oruro', gps: { lat: -17.983329, lon: -67.150002 }, department: 'Oruro' },
      { name: 'Potosí', gps: { lat: -19.583330, lon: -65.750000 }, department: 'Potosí' },
      { name: 'Tarija', gps: { lat: -21.535490, lon: -64.729560 }, department: 'Tarija' },
      { name: 'Trinidad', gps: { lat: -14.833333, lon: -64.900002 }, department: 'Beni' },
      { name: 'Cobija', gps: { lat: -11.033330, lon: -68.733330 }, department: 'Pando' }
    ];
    listCities.forEach((city: any) => {
      console.log('çargando ciudad', city);
      this.db.addFirestoreDocument('cities', city)
        .then((res) => {
          console.log('cities: ', res.id);
        }).catch((error) => {
          console.error('Error adding document: ', error);
        })
    })
  }

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
    console.log('adasdasd')
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
