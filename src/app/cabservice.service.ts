import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/RX';

@Injectable({
  providedIn: 'root'
})
export class CabserviceService {

  //user={'mapid':'','empid':'','name':''};

  private messageSource = new BehaviorSubject({ 'mapid': '', 'empid': '', 'name': '' });
  getUser = this.messageSource.asObservable();

  setUser(user) {
    this.messageSource.next(user);
  }

  constructor(private httpc: Http, private http: HttpClient) { }

  validateUser(id, pwd): any {
    // return this.http.get("http://localhost:3000/validateuser/" + id + "/" + pwd)
    return this.http.get("validateuser/" + id + "/" + pwd)
      // .map(
      //   (response: Response) => response.json()
      // )
      .pipe(map(
        (response: Response) => response.json()
      ))
  }

  addUser(User) {
    // return this.http.post("http://localhost:3000/adduser", User);
    return this.http.post("adduser", User);
  }

  bookCab(cabDtls) {
    // return this.http.post("http://localhost:3000/bookcab", cabDtls);
    console.log("success");
    return this.http.post("bookcab", cabDtls);
  }

  getEmpCabHistory(mapid) {
    // return this.http.get("http://localhost:3000/cabhistory/" + mapid)
    return this.http.get("cabhistory/" + mapid)
      .pipe(map(
        (response: Response) => response.json()
      ))
  }

  getAllCabHistory() {
    // return this.http.get("http://localhost:3000/cabhistory")
    return this.http.get("cabhistory")
      .pipe(map(
        (response: Response) => response.json()
      ))
  }

  updateCabDetails(Updates) {
    let bodyObj = {
      date: Updates.date,
      address: Updates.address,
      time: Updates.time
    };
    // return this.http.put("http://localhost:3000/cabhistory/" + Updates.bookid, bodyObj);
    return this.http.put("cabhistory/" + Updates.bookid, bodyObj);
  }

  deleteCab(cabid) {
    // return this.http.delete("http://localhost:3000/cabhistory/" + cabid);
    return this.http.delete("cabhistory/" + cabid);
  }
}
