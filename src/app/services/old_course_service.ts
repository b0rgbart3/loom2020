import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Course } from '../models/course.model';
import { Material } from '../models/material.model';
import { Globals } from '../globals2';


@Injectable()
export class CourseService {
  private courseCount = 0;
  private highestID = 0;
  errorMessage;
  courses: Course[];
  removedCourses: Course[];


  constructor(private http: HttpClient, private globals: Globals) {
  }


  updateIDCount(): void {
    // Loop through all the Courses to find the highest ID#
    this.courses.forEach( course =>
      {
        const foundID = Number(course.courseId);
        // console.log("Found ID: " + foundID);
        if (foundID >= this.highestID) {
          const newHigh = foundID + 1;
          this.highestID = newHigh;
          // console.log("newHigh == "+newHigh);
        }

      });

  }
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.globals.courses)
      // debug the flow of data
      .do(data => { // console.log('All: ' + JSON.stringify(data));
        this.courseCount = data.length;
        this.courses = data;
        this.updateIDCount();
        // it's important to update the IDCount based on the FULL list - so we do that BEFORE we 'remove' the removals
        this.hideRemovals();
        return this.courses;
        // console.log("Course highest ID: "+ this.highestID);
      })
      .catch(this.handleError);


  }
  hideRemovals(): void {
    // For now I'm just going to remove the class objects that are 'marked for removal'
    // from our main array -- and store them in a separate array
    this.removedCourses = [];
    if (this.courses && this.courses.length > 0) {
      for (let i = 0; i < this.courses.length; i++) {
        if (this.courses[i].removeThis) {
          this.removedCourses.push(this.courses[i]);
          this.courses.splice(i, 1);
        }
      }
    }
  }

  getCourseFromMemory(queryID): Course {

    if (this.courses) {
      // console.log('looking: ' + this.classes.length);
      this.courses.forEach(course => {
        if (course.courseId === queryID) {
          return course;
        }

      });
    }
    return null;
  }

  getCourse(id): Observable<Course> {
    return this.http.get<Course>(this.globals.courses + '?id=' + id)
      .do(data => {
        // console.log( 'found: ' + JSON.stringify(data) );
        return data;
      })
      .catch(this.handleError);
  }

  getCourseImageFromMemory(id): any {
    let courseImage = '';

    if (!this.courses) {
      this.getCourses();
      //  console.log('Courses were not yet loaded');
      return null;
    }

    this.courses.forEach( thecourse => {
      if (thecourse.id === id) {
        courseImage = thecourse.image;
      }
    });
    return courseImage;
  }

  getCourseImage(id): Observable<string> {
    return this.http.get<string>(this.globals.courses + '?id=' + id)
      .do(data => {
        //    console.log( 'found: ' + JSON.stringify(data) );
        return data;
      })
      .catch(this.handleError);
  }

  removeCourse(course: Course): Observable<any> {
    course.removeThis = true;
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    return this.http.put(this.globals.courses + '?id=' + course.id, course, { headers: myHeaders });

  }

  recoverCourse(courseObject): Observable<any> {
    courseObject.remove_this = false;
    return this.updateCourse(courseObject).do(
      data => {
        // add this course object back into our main array
        this.courses.push(data);
        // remove this course object from our list of removed courses
        for (let i = 0; i < this.removedCourses.length; i++) {
          if (this.removedCourses[i].id === data.id) {
            this.removedCourses.splice(i, 1);
          }
        }

        console.log('recovering course data');
        return data;
      })
      .catch(this.handleError);

  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(this.globals.courses + '?id=' + courseId);
  }

  private extractData(res: Response): any {
    const body = res.json();
    return body || {};
  }

  createCourse(courseObject: Course): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    // let thisID = this.courseCount + 1;

    console.log('Creating Course.');

    /* We HAVE to know what the other courses are before we build a new one (so that we can
       assign a proper ID to it. )  -- so if we haven't loaded them in yet, lets fucking do
       it again now.
    */

    if (this.courses) {
      courseObject.id = this.highestID.toString();
      const body = JSON.stringify(courseObject);
      console.log('Posting Course: ', body);
      return this.http.put(this.globals.courses + '?id=' + courseObject.id,
        courseObject, { headers: myHeaders });
    } else {
      return Observable.of(null);
    }
  }

  updateCourse(courseObject: Course): Observable<any> {

    console.log('In course Service: ' + JSON.stringify(courseObject));
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    const body = JSON.stringify(courseObject);
    // console.log( 'Posting Course: ', body   );
    return this.http.put(this.globals.courses + '?id=' + courseObject.id, courseObject, { headers: myHeaders });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    // console.log( error.message );
    return Observable.throw(error.message);

  }


}




