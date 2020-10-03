import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialCollection } from '../../models/materialcollection.model';
import { Globals } from '../../globals2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    // moduleId: module.id,
    selector: 'modal-comp',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css']
})

export class ModalComponent implements OnInit {
    @Input() modalURL: string;
    @Output() closeMe = new EventEmitter<boolean>();
    safeURL: any;

    constructor( private globals: Globals, private domSanitizer: DomSanitizer) {    }
 
    // 'https://docs.google.com/gview?url=' +

    ngOnInit(): void {
        const fullURL = this.modalURL;
        this.modalURL = this.domSanitizer.bypassSecurityTrustResourceUrl(fullURL) as string;
    }

    close(): void {
        console.log('emitting a closeMe truth.');
        this.closeMe.emit(true);
    }

}
