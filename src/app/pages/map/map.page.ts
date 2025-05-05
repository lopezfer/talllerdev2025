import { Component, OnInit , AfterViewInit} from '@angular/core';
import { Map, tileLayer, marker, icon, circle } from 'leaflet';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: false
})
export class MapPage implements OnInit {

  map: Map | undefined;
  constructor() {

  }

  ngOnInit() { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('MapPage ngOnInit');
      this.loadMap()
    }, 1000); // Delay to ensure the map is rendered after the view is initialized
  }

  loadMap() {
    this.map = L.map('map', {
      center: [-16.5, -68.15], // Coordenadas de La Paz, Bolivia
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([-16.5, -68.15]
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
      .openPopup();

  }

}
