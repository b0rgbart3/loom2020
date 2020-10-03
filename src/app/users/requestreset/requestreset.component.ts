import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
// import { FlashMessagesService } from 'angular2-flash-messages';
import { RouterModule, Routes, NavigationExtras, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoomNotificationsService } from '../../services/loom.notifications.service';
import { LoomNotification } from '../../models/loom.notification.model';


@Component({
   // moduleId: module.id,
    templateUrl: 'requestreset.component.html',
    styleUrls: ['requestreset.component.css']
})

export class RequestresetComponent {
    model = {} as User;
    loading = false;
    error = '';
    message: string;

    constructor(
        private userService: UserService,
    //     private flashMessagesService: FlashMessagesService,
        private myRouter: Router,
        private myNotes: LoomNotificationsService
         ) { }


    sendResetRequest(): void {
        // this.userService.sendResetRequest(this.model.email).subscribe(
        //     (value) => { console.log('In sendResetRequest, got back: ' + JSON.stringify(value)); },

        // () => {
        //     console.log('Finished the sendResetRequest...');
        //     this.myNotes.add(
        //         new LoomNotification('success', ['Please check your email for a message from the loom' +
        //         '-- and then follow the link inside that email to reset your password.  Thank you..',
        //     'Please note: it may take a few minutes for the email to arrive in your inbox.'], 15000));
        //     this.myRouter.navigate(['/welcome']);
        // } );
    }
}
