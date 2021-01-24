import { Routes, Router, NavigationExtras } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  post_items : any;
  post_tags_items : any;

  is_tags : number = 0;
  tags_string : string;
  constructor(public httpclient : HttpClient, 
    public toastController : ToastController,
    public router : Router) {



    this.getData();

  
  }

  getData(){
    
  let data;
    try {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'app-id': '600d82066f7ee6d234b1b709'
      });
      data = this.httpclient.get('https://dummyapi.io/data/api/post?limit=10',{headers})
      data.subscribe(result => {
        console.log(result);
        this.post_items = result.data;
        this.getDataTags();
      }, err => {
        console.log(err);

      })

    }
    catch{

    
  }

  }

  getDataTags(){
    let data;
    try {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'app-id': '600d82066f7ee6d234b1b709'
      });
      data = this.httpclient.get('https://dummyapi.io/data/api/tag?limit=10',{headers})
      data.subscribe(result => {
        console.log(result);
        this.post_tags_items = result.data;
      }, err => {
        console.log(err);

      })

    }
    catch{

    
  }
  }

  async getDatapostFromTags(pti){
    this.post_items = null;
    this.tags_string = pti;
    this.is_tags = 1;
    let data;
    let toast = await this.toastController.create({
      message : "Showing post with " + pti + " tags.",
      duration : 1000,
      color : "secondary"
    });
    toast.present();

    try {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'app-id': '600d82066f7ee6d234b1b709'
      });
      data = this.httpclient.get('https://dummyapi.io/data/api/tag/'+pti+'/post?limit=10',{headers})
      data.subscribe(result => {
        console.log(result);
        this.post_items = result.data;
      }, err => {
        console.log(err);

      })

    }
    catch{

    
  }
  }

  clearTags(){
    this.post_items = null;
    this.getData();
    this.is_tags = 0;
  }

  postClicked(id){
    console.log("id : " + id)
    let params = {
      id_post : id
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(params)
      }
    };
    this.router.navigate(['post-details'], navigationExtras);
  }


  ownerClicked(id){
    let params = {
      id_user : id
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(params)
      }
    };
    this.router.navigate(['friends-details'], navigationExtras);
  }





}
