import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';


@Injectable()
export class CoursesResolver implements Resolve <Course> {

    constructor( private courseService: CourseService, private router: Router ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<Course> | Promise<any> | any {
        return this.courseService.getCourses();
      }


    // resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <Course> {

    // //    console.log('In the course(s) resolver.');
    //     return this.courseService.getCourses().
    //     map(courses => { if (courses) {
    //         // console.log('got courses back from the api: ' + JSON.stringify(courses));
    //         return courses; }
    //     return null; })
    // .catch(error => {
    //     console.log(`Retrieval error: ${error}`);
    //     this.router.navigate(['/welcome']);
    //     return Observable.of(null);
    // });
    // }
}
