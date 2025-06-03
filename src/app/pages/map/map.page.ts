import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, tileLayer, marker, icon, circle } from 'leaflet';
import * as L from 'leaflet';
import { DatabaseService } from 'src/app/services/database.service';

import { Geolocation } from '@capacitor/geolocation';
//import { Permissions } from '@capacitor/permissions';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: false
})
export class MapPage implements OnInit {

  map: any;
  items: any;
  constructor(
    public db: DatabaseService
  ) {
    this.db.fetchFirestoreCollection('restaurantes')
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.items = data;
          this.loadMap();
        }
      })

    this.db.getAllSubcollectionGroup('menu')
      .subscribe((data: any) => {
        console.log('menu', data);
      })
  }

  ngOnInit() { }

  loadMap() {
    //crea el mapa
    this.map = L.map('map', {
      center: [-16.5, -68.15], // Coordenadas de La Paz, Bolivia
      zoom: 13
    });
    // lee os items uno a uno y los agrega al mapa
    this.items.forEach((element: any) => {
      L.marker([element.lat, element.lng]
        , {
          icon: icon({
            iconUrl: 'assets/icon/favicon.png',
            iconSize: [38, 38], // Tamaño del icono
            iconAnchor: [22, 94], // Punto del icono que corresponde a las coordenadas del marcador
            popupAnchor: [-15, -88] // Punto desde el que se abrirá el popup en relación al icono
          })
        }
      ).addTo(this.map);
    })
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
     
      if ((window as any).Capacitor && (window as any).Capacitor.isNativePlatform()) {
        const permission = await Geolocation.requestPermissions();
        if (permission.location === 'denied') {
          console.log('permiso denegado')
          return;
        }
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        console.log('Ubicación actual:', latitude, longitude);
        this.marcarUbicacion(latitude, longitude);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Ubicación actual (web):', latitude, longitude);
            this.marcarUbicacion(latitude, longitude);
          },
          (error) => {
            console.error('Error al obtener ubicación (web):', error);
          });
      }
    } catch (error) {
      console.error('Error general al obtener ubicación:', error);
    }
  }

  marcarUbicacion(lat: number, lng: number) {
    this.map.setView([lat, lng], 15);
    L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: 'assets/icon/position.png',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      })
    }).addTo(this.map).bindPopup('Estás aquí').openPopup();
    L.circle([lat, lng], {
      radius: 100,
      color: 'blue',
      fillColor: '#30f',
      fillOpacity: 0.2
    }).addTo(this.map);
  }


  loadRestaurantes() {
    ///  crea y carga restaurantes en firestore
    let restaurants = [
      { name: 'Gustu', address: 'Calle 10, Calacoto, La Paz', lat: -16.523, lng: -68.112, open: true },
      { name: 'Namas Té', address: 'Av. Montenegro, San Miguel, La Paz', lat: -16.522, lng: -68.121, open: false },
      { name: 'Ali Pacha', address: 'Calle Colón, Centro, La Paz', lat: -16.495, lng: -68.133, open: true },
      { name: 'Cafe Typica', address: 'Calle Sagárnaga, Centro, La Paz', lat: -16.496, lng: -68.134, open: true },
      { name: 'Vainilla Coffee', address: 'Calle 21, Calacoto, La Paz', lat: -16.525, lng: -68.110, open: false },
      { name: 'The Writer\'s Coffee', address: 'Calle Comercio, Centro, La Paz', lat: -16.500, lng: -68.137, open: true },
      { name: 'Mozzarella Pizza', address: 'Av. Arce, Sopocachi, La Paz', lat: -16.508, lng: -68.123, open: true },
      { name: 'La Tranquera', address: 'Calle 15, Calacoto, La Paz', lat: -16.524, lng: -68.115, open: false },
      { name: 'Chez Moustache', address: 'Calle Jaén, Centro, La Paz', lat: -16.497, lng: -68.136, open: true },
      { name: 'El Patio', address: 'Calle Tarija, Sopocachi, La Paz', lat: -16.507, lng: -68.122, open: true }
    ];
    //almacena restaurantes uno por uno
    restaurants.forEach(element => {
      this.db.addFirestoreDocument('restaurantes', element)
    });
  }
}
