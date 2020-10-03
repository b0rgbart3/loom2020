import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../../globals2';
import { RouterLinkWithHref } from '@angular/router';
import { Material } from '../../models/material.model';
import { MaterialSet } from '../../models/materialset.model';

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


    constructor( private globals: Globals): void {    }

    ngOnInit(): void {

      this.displayModal = false;
      this.modalURL = '';
   //   this.materialSets = [];


    }



}
