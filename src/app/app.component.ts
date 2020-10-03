import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Loom2020';
  users: User[];
  errorMessage: string;
  dataConnection: boolean;

  constructor(private userService: UserService, private router: Router) {
    console.log('In constructor');
  }

  ngOnInit(): void {
    this.errorMessage = null;
    this.dataConnection = false;
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log('Users: ', data);
      },
      (err: any) => console.log(err),
      () => console.log('Got Users.')

    );

  }



}