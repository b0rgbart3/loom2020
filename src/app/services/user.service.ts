import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Globals } from '../globals2';
import { Reset } from '../models/reset.model';
import * as io from 'socket.io-client';

/*   Methods in this Service
-------------------------------------
getUsers

-------------------------------------
*/

@Injectable()
export class UserService {
  currentUser: User;
  subscribeduser: User;
  private highestID;
  private userCount = 0;
  users: User[];
  errorMessage: string;
  usersLoaded: boolean;
  public token: string;
  public username;
  public color: string;
  private basePath;
  resetUrl;
  private avatarsUrl;
  private classregistrationsUrl;
  private instructorsUrl;
  private studentsUrl;
  private avatarImageUrl;
  userSettingsUrl;
  // private socket: SocketIOClient.Socket;
  redirectMsg: string;
  redirectUrl: string;

  constructor(private http: HttpClient, private globals: Globals) {
    const thisUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = thisUser && thisUser.token;
    this.username = thisUser && thisUser.username;
    this.basePath = globals.basepath;
    this.userSettingsUrl = this.basePath + 'api/usersettings';
    this.avatarsUrl = this.basePath + 'api/avatars';
    this.classregistrationsUrl = this.basePath + 'api/classregistrations';
    this.instructorsUrl = this.basePath + 'api/instructors';
    this.studentsUrl = this.basePath + 'api/students';
    this.resetUrl = this.basePath + 'api/reset';
    this.avatarImageUrl = this.globals.avatars;
    // this.socket = io(this.globals.basepath);
    this.usersLoaded = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }


  getUsers(): Observable<User[]> {
    // console.log ('In user service, gettingUsers');
    return this.http.get<User[]>(this.globals.users);

  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.globals.user + `${id}`);
  }

  isloggedin(): boolean {
    console.log('Looking for logged in user');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser != null) {
      console.log('found a user in current storage:', this.currentUser);
      return true;
    } else { console.log('no logged in user.'); return false; }
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  login(loginObject): Observable<User> {

    console.log('About to login: ');
    return this.http.post<User>(this.globals.authenticate, loginObject, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  isAdmin(): boolean {
    if (this.currentUser && this.currentUser.admin) {
      return true;
    }
  }


  resetPassword(resetObject: Reset): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    return this.http.put(this.resetUrl, resetObject, { headers: myHeaders });

  }


  getUserFromMemoryById(queryID: string): User {

    // console.log('In getUserFromMemory: user: ' + queryID);

    let foundUser = null;
    if (this.users) {
      foundUser = this.users.find((user: User): boolean => user.id === queryID);
    } else {
      //  console.log('No users in memory.');
    }
    //  console.log('done filtering for user.');

    if (foundUser) {
      // console.log('found user: ' + JSON.stringify(foundUser));
    } else {
      //  console.log('USERS: ' + JSON.stringify(this.users));
    }
    return foundUser;
  }


  validateUser(code): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.basePath + '/api/users?verificationID=' + code, { headers: myHeaders }).do((verifiedUser) => {
      const validatedUser = verifiedUser[0];
      return validatedUser;
    });
  }


  updateUser(userObject: User): Observable<any> {
    // console.log('Made it to the updateUser method.');
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    const body = JSON.stringify(userObject);
    return this.http.put(this.globals.users + '?id=' + userObject.id, userObject, { headers: myHeaders });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.globals.users + '?id=' + userId);
  }

  getAllInstructors(): Observable<User[]> {
    return this.http.get<User[]>(this.globals.users + '?instructor=true');
  }

  unsuspendUser(user: User): void {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    user.suspended = false;

    this.updateUser(user).subscribe(
      (data: any) => console.log('unsuspended user'), (err: any) => console.log('error suspending user.'));
  }

  suspendUser(user: User): void {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    user.suspended = true;

    this.updateUser(user).subscribe(
      (data: any) => console.log('suspended user'), (err: any) => console.log('error suspending user.'));
  }


  toggleInstructorStatus( user: User): void {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    user.instructor = !user.instructor;
    this.updateUser(user).subscribe( data => {}, error => {
      console.log('error making instructor');
    });
  }
  // this.logout();
  // const myHeaders = new HttpHeaders();
  // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  // myHeaders.append('Access-Control-Allow-Origin',  this.globals.basepath   );
  // myHeaders.append('Access-Control-Allow-Methods', 'GET,PUT,POST,UPDATE,DELETE,OPTIONS');
  // myHeaders.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // console.log('With info: ' + JSON.stringify( loginObject ) );

  // return this._http.post(this.globals.authenticate, loginObject, {headers: myHeaders})
  //     .do(response => {

  //            console.log('Response: ' + JSON.stringify(response));

  //             this.currentUser = <User> response;
  //             this.username = this.currentUser.username;
  //             localStorage.setItem('currentUser', JSON.stringify( this.currentUser ) );
  //             this.socket.emit('userChanged', this.currentUser);
  //            return <User> response;
  //         }).catch( error => {   console.log('ERROR: ' + JSON.stringify( error) ); return Observable.of(error); } );
}
