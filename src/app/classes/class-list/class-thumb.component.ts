import { Component, OnInit, Input } from '@angular/core';
import { ClassModel } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { User } from '../../models/user.model';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { Globals } from '../../globals2';
import { AssignmentsService } from '../../services/assignments.service';
import { Assignment } from '../../models/assignment.model';
import { UserService } from '../../services/user.service';
import { Userthumbnail } from '../../models/userthumbnail.model';
import { Router } from '@angular/router';

@Component({
  selector: 'class-thumb',
  templateUrl: './class-thumb.component.html',
  styleUrls: ['./class-thumb.component.css'],
  providers: [ClassService]
})

export class ClassThumbComponent implements OnInit {

@Input() classObject: ClassModel;
@Input() showTeachers: boolean;
@Input() showRegButtons: boolean;
public classImageURL: string;
public courseID: string;
public course: Course;
public courseimageURL: string;
public errorMessage: string;
description: string;
assignments: Assignment[];
instructors: User[];
instructorThumbnails: Userthumbnail[];
showingBio: boolean;
bioChosen: User;

  constructor(
     private classService: ClassService, private courseService: CourseService,
     private globals: Globals, private assignmentsService: AssignmentsService,
     private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.showingBio = false;
    this.bioChosen = null;
    this.courseID = this.classObject.course;
    this.assignmentsService.getAssignmentsInClass(this.classObject.id).subscribe(
      assignments => { this.assignments = assignments;
                       this.instructors = [];

                       this.assignments.forEach(assignment => {
                          this.instructors.push(this.userService.getUserFromMemoryById(assignment.userId) );
                       } );


                       if (this.instructors.length > 0) {
                           this.instructorThumbnails = this.instructors.map(
                             instructor => this.createInstructorThumbnail(instructor) );
        }
      }
    );
    this.courseService.getCourse(this.courseID).subscribe(
      course =>  {this.course = course[0];
                  if (this.course && this.course.image) {
      this.courseimageURL = this.globals.courseimages + '/' + this.courseID + '/' + this.course.image; }
      // console.log('this.courseimageURL: ' + this.courseimageURL);
                  if (this.course && this.course.description) {
        this.description = this.course.description; }
      },
          error => this.errorMessage = error );

  }
  register(): void {
    const gotoURL = '/register/' + this.classObject.id;
    this.userService.redirectMsg = 'To register for a class on the Reclaiming Loom' +
    ' you first need to log in to your account, or sign up to create your account.';
    this.router.navigate( [gotoURL] );
  }

  showBio(user): void {
    if (!this.showingBio) {
    this.bioChosen = user;
    this.showingBio = true; }
}
closeBio(event): void {
    this.showingBio = false;
}
  createInstructorThumbnail(user): Userthumbnail {
  //  console.log('Making thumbnail for user: ' + JSON.stringify(user));
    if (user) {
    const thumbnailObj = { user, userId: user.id, online: false,
        size: 80,  showUsername: true, showInfo: false, textColor: '#ffffff', border: false, shape: 'circle' };
    return thumbnailObj;
    }
    return null;
}

}
