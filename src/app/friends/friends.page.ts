import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  user_items : any;

  constructor(public httpclient : HttpClient, public router : Router) { }

  ngOnInit() {
    this.getData();
  }

  
  getData(){
    
    let data;
      try {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'app-id': '600d52464d15a3c8061551ca'
        });
        data = this.httpclient.get('https://dummyapi.io/data/api/user?limit=10',{headers})
        data.subscribe(result => {
          console.log(result);
          this.user_items = result.data;
        }, err => {
          console.log(err);
  
        })
  
      }
      catch{
  
      
    }
  
    }

    
  friendsClicked(id){
    console.log("id : " + id)
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
