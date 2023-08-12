import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WineAllComponent } from './wine-all/wine-all.component';
import { WineRoutingModule } from './wine-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WineAddComponent } from './wine-add/wine-add.component';
import { FormsModule } from '@angular/forms';
import { WineDetailsComponent } from './wine-details/wine-details.component';
import { WineEditComponent } from './wine-edit/wine-edit.component';
import { WineDeleteComponent } from './wine-delete/wine-delete.component';
import { WineByOwnerComponent } from './wine-by-owner/wine-by-owner.component';


@NgModule({
  declarations: [
    WineAllComponent,
    WineAddComponent,
    WineDetailsComponent,
    WineEditComponent,
    WineDeleteComponent,
    WineByOwnerComponent,
  ],
  imports: [
    CommonModule,
    WineRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    WineAllComponent
  ]
})
export class WineModule { }
