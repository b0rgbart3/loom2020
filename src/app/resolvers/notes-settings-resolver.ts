import { Component, OnInit, Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { ClassService } from '../services/class.service';
import { UserService } from '../services/user.service';
import { NotesSettings } from '../models/notessettings.model';
import { NotesService } from '../services/notes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()

export class NotesSettingsResolver implements Resolve <NotesSettings> {

    constructor(
        private notesService: NotesService,
        private classService: ClassService, private router: Router,
        private userService: UserService ) { }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable <NotesSettings> {
        const classId = route.params.id;
        const userId = this.userService.getCurrentUser().id;
        const section = route.params.id2 + '';
   //     console.log('In the notes settings resolver - class: ' + classId +
   //         ', section: ' + section + ', user: ' + userId);

        return this.notesService.getNotesSettings(userId, classId, section).
        map(nsObject => { if (nsObject) {
         //   console.log('found existing ns object.');
        return nsObject; } else {
            const newNSObject = new NotesSettings( userId, classId, section, true, []);
            console.log('did not find ns object, so creating one:' + JSON.stringify(newNSObject));

        // const returnableArray = [];
        // returnableArray.push(newDSObject);
       // console.log('returning: ' + JSON.stringify(returnableArray));
            return newNSObject;
            }
         })
    .catch( error => {
        console.log(`DS Retrieval error: ${error}`);
        return Observable.of(null);
    });
    }


}
