import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { CFMessage } from '../../models/cfmessage.model';

@Component({
  //  moduleId: module.id,
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.css']
})



export class ContactComponent implements OnInit {

    contactForm: FormGroup;
    cfMessage: CFMessage;
    confirmation: string;

    constructor(private formBuilder: FormBuilder, private contactService: ContactService) {}
    ngOnInit(): void {
        this.confirmation = '';
        this.contactForm = this.formBuilder.group( {
            firstname: ['' ],
            lastname: ['' ],
            email: ['' ],
            phone: ['' ],
            message: [ '', ]});

    }

    sendMsg(): void {
        if (this.contactForm.dirty && this.contactForm.valid) {
            this.cfMessage = this.contactForm.value;
            console.log(this.contactForm.value);
            this.contactService.sendMsg( this.cfMessage ).subscribe(
                response => { console.log('Response == '); console.log( JSON.stringify( response) );
                              if (response) {
                    this.confirmation = 'success';
                }
            },
            );
        }
    }
}
