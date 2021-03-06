import { Component, Output, OnInit, Input } from '@angular/core';
import { RouterModule, Routes, NavigationExtras, Router, NavigationEnd } from '@angular/router';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {


  users: User[];
  errorMessage: string;
  dataConnection: boolean;

  constructor( private userService: UserService, private router: Router ) {

  }

  ngOnInit(): void {
      this.errorMessage = null;
      this.dataConnection = false;

      // Scroll to the top of the page when a user navigates around
    //   this.router.events.subscribe((evt) => {
    //     if (!(evt instanceof NavigationEnd)) {
    //         return;
    //     }
    //     window.scrollTo(0, 0);
    // });

      this.userService
      .getUsers().subscribe(
        (users: User[] ) =>  {
          if (typeof users === 'string') {
            // If this is the case, then we ACTUALLY got an error.
            console.log(users);
            this.dataConnection = false;
          } else {
          this.users = users; if (this.users && this.users.length > 1) { this.dataConnection = true; }
    //  console.log('What I got back from the User Service: ' + JSON.stringify(this.users));
          }
      },
        (err: any) => this.errorMessage = err,
        () => console.log('Got all users.')
      );



  }


}

