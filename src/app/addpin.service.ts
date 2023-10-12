import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export default class AddpinService {
  getPinLocations() {
    throw new Error('Method not implemented.');
  }

  constructor(private Http :HttpClient,private firestore: AngularFirestore) { }
  addPinLocation(pinLocation: any) {
    return this.firestore.collection('maps').add(pinLocation);
  }
  getCollection(): Observable<any[]> {
    return this.firestore.collection('maps').valueChanges();
  }

  get(): Observable<any[]> {
    return this.firestore.collection('locations').valueChanges();
  }
}
