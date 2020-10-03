import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
    selector: 'comp-connection',
    templateUrl: 'connection.component.html',
    styleUrls: ['connection.component.css']
})

export class ConnectionComponent implements OnInit {

    users: User[];
    errorMessage: string;
    dataConnection: boolean;

    constructor( private userService: UserService ): void {

    }
    ngOnInit(): void{
        this.errorMessage = null;
        this.dataConnection = false;

        this.userService
        .getUsers().subscribe(
          users =>  {this.users = users; this.dataConnection = true; },
          error => this.errorMessage = error);
    }
}
