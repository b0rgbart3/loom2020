import { Component, OnInit } from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';
import { LoomNotificationsService } from '../services/loom.notifications.service';
import { LoomNotification } from '../models/loom.notification.model';

@Component({
    selector: 'notifications-comp',
    styleUrls: ['./loom.notifications.component.css'],
    template: `
    <div class="notifications" *ngFor='let note of myNotes'>
        <div (click)="hide(note)" class="{{ note.type }}" [@noteState]="state"
        (@noteState.done)='handleDone(note)'>
            <p *ngFor='let line of note.message'>{{ line }}</p>
        </div>
    </div>
    `,
    animations: [
        trigger('noteState', [
            state('first', style({
                transform: 'scale(1)',
                opacity: 1
            })),
            state('inactive', style({
                transform: 'scale(1)',
                opacity: 0
            })),
            state('active', style({
                transform: 'scale(1.2)',
                opacity: 1
            })),
            transition('first => active', animate('300ms ease-out')),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('300ms ease-out'))
        ])
    ]
})
export class LoomNotificationsComponent implements OnInit {
    public myNotes: LoomNotification[];
    public state = 'first';
    constructor(private notifications: LoomNotificationsService) {
        this.myNotes = new Array<LoomNotification>();
        notifications.noteAdded.subscribe(note => {
            this.myNotes.push(note);
            this.state = 'first';
            setTimeout(() => { this.state = 'active'; }, 10);

            setTimeout(() => {
                // this.hide.bind(this)(note); }, 3000);
                this.state = 'inactive';
            }, note.delay);
        });
    }
    ngOnInit(): void {
    }

    hide(note): void {
        const index = this.myNotes.indexOf(note);
        if (index >= 0) {
            this.myNotes.splice(index, 1);
        }
    }
    handleDone(note): void {
        // this.hide.bind(this)(note);
        //  console.log('animation done' + JSON.stringify(note));
        // this.hide(note);
        if (this.state === 'inactive') {
            this.hide(note);
        }
    }
}
