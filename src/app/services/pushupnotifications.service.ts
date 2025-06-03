import { Injectable } from '@angular/core';
import { PushNotifications, Token, PushNotification } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PushupnotificationsService {

  constructor(
    public platform: Platform,
    public db: DatabaseService,
    public auth: AuthService
  ) { }

  initPushnots() {
    if (this.platform.is('capacitor')) {
      PushNotifications.requestPermissions()
        .then(result => {
          if (result.receive === 'granted') {
            PushNotifications.register();
          } else {
            console.warn('Permiso denegado');
          }
        });

      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Token registrado:', token.value);
        if (this.auth.profile) {
          this.db.updateFireStoreDocument('users', this.auth.profile.id, { pushToken: token.value })
            .then(() => {
              console.log('Token guardado en Firestore');
            })
            .catch((error: any) => {
              console.error('Error al guardar el token en Firestore:', error);
            })
        }
      });

      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
        console.log('Notificación recibida:', notification);
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Interacción:', notification);
      });
    }
  }
}
