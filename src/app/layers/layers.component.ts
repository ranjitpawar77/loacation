import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LayersComponent implements OnInit {

  map!:any;
  locations: any[]= [
    { lonLat: [73.855699, 18.516726], name: 'Location 1' }, // Pune, Maharashtra, India
    { lonLat: [18.588500, 73.982200], name: 'Wagholi' }, // Hyderabad, Telangana, India
    { lonLat: [75.909936, 17.659920], name: 'Solapur' } ,// Solapur, Maharashtra, India
    { lonLat: [73.785973, 20.005934], name: 'Nashik' }, // Nashik, Maharashtra, India
    { lonLat: [74.575531, 16.853739], name: 'Sangli' }, // Sangli, Maharashtra, India
    { lonLat: [74.233265, 16.704370], name: 'Kolhapur' } ,// Kolhapur, Maharashtra, India
    { lonLat: [80.278471, 13.087840], name: 'Chennai' }, // Chennai, Tamil Nadu, India
    { lonLat: [78.474444, 17.385044], name: 'Hyderabad' }, // Hyderabad, Telangana, India
    { lonLat: [18.561288, 73.944444], name: 'Scalar Techhub' }
  
    
  ];

  constructor() {    
  }

  ngOnInit() {
    this.initializeMap();
    this.addPins();
    this.setupClickEvent();
  
    const locationSelect = document.getElementById('locationSelect') as HTMLSelectElement;
    locationSelect.addEventListener('change', () => {
      const selectedLocationIndex = locationSelect.selectedIndex;
      if (selectedLocationIndex !== -1) {
        this.zoomToLocation(this.locations[selectedLocationIndex]);
      }
    });
  }
  

  zoomToLocation(location: any) {
    const lonLat = fromLonLat(location.lonLat);
    this.map.getView().animate({ center: lonLat, zoom: 10 });
  }
  

  initializeMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([73.855699, 18.516726]),
        zoom: 5
      })
    });
  }

  addPins() {
    const features = this.locations.map(location => {
      return new Feature({
        geometry: new Point(fromLonLat(location.lonLat)),
        name: location.name
      });
    });
    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: features
      }),
      style: new Style({
        image: new Icon({
          src: '../../assets/location-removebg-preview.png',
          anchor: [0.5, 1],
          scale: 0.2
        })
      })
    });
    this.map.addLayer(markerLayer);
  }

  setupClickEvent() {
    this.map.on('click', (event:any) => {
      const lonLat = fromLonLat(event.coordinate);
      const newPin = new Feature({
        geometry: new Point(lonLat),
        name: 'solapur'
      });

      const markerLayer = this.map.getLayers().getArray().find((layer: any) => layer instanceof VectorLayer);
      if (markerLayer) {
        const source = markerLayer.getSource();
        source.addFeature(newPin);
      }
    });
  }



}
