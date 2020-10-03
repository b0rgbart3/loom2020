import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class UsersResolver implements Resolve <User[]> {

    constructor( private userService: UserService, private router: Router ) { }


    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<User> | Promise<any> | any {
        return this.userService.getUsers();
      }


    // resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <User[]> {

    //    // console.log('In the Users resolver.');

    //     return this.userService.getUsers().
    //     map(data => { if (data) { return data; }
    //     console.log(`users were not found:`);
    //     return null; })
    // .catch(error => {
    //     console.log(`Retrieval error: ${error}`);
    //     return Observable.of(null);
    // });
    // }
}
