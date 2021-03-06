import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[][] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService): void {  }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
    console.log('in d-formcomp init');
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
