import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {
  splash = true;

  constructor(public navCtrl : NavController) { }

  ngOnInit() {
    setTimeout(() => {
      this.splash = false;
    
     this.navCtrl.navigateRoot('/tabs')

      console.log('Splash Ended')
    }
      , 3000);
  }

}
