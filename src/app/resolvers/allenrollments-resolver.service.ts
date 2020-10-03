import { Component, OnInit, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { EnrollmentsService } from '../services/enrollments.service';
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';


@Injectable()
// get the enrollments that the currentUser is a student in

export class AllEnrollmentsResolver implements Resolve<Enrollment[]> {

    enrollments: Enrollment[];
    constructor(
        private router: Router, private enrollmentsService: EnrollmentsService,
        private classService: ClassService, private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Enrollment[]> {

        // console.log('IN STUDENT ENROLLMENTS RESOLVER');
        return this.enrollmentsService.getAllEnrollments().map(data => {
            this.enrollments = data;
            // console.log('got data back from the API for enrollments: ' + JSON.stringify(data));
            this.enrollments.map(enrollment => { enrollment.thisUser = this.userService.getUserFromMemoryById(enrollment.userId); });
            this.enrollments.map(enrollment => { enrollment.thisClass = this.classService.getClassFromMemory(enrollment.classId); });
            return this.enrollments;
        })
            .catch(error => {
                // this.router.navigate(['/welcome']);
                return Observable.of(null);
            });
    }


}
