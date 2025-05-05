import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, tileLayer, marker, icon, circle } from 'leaflet';
import * as L from 'leaflet';
import { DatabaseService } from 'src/app/services/database.service';
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
    //this.loadRestaurantes()

    this.db.fetchFirestoreCollection('restaurantes')
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.items = data
        }
      })

  }

  loadRestaurantes() {
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
    restaurants.forEach(element => {
      this.db.addFirestoreDocument('restaurantes', element)
    });
  }

  ngOnInit() { }
  ngAfterViewInit(): void {
    // Delay to ensure the map is rendered after the view is initialized

    setTimeout(() => {
      console.log('MapPage ngOnInit');
      this.loadMap()
    }, 3000);
  }

  loadMap() {

    this.map = L.map('map', {
      center: [-16.5, -68.15], // Coordenadas de La Paz, Bolivia
      zoom: 13
    });
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


    /*     L.marker([-16.5, -68.15]
          , {
            icon: icon({
              iconUrl: 'assets/icon/favicon.png',
              iconSize: [38, 38], // Tamaño del icono
              iconAnchor: [22, 94], // Punto del icono que corresponde a las coordenadas del marcador
              popupAnchor: [-15, -88] // Punto desde el que se abrirá el popup en relación al icono
            })
          }
        ).addTo(this.map)
          .bindPopup('¡Hola desde La Paz!')
          .openPopup(); */

  }

}
