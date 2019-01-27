import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CabserviceService } from '../cabservice.service';

@Component({
  selector: 'app-bookinghome',
  templateUrl: './bookinghome.component.html',
  styleUrls: ['./bookinghome.component.css']
})
export class BookinghomeComponent implements OnInit {

  mapid: string = '';
  empid: string = '';
  name: string = '';
  user = { 'mapid': '', 'empid': '', 'name': '' };
  constructor(private router: Router,private route: ActivatedRoute, private cabService: CabserviceService) { }

  ngOnInit() {
    this.mapid=sessionStorage.getItem('mapid');
    if(!this.mapid){
      this.router.navigate(['/login']);
    }
    // this.route.queryParams.subscribe(params => {
    //   if (params['mapid']) {
    //     // this.name = params['name'];
    //     // this.empid = params['empid'];
    //     // this.mapid = params['mapid'];
    //     // this.cabService.setUser({ 'mapid': this.mapid, 'empid': this.empid, 'name': this.name });
    //     // sessionStorage.setItem('mapid',this.mapid);
    //     // sessionStorage.setItem('empid',this.empid);
    //     // sessionStorage.setItem('name',this.name);
    //   }
    // });
  }

}
