import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: false
})
export class GeolocationPage implements OnInit {

  currentPosition: any

  constructor() { }

  ngOnInit() { }

  getCurrentPosition() {
    Geolocation.getCurrentPosition()
      .then(
        (resultado) => {
          this.currentPosition = resultado;
          console.log('Current Position:', this.currentPosition);
        }
      ).catch((error) => {
        console.error('Error getting current position:', error);
      });
  }

}
