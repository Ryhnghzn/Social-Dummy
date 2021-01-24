import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children :[
      {
        path :'tab1', loadChildren : '../home/home.module#HomePageModule'
      },

      // {
      //   path :'tab2', loadChildren : '../menu-user-leads/menu-user-leads.module#MenuUserLeadsPageModule'
      // },
      {
        path :'tab2', loadChildren : '../friends/friends.module#FriendsPageModule'
      },
      {
        path :'tab3', loadChildren : '../about/about.module#AboutPageModule'
      },

      {
        path : '',
        redirectTo :'/tabs/tab1',
        pathMatch : 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
