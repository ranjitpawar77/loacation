import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LayersComponent } from './layers/layers.component';
import { NewmapComponent } from './newmap/newmap.component';
import { DemoComponent } from './demo/demo.component';
import { ViewMapComponent } from './view-map/view-map.component';

const routes: Routes = [
  {path:'map',component:MapComponent},
  // {path:'layers',component:LayersComponent},
  // {path:'newmap',component:NewmapComponent},
  // {path:'Demo',component:DemoComponent},
  {path:'',component:ViewMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
