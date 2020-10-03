import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Globals } from '../../globals2';
import { Enrollment } from '../../models/enrollment.model';
import { ClassModel } from '../../models/class.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ClassService } from '../../services/class.service';
import { EnrollmentsService } from '../../services/enrollments.service';


@Component({
    moduleId: module.id,
    templateUrl: 'enrollment-edit.component.html',
    styleUrls: ['enrollment-edit.component.css']
})

export class EnrollmentEditComponent implements OnInit {
    enrollmentForm: FormGroup;
    enrollments: Enrollment[];
    classes: ClassModel[];
    users: User[];

    constructor(
        private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private globals: Globals, private userService: UserService, private enrollmentsService: EnrollmentsService,
        private classService: ClassService ) { }

        // The form control names match the Enrollment Data Model.  Nice!

    ngOnInit(): void {
        this.enrollments = this.activatedRoute.snapshot.data.enrollments;
        this.classes = this.activatedRoute.snapshot.data.classes;
        this.users = this.activatedRoute.snapshot.data.users;

        this.enrollments.forEach( enrollment => {
            enrollment.this_user =
            this.userService.getUserFromMemoryById('' + enrollment.userId);
            enrollment.this_class =
              this.classService.getClassFromMemory(enrollment.classId);
        });
        // for (let i = 0; i < this.enrollments.length; i++) {
        //     this.enrollments[i].this_user =
        //     this.userService.getUserFromMemoryById('' + this.enrollments[i].userId);
        //     this.enrollments[i].this_class =
        //     this.classService.getClassFromMemory(this.enrollments[i].classId);
        // }




    }


    closer(): void {
        this.router.navigate(['/home']);
    }


}
