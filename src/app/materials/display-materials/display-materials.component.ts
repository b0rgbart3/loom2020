import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../../globals2';


@Component({
   // moduleId: module.id,
    selector: 'comp-display-materials',
    templateUrl: 'display-materials.component.html',
    styleUrls: ['display-materials.component.css']
})

export class DisplayMaterialsComponent implements OnInit {
   // @Input() materials: Material[];
    @Input() materialSets;

    displayModal: boolean;
    modalURL: string;
    // materialSets: MaterialSet[];


    constructor( private globals: Globals) {    }

    ngOnInit(): void {

      this.displayModal = false;
      this.modalURL = '';
   //   this.materialSets = [];


    }



}
