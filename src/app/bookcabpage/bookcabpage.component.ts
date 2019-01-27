import { Component, OnInit } from '@angular/core';
import { CabserviceService } from '../cabservice.service';
import { Cab } from '../cab-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookcabpage',
  templateUrl: './bookcabpage.component.html',
  styleUrls: ['./bookcabpage.component.css']
})
export class BookcabpageComponent implements OnInit {

  name: string;
  empid: string;
  mapid: string;
  address: string;
  time: string;
  bookid: string;
  dispUpdate: boolean = false;
  header: string = "Book Cab";
  queryString: string;
  travelDate = new Date();
  minDate = new Date();
  cabForm: FormGroup;
  submitted=false;
  user = { 'mapid': '', 'empid': '', 'name': '' };
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private cabService: CabserviceService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    //this.cabService.getUser.subscribe(user => this.user = user)
    // this.name = this.user.name;
    // this.empid = this.user.empid;
    // this.mapid = this.user.mapid;
    console.log(this.minDate.toLocaleDateString());
    console.log(this.minDate.toDateString());
    this.name = sessionStorage.getItem('name');
    this.empid = sessionStorage.getItem('empid');
    this.mapid = sessionStorage.getItem('mapid');
    if (!this.mapid) {
      this.router.navigate(['/login']);
    }
    this.route.queryParams.subscribe(params => {
      if (params['bookid']) {
        this.bookid = params['bookid'];
        this.address = params['address'];
        console.log(params['date']);
        this.travelDate = new Date(params['date']);
        this.time = params['time'];
        this.header = "Edit Cab";
        this.dispUpdate = true;
      }
      else {
        this.address = '';
        this.travelDate = new Date();
        this.time = '0';
        this.header = "Book Cab";
        this.dispUpdate = false;
      }
    });
  }
  
  //get f() { return this.cabForm.controls; }

  UpdateCab() {
    let Updates = {
      bookid: this.bookid,
      address: this.address,
      time: this.time,
      date: this.travelDate.toLocaleDateString()
    };
    if (confirm("Are you sure you want to update the booking?")) {
      this.cabService.updateCabDetails(Updates).subscribe(
        (response) => {
          console.log("Success: " + response);
          this.router.navigate(['/bookhome', { outlets: { navbar: 'bookhistory' } }]);
        },
        (error) => {
          console.log(error);
          alert("Something went wrong");
        }
      );
    }
  }
  BookCab() {
    const cabDtls: Cab = {
      name: this.name,
      empid: this.empid,
      mapid: this.mapid,
      address: this.address,
      time: this.time,
      date: this.travelDate.toLocaleDateString()
    }
    console.log(cabDtls);

    this.cabService.bookCab(cabDtls).subscribe(
      (response) => {
        console.log("Success: " + response);
        alert("Succesfuly booked the cab");
      },
      (error) => {
        console.log(error);
        alert("Sorry, cab booking failed");
      }
    );

  }



}
