import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class UserResolver implements Resolve <User[]> {

    constructor( private userService: UserService, private router: Router ) { }


    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<User> | Promise<any> | any {
        return this.userService.getUser(route.paramMap.get('id'));
      }

    // resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <User[]> {

    //     const id = route.params['id'];
    //     // console.log('In the Users resolver.');
    //     if (id) {
    //     return this.userService.getUser(id).
    //     map(user => { if (user) { return user; }
    //     console.log(`user was not found:`);
    //     this.router.navigate(['/welcome']);
    //     return null; })
    // .catch(error => {
    //     console.log(`Retrieval error: ${error}`);
    //     this.router.navigate(['/welcome']);
    //     return Observable.of(null);
    // }); } else {
    //     return null;
    // }
    // }
}
