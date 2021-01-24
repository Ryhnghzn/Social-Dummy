import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-friends-details",
  templateUrl: "./friends-details.page.html",
  styleUrls: ["./friends-details.page.scss"],
})
export class FriendsDetailsPage implements OnInit {
  id_user: string;

  user_phone: string;
  user_name: string;

  user_location: any;

  user_email: string;
  user_gender: string;

  user_picture: string;
  user_register_date: string;
  user_dob: string;

  post_items: any;

  more_info: number = 0;
  constructor(
    public route: ActivatedRoute,
    public httpclient: HttpClient,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.special) {
        let data = JSON.parse(params.special);
        this.id_user = data.id_user;
        console.log(" user _id : " + this.id_user);
      }
    });

    this.getUserDetails();
  }

  moreInfoClicked() {
    if (this.more_info == 1) {
      this.more_info = 0;
    } else {
      this.more_info = 1;
    }
  }

  async getUserDetails() {
    let data;
    let loading = await this.loadingCtrl.create({
      spinner: "crescent",
      message: "Load user details..",
    });
    try {
      loading.present();
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        "app-id": "600d82066f7ee6d234b1b709",
      });
      data = this.httpclient.get(
        "https://dummyapi.io/data/api/user/" + this.id_user,
        { headers }
      );
      data.subscribe(
        (result) => {
          console.log(result);
          this.user_name = result.firstName + " " + result.lastName;
          this.user_phone = result.phone;
          this.user_location = result.location;
          this.user_email = result.email;
          this.user_gender = result.gender;
          this.user_register_date = result.registerDate;
          this.user_picture = result.picture;
          this.user_dob = result.dateOfBirth;
          this.getUserPost();
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

  async getUserPost() {
    let data;
    let loading = await this.loadingCtrl.create({
      spinner: "crescent",
      message: "Load user posts..",
    });
    try {
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        "app-id": "600d82066f7ee6d234b1b709",
      });
      data = this.httpclient.get(
        "https://dummyapi.io/data/api/user/" +
          this.id_user +
          "/post?limit=10" +
          this.id_user,
        { headers }
      );
      data.subscribe(
        (result) => {
          console.log(result);
          this.post_items = result.data;
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
}
