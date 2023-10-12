import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LayersComponent } from './layers/layers.component';
import { NewmapComponent } from './newmap/newmap.component';
import { DemoComponent } from './demo/demo.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'; // Import the MatDialogModu
import {MyDialogComponent} from '././my-dialog/my-dialog.component'
import { ViewMapComponent } from './view-map/view-map.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from './environment/environment';
import { LogitudeDirective } from './logitude.directive';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayersComponent,
    NewmapComponent,
    DemoComponent,
    MyDialogComponent,
    ViewMapComponent,
    LogitudeDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    // AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    AngularFirestoreModule,
    // AngularFireDatabaseModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
