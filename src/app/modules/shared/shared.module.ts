import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  exports: [MenuComponent, AvatarComponent, CardComponent],
  declarations: [MenuComponent, AvatarComponent, CardComponent],
  imports: [
    IonicModule.forRoot(),
    RouterModule,
    CommonModule
  ]
})
export class SharedModule { }
