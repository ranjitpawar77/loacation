import { Component } from '@angular/core';
import {  OnInit, AfterViewInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    const map = new Map({
      target: 'mumbai-map', // The HTML element where the map will be rendered
      layers: [
        new TileLayer({
          source: new OSM() // OpenStreetMap as the base layer
        })
      ],
      view: new View({
        center: [72.8777, 19.0760], // Mumbai coordinates (longitude, latitude)
        zoom: 4 // Initial zoom level
      })
    });
  }


}
