import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Http, Response, Headers, RequestOptions } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Globals } from '../globals2';

// import { Enrollment } from '../models/enrollment.model';
import { UserService } from './user.service';
// import { Assignment } from '../models/assignment.model';
import { CFMessage } from '../models/cfmessage.model';


@Injectable()
export class ContactService {

  errorMessage: string;
  highestID: string;
  contactFormMessages: CFMessage[];

  constructor(private http: HttpClient, private globals: Globals, private userService: UserService) { }


  sendMsg(msgObject): Observable<any> {

    console.log('Contact service sending message: ' + JSON.stringify(msgObject));
    msgObject.id = this.getHighestID();

    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    const url = this.globals.sendCFMsg;
    const putString = url + '?id=' + msgObject.id;

    return this.http.put(putString, msgObject, { headers: myHeaders }).map(
      () => msgObject);
  }

  getHighestID(): string {

    this.updateIDCount();
    return this.highestID.toString();

  }
  updateIDCount(): void {
    // Loop through all the CFMessages to find the highest ID#
    if (this.contactFormMessages && this.contactFormMessages.length > 0) {

      this.contactFormMessages.forEach(message => {
        const foundID = Number(message.id);
        // console.log('Found ID: ' + foundID);
        if (foundID >= +this.highestID) {
          const newHigh = foundID + 1;
          this.highestID = newHigh + '';
          // console.log('newHigh == ' + newHigh);
          } else { this.highestID = '1'; }
      });
    }
  }
}
