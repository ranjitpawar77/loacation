import { Component } from '@angular/core'; import { OnInit, ViewEncapsulation } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import AddpinService from '../addpin.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css'],
  encapsulation: ViewEncapsulation.None // Disable view encapsulation for custom styles
})
export class ViewMapComponent {
  map!: any;
  currentLocationMarker: any = null; // To store the current location marker
  searchResults: any[] = [];
  searchQuery: string = '';
  selectedZoomLevel: number = 13; // Default zoom level

  locations: any[] = [
    { lonLat: [73.855699, 18.516726], name: 'Location 1' }, // Pune, Maharashtra, India
    { lonLat: [73.9749953, 18.581568], name: 'Wagholi' }, // Hyderabad, Telangana, India
    { lonLat: [75.909936, 17.659920], name: 'Solapur' },// Solapur, Maharashtra, India
    { lonLat: [73.785973, 20.005934], name: 'Nashik' }, // Nashik, Maharashtra, India
    { lonLat: [74.575531, 16.853739], name: 'Sangli' }, // Sangli, Maharashtra, India
    { lonLat: [74.233265, 16.704370], name: 'Kolhapur' },// Kolhapur, Maharashtra, India
    { lonLat: [80.278471, 13.087840], name: 'Chennai' }, // Chennai, Tamil Nadu, India
    { lonLat: [78.474444, 17.385044], name: 'Hyderabad' }, // Hyderabad, Telangana, India
    { lonLat: [18.561288, 73.944444], name: 'Scalar Techhub' },
  ];

  constructor(
    private dialog: MatDialog,
    private addpin: AddpinService,
  ) {
  }

  ngOnInit() {
    window.localStorage.setItem('locations', JSON.stringify(this.locations));
    this.initializeMap();
    this.addPins();
    this.setupClickEvent();
    const locationSelect = document.getElementById('locationSelect') as HTMLSelectElement;
    locationSelect.addEventListener('change', () => {
      const selectedLocationIndex = locationSelect.selectedIndex;
      if (selectedLocationIndex !== -1) {
        this.zoomToLocation(this.locations[selectedLocationIndex], 13);
      }
    });
    this.addpin.getCollection().subscribe((data) => {
      data.forEach((value: any) => {
        this.locations.push(value)
      })
    });
    const currentLocationButton = document.getElementById('currentLocationButton') as HTMLButtonElement;
    currentLocationButton.addEventListener('click', () => {
      this.getCurrentLocation();

      this.zoomToLocation(this.selectedZoomLevel, 13)


      
    });
  }

  zoomToLocation(location: any, zoomLevel: number) {
    const lonLat = fromLonLat(location.lonLat);
    this.map.getView().animate({ center: lonLat, zoom: zoomLevel });
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
    this.map.on('click', (event: any) => {
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

  openDialog() {
    const dialogRef = this.dialog.open(MyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.addLocation(result)
      }
    });
  }

  addLocation(result: any) {
    const newLocation = {
      name: result.name,
      lonLat: [
        parseFloat(result.longitude),
        parseFloat(result.latitude),
      ],
    };
    this.addpin.addPinLocation(result)
    this.locations.push(newLocation);
    this.addPin(newLocation);

  }

  addPin(location: any) {
    const lonLat = fromLonLat(location.lonLat);
    const newPin = new Feature({
      geometry: new Point(lonLat),
      name: location.name
    });
    const markerLayer = this.map.getLayers().getArray().find((layer: any) => layer instanceof VectorLayer);
    if (markerLayer) {
      const source = markerLayer.getSource();
      source.addFeature(newPin);
    }
  }

  addPinToFirestore(pinLocation: any) {
    this.addpin.addPinLocation(pinLocation).then(() => {
      console.log('Pin added to Firestore successfully');
    }).catch((error) => {
      console.error('Error adding pin to Firestore:', error);
    });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lonLat: [position.coords.longitude, position.coords.latitude],
          name: 'Current Location'
        };
        // Set the zoom level to 13 when zooming to the current location
        this.selectedZoomLevel = 13
        this.zoomToLocation(currentLocation, this.selectedZoomLevel);
      },
        (error) => {
          console.error('Error getting current location:', error);
        });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }



  // searchLocation() {
  //   this.searchResults = this.locations.filter(
  //     location => location.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  //   if (this.searchResults.length > 0) {
  //     // Get the first matching location (you can handle multiple results differently)
  //     const selectedLocation = this.searchResults[0];
  //     this.zoomToLocation(selectedLocation);
  //   }
  // }

  onZoomLevelChange(zoomLevel: number) {
    this.selectedZoomLevel = zoomLevel;
    const locationSelect = document.getElementById('locationSelect') as HTMLSelectElement;
    const selectedLocationIndex = locationSelect.selectedIndex;
    if (selectedLocationIndex !== -1) {
      this.zoomToLocation(this.locations[selectedLocationIndex], this.selectedZoomLevel);   
    }
  }
  zoomToSelectedLocation(locationName: string) {
    const selectedLocation = this.locations.find(location => location.name === locationName);
    if (selectedLocation) {
      this.zoomToLocation(selectedLocation,13); // Use the zoom level from the selected location or default to 13
    }
  }

  
}
