import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/RX';
import { query } from '@angular/core/src/render3/query';
import { strictEqual } from 'assert';
import { stringify } from '@angular/compiler/src/util';

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

  constructor(private http: Http, private httpClient: HttpClient) { }

  validateUser(id, pwd): any {
    return this.http.get("http://localhost:3000/validateuser/" + id + "/" + pwd)
      .map(
        (response: Response) => response.json()
      )
  }

  addUser(User) {
    return this.http.post("http://localhost:3000/adduser", User);
  }

  bookCab(cabDtls) {
    return this.http.post("http://localhost:3000/bookcab", cabDtls);
  }

  getEmpCabHistory(mapid) {
    return this.http.get("http://localhost:3000/cabhistory/" + mapid)
      .map(
        (response: Response) => response.json()
      )
  }

  getAllCabHistory() {
    return this.http.get("http://localhost:3000/cabhistory")
      .map(
        (response: Response) => response.json()
      )
  }

  updateCabDetails(Updates) {
    let bodyObj = {
      date: Updates.date,
      address: Updates.address,
      time: Updates.time
    };
    return this.http.put("http://localhost:3000/cabhistory/" + Updates.bookid, bodyObj);
  }

  deleteCab(cabid) {
    return this.http.delete("http://localhost:3000/cabhistory/" + cabid);
  }
}
