import { Component, OnInit } from '@angular/core';
import { CabserviceService } from '../cabservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historypage',
  templateUrl: './historypage.component.html',
  styleUrls: ['./historypage.component.css']
})
export class HistorypageComponent implements OnInit {

  address: string;
  time: string;
  date: string;
  mapid: string;
  user: any;
  fetchData: any[];
  today = new Date();
  isAdmin: string = '';
  bkdt: any;

  constructor(private cabService: CabserviceService, private router: Router) { }

  ngOnInit() {
    // this.cabService.getUser.subscribe(user => this.user = user)
    // this.mapid = this.user.mapid;
    this.mapid = sessionStorage.getItem('mapid');
    this.isAdmin = sessionStorage.getItem('isAdmin');
    if (!this.mapid) {
      this.router.navigate(['/login']);
    }

    if (!this.isAdmin) {
      this.GetBookingHistory(this.mapid);
    }
    else {
      this.GetAllHistory();
    }

  }
  toDisplay(bookdate) {
    this.bkdt = new Date(bookdate);
    if ((this.today).getTime() - 86400000 > (this.bkdt).getTime()) {
      return false
    }
    else {
      return true;
    }

  }

  GetAllHistory() {
    this.cabService.getAllCabHistory().subscribe(
      (historyData: any[]) => {
        console.log(historyData);
        this.fetchData = historyData;
      },
      (error) => console.log(error)
    );
  }

  GetBookingHistory(mapid) {
    this.cabService.getEmpCabHistory(mapid).subscribe(
      (historyData: any[]) => {
        console.log(historyData);
        this.fetchData = historyData;
      },
      (error) => console.log(error)
    );
  }

  EditCab(bookid, address, date, time) {
    this.router.navigate(['/bookhome', { outlets: { navbar: 'bookcab' } }], { queryParams: { bookid: bookid, address: address, date: date, time: time } });
  }
  DeleteCab(bookid) {

    if (confirm("Are you sure you want to delete the booking?")) {
      this.cabService.deleteCab(bookid).subscribe(
        (response) => {
          console.log("Success: " + response);
          this.GetBookingHistory(this.mapid);
        },
        (error) => {
          console.log(error);
          alert("Something went wrong");
        }
      );
    }

  }
}
