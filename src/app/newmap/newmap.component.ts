import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as geofire from "geofire-common"
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, orderBy, startAt, endAt, getDocs, doc } from 'firebase/firestore';
import { AnyType } from 'ol/expr/expression';
import { max } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import AddpinService from '../addpin.service';
interface YourDataType {
  geohash: string;
  // Other properties you have in your document
}
@Component({
  selector: 'app-newmap',
  templateUrl: './newmap.component.html',
  styleUrls: ['./newmap.component.css']
})

export class NewmapComponent implements OnInit {
  addpin: any;
  locations: any;
  data: any[] = [];
  constructor(private afs: AngularFirestore, private db: AngularFirestore, private addPin: AddpinService) {
    const lat = 18.568860;
    const lng = 73.919550;
    const hash = geofire.geohashForLocation([lat, lng]);
    this.afs.collection("locations").add({location:hash})
    const center = [18.568860, 73.919550] as any;
    const radiusInM = 1* 1000;
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    for (const b of bounds) {
      this.afs.collection("locations", ref => {
        let query = ref as any;
        query = query.orderBy('location')
          .startAt(b[0])
          .endAt(b[1]).limit(5);
        return query;
      }).valueChanges().subscribe(res => {
        console.log("res",res);
      })
    }
  }
  title = 'map';
  map: Map | undefined;
  ngOnInit(): void {

    this.addPin.get().subscribe((res) => {
      // debugger
      res.forEach(() => {
        console.log(res);
        this.data.push(res) 
      })
    })
    this.map = new Map({
      view: new View({
        center: [72.8777, 19.0760],
        zoom: 3,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }

}
