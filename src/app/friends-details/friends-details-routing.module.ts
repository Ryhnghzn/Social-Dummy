import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendsDetailsPage } from './friends-details.page';

const routes: Routes = [
  {
    path: '',
    component: FriendsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsDetailsPageRoutingModule {}
