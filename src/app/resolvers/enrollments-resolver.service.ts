import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { EnrollmentsService } from '../services/enrollments.service';
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';


@Injectable()
// get the enrollments that the currentUser is a student in

export class EnrollmentsResolver implements Resolve<Enrollment[]> {

    enrollments: Enrollment[];
    constructor(
        private router: Router,
        private enrollmentsService: EnrollmentsService,
        private classService: ClassService,
        private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Enrollment[]> {

        //         console.log('IN STUDENT ENROLLMENTS RESOLVER');
        return this.enrollmentsService.getEnrollments().map(data => {
            this.enrollments = data;
            // console.log('got data back from the API for current users student enrollments: ' + JSON.stringify(data));
            if (this.enrollments) {
                this.enrollments.map(enrollment => {
                    //   console.log('User id: ' + enrollment.userId );
                    enrollment.thisUser = this.userService.getUserFromMemoryById(enrollment.userId);
                    if (enrollment.thisUser) {
                        // console.log('found user: ' + JSON.stringify(enrollment.this_user));
                    }
                });
                this.enrollments.map(enrollment => { enrollment.thisClass = this.classService.getClassFromMemory(enrollment.classId); });
                //    console.log('Done mapping user objects.');
            }
            return this.enrollments;
        })
            .catch(error => {
                this.router.navigate(['/welcome']);
                return Observable.of(null);
            });
    }


}
