import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
   // moduleId: module.id,
    selector: 'alert-comp',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit {
    message: any;

    constructor(private alertService: AlertService){ }

    ngOnInit(): void {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
