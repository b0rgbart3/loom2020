import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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


    constructor(private http: HttpClient, private globals: Globals): void {
    }
    getCourses(): Observable<Course[]> {
      return this.http.get<Course[]>(this.globals.courses);
    }

    getCourse(id): Observable<Course> {
      return this.http.get<Course>(this.globals.course + `${id}`);
    }


    deleteCourse(courseId: string): Observable<any> {
      return this.http.delete( this.globals.courses + '?id=' + courseId);
  }

}




