import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CourseService } from '../services/course.service';
import { ClassService } from '../services/class.service';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
import { ClassModel } from '../models/class.model';

@Injectable()
export class ClassesResolver implements Resolve<ClassModel> {

    constructor(private courseService: CourseService, private classService: ClassService) { }


    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<ClassModel>|Promise<any>|any {
        return this.classService.getClasses();
      }


    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClassModel> {

    //     return this.classService.getClasses().
    //         map(classes => {

    //             if (classes) {

    //                 return classes;
    //             }

    //             return null;
    //         })
    //         .catch(error => {

    //             return Observable.of(null);
    //         });
    // }
}
