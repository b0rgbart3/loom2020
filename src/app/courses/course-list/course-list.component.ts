import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers: [CourseService]
})

export class CourseListComponent implements OnInit {

  courses: Course[];
  selectedCourse: {};
  errorMessage: string;
  currentUser: User;
  admin: boolean;

  constructor(
    private courseService: CourseService, private userService: UserService,
    private myRouter: Router) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser && this.currentUser.admin) { this.admin = true; }

    this.courseService
      .getCourses().subscribe(
        courses => {
          this.courses = courses;
          console.log('got courses');
        },
        error => this.errorMessage = error);

    console.log('end of init');
  }

  private getIndexOfCourse = (courseId: string) => {
    return this.courses.findIndex((course) => {
      return course._id === courseId;
    });
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
  }

  createNewCourse(): void {
    this.myRouter.navigate(['/course/id:0']);
  }

  deleteCourse = (courseId: string) => {
    const idx = this.getIndexOfCourse(courseId);
    if (idx !== -1) {
      this.courses.splice(idx, 1);
      this.selectCourse(null);
    }
    return this.courses;
  }

  addCourse = (course: Course) => {
    this.courses.push(course);
    this.selectCourse(course);
    return this.courses;
  }

  updateCourse = (course: Course) => {
    const idx = this.getIndexOfCourse(course._id);
    if (idx !== -1) {
      this.courses[idx] = course;
      this.selectCourse(course);
    }
    return this.courses;
  }
}
