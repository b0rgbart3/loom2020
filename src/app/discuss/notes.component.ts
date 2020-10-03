import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ClassService } from '../services/class.service';
import { ClassModel } from '../models/class.model';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Thread } from '../models/thread.model';
import { DiscussionService } from '../services/discussion.service';
import { Section } from '../models/section.model';
import { NotesService } from '../services/notes.service';
import { DiscussionSettings } from '../models/discussionsettings.model';
import { NotesSettings } from '../models/notessettings.model';


@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [ClassService]
})

export class NotesComponent implements OnInit {

  reading: boolean;

  @Input() settings: NotesSettings;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private classService: ClassService,
    private userService: UserService,
    private fb: FormBuilder,
    private ds: DiscussionService,
    private notesService: NotesService,
 ) {}

  ngOnInit(): void {
    console.log('In notes component: ');
  }

  openNotes(): void {
    this.settings.reading = true;
    console.log('saving after opening.');
    this.saveNotesSettings();
  }

  closeNotes(): void {
    this.settings.reading = false;
    this.saveNotesSettings();
  }

  saveNotesSettings(): void {

    this.notesService.storeNotesSettings(this.settings).subscribe(
    data => console.log('done storing notes settings.'), error => {
        console.log('ERROR trying to store the settings!');
        console.log(error); } );

}

}
