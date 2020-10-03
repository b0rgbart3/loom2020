import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MaterialService } from '../services/material.service';

@Injectable()
export class AllMaterialsResolver implements Resolve <any[]> {

    constructor( private materialService: MaterialService, private router: Router ) { }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <any[]> {

        return this.materialService.getMaterials().map(materials => { if (materials) { return materials; }
                                                                      console.log(`Materials were not found`);
                                                                      this.router.navigate(['/welcome']);
                                                                      return null; })
    .catch(error => {
        console.log(`Retrieval error: ${error}`);
        this.router.navigate(['/welcome']);
        return Observable.of(null);
    });
    }
}
