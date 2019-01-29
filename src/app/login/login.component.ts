import { Component, OnInit } from '@angular/core';
import { CabserviceService } from '../cabservice.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fetchData: any;
  usrid: string;
  pwd: string;
  constructor(
    private cabService: CabserviceService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    this.usrid = form.value.usr;
    this.pwd = form.value.pwd;
    this.onValidateUser(this.usrid, this.pwd);
  }

  onValidateUser(usr, pwd) {
    this.cabService.validateUser(usr, pwd).subscribe(
      (validatedData: any[]) => {
        this.fetchData = validatedData
        if (this.fetchData.isValid) {
          sessionStorage.setItem('mapid', this.fetchData.mapid);
          sessionStorage.setItem('empid', this.fetchData.empid);
          sessionStorage.setItem('name', this.fetchData.name);
          if(this.fetchData.empid=="admin"){
            sessionStorage.setItem('isAdmin', 'true');
            this.router.navigate(['/bookhome', { outlets: { navbar: 'bookhistory' } }]);
          }
          else{
            sessionStorage.setItem('isAdmin', '');
            this.router.navigate(['/bookhome', { outlets: { navbar: 'bookcab' } }]);
          }
          // this.router.navigate(['/bookhome'], { queryParams: {mapid:this.fetchData.mapid, name: this.fetchData.name,empid:this.fetchData.empid } });
          //this.router.navigate(['/bookhome']);
          // this.router.navigate(['/bookhome', { outlets: { navbar: 'bookcab' } }]);
        }
        else {
          alert("Invalid Employee id or Password");
        }
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
  }

}
