import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsDetailsPageRoutingModule } from './friends-details-routing.module';

import { FriendsDetailsPage } from './friends-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsDetailsPageRoutingModule
  ],
  declarations: [FriendsDetailsPage]
})
export class FriendsDetailsPageModule {}
