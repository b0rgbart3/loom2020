import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { ClassService } from '../services/class.service';
import { Observable } from 'rxjs';
import { ClassModel } from '../models/class.model';
import { MaterialService } from '../services/material.service';
import { Material } from '../models/material.model';
import { MaterialCollection } from '../models/materialcollection.model';

/*
 *
 *  This resolver loads in all the materials for a given course
 *  as a nested array of material objects - organized by section #
 */

@Injectable()
export class MaterialsResolver implements Resolve <any> {

    thisClass: ClassModel;
    thisCourseID: string;
    thisCourse: Course;
    allMaterials: Material[];
    materialIDs: string[][];
    theseMaterials: Material[][];
    materialCollections: MaterialCollection[];
    routeData: any[];

    constructor( private courseService: CourseService,
                 private classService: ClassService, private router: Router,
                 private materialService: MaterialService,
                 private activatedRoute: ActivatedRoute ) { }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<Material> | Promise<any> | any {
      return this.materialService.getMaterials();
    }

  }
//     resolve( route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot ): Observable <any> {

//         this.allMaterials = route.parent.data.allMaterials;
//        // Get ALL the friggin materials -- from the parent resolver

//        this.thisCourseID = route.parent.data.thisClass.course;
//      //  console.log('This CourseID: ' + JSON.stringify(this.thisCourseID));
//        this.thisCourse = this.courseService.getCourseFromMemory(this.thisCourseID);

//      // console.log('This COURSE: ' + JSON.stringify(this.thisCourse));
//     //  console.log('---------------');


//       // OK - we have the Class, we have the Course -- we have ALL the materials.
//       // NOW can we fucking get something done??

//       this.materialIDs = this.thisCourse.sections.map( section => section.materials );

//      // console.log('Material IDS: ' + JSON.stringify(this.materialIDs));
//       // Before I can sort the materials -- I have to collect the ACTUAL material objects -- not just the IDS.

//       this.theseMaterials = this.materialIDs.map( list => this.materialService.getBatchMaterialsFromMemory(list));

// //      this.materialCollections = this.theseMaterials.map( group => this.materialService.sortMaterials(group));

//         return Observable.of(this.theseMaterials);



//   }

