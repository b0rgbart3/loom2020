import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';
import { AssignmentsService } from '../services/assignments.service';
import { Assignment } from '../models/assignment.model';


@Injectable()
export class AssignmentsResolver implements Resolve <Assignment[]> {

    assignments: Assignment[];
    constructor(
        private router: Router, private assignmentsService: AssignmentsService,
        private classService: ClassService, private userService: UserService ) { }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <Assignment[]> {
        this.assignments = null;
        // console.log('Aassignments RESOLVER');
        return this.assignmentsService.getAssignments().map( data => {
         // console.log('got data back from the API for enrollments: ' + JSON.stringify(data));
         this.assignments = data;
         if (this.assignments) {
        //     console.log('found instructor objects');
         this.assignments.map( assignment => { assignment.thisUser = this.userService.getUserFromMemoryById(assignment.userId); } );
         this.assignments.map( assignment => { assignment.thisClass = this.classService.getClassFromMemory(assignment.classId); } );
         } else {
            // console.log('nothing in the assignments variable.');
         }
         return this.assignments; })
    .catch(error => {
        // this.router.navigate(['/welcome']);
        return Observable.of(null);
    });
    }


}
