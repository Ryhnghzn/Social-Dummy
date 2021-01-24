import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  id_post : string;


  post_image : string;
  post_tag : any;
  post_publishDate : string;
  post_desc : string;
  post_link : string;
  post_likes : number;


  post_owner_name : string;
  post_owner_picture : string;
  post_owner_id : string;


  post_comments_items : any;


  constructor(public route : ActivatedRoute, public httpclient : HttpClient,
    public loadingCtrl : LoadingController, public router : Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        let data = JSON.parse(params.special);
        this.id_post = data.id_post
        console.log(" user _post : " + this.id_post)
      }
    });

    this.getPostDetails();
  }

  async getPostDetails(){
    let data;
    let loading = await this.loadingCtrl.create({
      spinner: "crescent",
      message: "Load post details..",
    });
    try {
      loading.present();
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        "app-id": "600d82066f7ee6d234b1b709",
      });
      data = this.httpclient.get(
        "https://dummyapi.io/data/api/post/" + this.id_post,
        { headers }
      );
      data.subscribe(
        (result) => {
          console.log(result);
          this.post_image = result.image;
          this.post_publishDate = result.publishDate;
          this.post_desc = result.text;
          this.post_link = result.link;
          this.post_likes = result.likes;
          this.post_tag = result.tags;

          this.post_owner_name = result.owner.firstName + " " + result.owner.lastName;
          this.post_owner_id = result.owner.id;
          this.post_owner_picture = result.owner.picture;
          this.getPostComment();
          loading.dismiss();
        },
        (err) => {
          console.log(err);
          loading.dismiss();
        }
      );
    } catch {
      loading.dismiss();
    }
  }

  getPostComment(){
 
    let data;
    try {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'app-id': '600d82066f7ee6d234b1b709'
      });
      data = this.httpclient.get("https://dummyapi.io/data/api/post/" + this.id_post+"/comment",{headers})
      data.subscribe(result => {
        console.log(result);
        this.post_comments_items = result.data;
      }, err => {
        console.log(err);

      })

    }
    catch{

    
  }

  }

  ownerClicked(){
    let params = {
      id_user : this.post_owner_id
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(params)
      }
    };
    this.router.navigate(['friends-details'], navigationExtras);
  }

}
