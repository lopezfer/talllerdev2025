import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CiudadPageRoutingModule } from './ciudad-routing.module';

import { CiudadPage } from './ciudad.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CiudadPageRoutingModule
  ],
  declarations: [CiudadPage]
})
export class CiudadPageModule {}
