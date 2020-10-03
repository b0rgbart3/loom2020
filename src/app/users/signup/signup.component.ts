import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import {
  NgForm, FormControl, FormBuilder,
  FormGroup, FormArray, Validators, AbstractControl, ValidatorFn
} from '@angular/forms';

import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
// import { FlashMessagesService } from 'angular2-flash-messages';
import { BoardSettings } from '../../models/boardsettings.model';
import { Globals } from '../../globals2';
import { LoomNotificationsService } from '../../services/loom.notifications.service';
import { LoomNotification } from '../../models/loom.notification.model';

// These are my custom validation methods for the signup form
function uniqueUsername(users: User[]): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {

    if (c.value !== undefined) {
      const foundValue = users.find(obj => obj.username === c.value);
      console.log('Found Value: ' + JSON.stringify(foundValue));

      if (foundValue) {
        return { usernameExists: true };
      }

      return null;
    }
  };
}

function uniqueEmail(users: User[]): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {



    if (c.value !== undefined) {
      const foundValue = users.find(obj => obj.email === c.value);
      console.log('Found Value: ' + JSON.stringify(foundValue));

      if (foundValue) {
        return { emailExists: true };
      }

      return null;
    }
  };
}

@Component({
  // moduleId: module.id,
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})

export class SignupComponent implements OnInit {

  startDate = new Date();
  hasPrimaryLanguageError = false;
  date2 = new Date();
  errorMessage: string;
  users;
  user: User;
  currentUser: User;
  admin: boolean;
  editSelf: boolean;
  makeTeacher: boolean;
  isInstructor: boolean;
  checkBox: FormControl;
  regFormGroup: FormGroup;
  regChoice = '';
  boardSettings: BoardSettings;
  initParams;
  fbloginStatus;
  connectedThruFB: boolean;
  alreadyConnectedThruFB: boolean;
  FBProfile: any;
  newFBUser: User;
  FBUser: any;
  success: boolean;
  emailMessage: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
   //  private flashMessagesService: FlashMessagesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private globals: Globals,
    private myNotes: LoomNotificationsService) {
  }

  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
  };


  ngOnInit(): void {

    this.success = false;
    this.connectedThruFB = false;
    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.user = this.activatedRoute.snapshot.data.user[0];
    }
    this.users = this.activatedRoute.snapshot.data.users;

    if (this.user && this.user.instructor) {
      this.isInstructor = true;
    }

    this.admin = false;
    this.editSelf = false;
    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser && this.currentUser.admin) {
      this.admin = true;
    }

    if (!this.user) {
      this.boardSettings = new BoardSettings('', '', '');
      this.user = {} as User;
    }
    this.regFormGroup = this.formBuilder.group({
      firstname: [this.user.firstname, [Validators.required, Validators.maxLength(20),]],
      lastname: [this.user.lastname, [Validators.required, Validators.maxLength(40)]],
      email: [this.user.email, [Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
      uniqueEmail(this.users)]],
      username: [this.user.username, [Validators.required, uniqueUsername(this.users)]],
      password: [this.user.password, [Validators.required,
      Validators.pattern('^(?=.*?[0-9]).{6,}$')]],
      instructor: this.user.instructor,
      admin: this.user.admin
    });

    const emailControl = this.regFormGroup.get('email');
    emailControl.valueChanges.subscribe(value =>
      this.setMessage(emailControl));
  }

  setMessage(c: AbstractControl): void {

    if (this.regFormGroup.get('email').touched && this.regFormGroup.get('email').dirty) {
      this.emailMessage = '';
      if (this.regFormGroup.get('email').errors) {

        if (this.regFormGroup.get('email').errors.required) {
          this.emailMessage = 'Please include an email address.';
        }
        if (this.regFormGroup.get('email').errors.pattern) {
          this.emailMessage = 'Please include a valid email address.';
        }
      }
    }
  }

  revealForm(): void {
    this.regChoice = 'direct';
  }

  already(): void {
    this.router.navigate(['/login']);
  }

  getLoginStatus(): void {

  }

  cancel(): void {
    this.router.navigate(['/welcome']);
  }

  signupUser(): void {
    console.log('About to signup user');
    if (this.regFormGroup.dirty && this.regFormGroup.valid) {
      console.log('Form is valid.');
      // This is Deborah Korata's way of merging our data model with the form model
      const combinedObject = Object.assign({}, this.user, this.regFormGroup.value);

      if (this.user.id === '0' || this.user.id === undefined) {

        console.log('About to create a new user');
      } else {
        console.log(this.regFormGroup.get('password').valid);
      }
    }
  }
}
        // this.userService.createUser( combinedObject ).subscribe(
        //   (val) => { console.log('POST call successful value returned in body ', val);
        //   // if (val) {
        //   //   this.flashMessagesService.show(JSON.stringify(val),
        //   //   { cssClass: 'alert-error', timeout: 18000 });
        //   //   console.log('Received a return value of: ' + val);
        //   // } else {
        //   //   this.success = true;
        //   //   this.flashMessagesService.show('Thank you for signing up with the Reclaiming Loom.' +
        //   // ' Now, please check your email, and use the verification code to verify your account. Thank you.',
        //   //   { cssClass: 'alert-success', timeout: 18000 });
        //   // }
        //   this.myNotes.add(new LoomNotification('success', ['Welcome to the ReclaimingLoom, ' +
        //   this.regFormGroup.get('username').value + '!',
        //   'Now you can login using the credentials you just created.'], 10000));
        //     // this.router.navigate(['/welcome']);
        //    },
        //   response => {console.log('POST call in error', response); },
        //   () => {

        //   console.log('The POST observable is now completed.');

        //        this.router.navigate(['/login']);
        //      });
        // } else {
        //   this.userService
        //   .updateUser( combinedObject ).subscribe(
        //   (val) => {
        //     console.log('POST call successful value returned in body ', val);
        //   },
        //   response => {
        //     console.log('POST call in error', response);
        //   },
        //   () => {
        //     console.log('The POST observable is now completed.');

        //     if (this.userService.isAdmin() ) {
        //       this.router.navigate(['/admin']);
        //     } else {
        //       this.alertService.success('Your account info has been updated.', true);

        //       this.router.navigate(['/welcome']);
        //       }
        //     }
        //   );
        // }
