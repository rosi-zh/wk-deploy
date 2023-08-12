import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WineAllComponent } from './wine-all/wine-all.component';
import { WineAddComponent } from './wine-add/wine-add.component';
import { WineDetailsComponent } from './wine-details/wine-details.component';
import { WineEditComponent } from './wine-edit/wine-edit.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { WineByOwnerComponent } from './wine-by-owner/wine-by-owner.component';

const routes: Routes = [
  {
    path: 'wines',
    component: WineAllComponent
  },
  {
    path: 'wines/add',
    canActivate: [AuthGuard],
    component: WineAddComponent
  },
  {
    path: 'wines/:wineId',
    component: WineDetailsComponent
  },
  {
    path: 'wines/edit/:wineId',
    canActivate: [AuthGuard],
    component: WineEditComponent
  },
  {
    path: 'wines/my/:userId',
    canActivate: [AuthGuard],
    component: WineByOwnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WineRoutingModule { }
