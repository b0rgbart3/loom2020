import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
// import { Http, Response, Headers, RequestOptions } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals2';


import { Enrollment } from '../models/enrollment.model';
import { UserService } from './user.service';
import { Assignment } from '../models/assignment.model';


@Injectable()
export class AssignmentsService {

  enrollmentCount = 0;
  highestID = 0;
  assignments: Assignment[];
  errorMessage: string;

  constructor(private http: HttpClient, private globals: Globals, private userService: UserService) { }


  getAssignmentsNow(): void {
    this.getAssignments().subscribe(
      data => this.assignments = data,
      error => this.errorMessage = error);
  }

  getAssignmentsInClass(classID): Observable<any> {
    return this.http.get<Assignment[]>(this.globals.assignments +
      '?classId=' + classID).do(data => data).catch(this.handleError);
  }

  getAllAssignments(): Observable<any> {
    return this.http.get<Assignment[]>(this.globals.assignments)
      .do(data => {
        this.assignments = data;   // STORE THE GOD DAM data in memory for fucks holy sake
        return data;

      }).catch(this.handleError);
  }
  // Return the list of instructor assignments for the current user
  getAssignments(): Observable<any> {
    return this.http.get<Enrollment[]>(this.globals.assignments +
      '?userId=' + this.userService.getCurrentUser().id)
      .do(data => {
        // console.log(' Returning data from the assignments service: ' + JSON.stringify(data));
        return data;
      }).catch(this.handleError);
  }


  postAssignment(assignment): Observable<Enrollment> {

    assignment.id = this.getNextId();
    // console.log('New id =' + classObject.id);
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    // if (!this.assignments) { this.assignments = []; }
    // this.assignments.push(assignment);

    return this.http.put(this.globals.assignments + '?id=' + assignment.id, assignment, { headers: myHeaders }).map(
      () => assignment);

  }

  remove(assignmentId): Observable<any> {

    console.log('In the service, calling delete: ' + assignmentId);
    const urlstring = this.globals.assignments + '?id=' + assignmentId;
    console.log('urlstring: ' + urlstring);
    return this.http.delete(urlstring);
  }

  getNextId(): string {

    this.updateIDCount();
    return this.highestID.toString();

  }


  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log('ERROR:');
    console.log(JSON.stringify(error));
    return Observable.of(error.message);

  }

  updateIDCount(): void {
    // Loop through all the Materials to find the highest ID#
    if (this.assignments && this.assignments.length > 0) {

      this.assignments.forEach( assignment => {
        const foundID = Number(assignment.assignmentId);
        // console.log('Found ID: ' + foundID);
        if (foundID >= this.highestID) {
          const newHigh = foundID + 1;
          this.highestID = newHigh;
          // console.log('newHigh == ' + newHigh);
        }
      });

    } else {
      console.log('The ASSIGNMETS SERVICE HAS NO ASSINGMENTS!');
      this.highestID = 1;
    }
  }




}




