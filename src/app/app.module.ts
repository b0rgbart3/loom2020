import { AppComponent } from './app.component';
import { HomeComponent } from '../app/home/home.component';
// import { NavBarComponent } from '../app/navbar/nav-bar.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
// import { AdminFeatureModule } from './admin-feature-module/admin-feature.module';
import { DragulaModule } from 'ng2-dragula/dist';
import { NavBarComponent } from './navbar/nav-bar.component';

import { AuthGuard } from './services/auth-guard.service';
import { ClassService } from '../app/services/class.service';
import { CourseService } from '../app/services/course.service';
import { Globals } from '../app/globals2';
import { UserService } from '../app/services/user.service';

import { ClassResolver } from './resolvers/class-resolver.service';
import { ClassesResolver } from './resolvers/classes-resolver.service';
import { CourseResolver } from './resolvers/course-resolver.service';
import { CoursesResolver } from './resolvers/courses-resolver.service';
import { MaterialsResolver } from './resolvers/materials-resolver.service';
import { UserResolver } from './resolvers/user-resolver';
import { UsersResolver } from './resolvers/users-resolver';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
  //  MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DragulaModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    ClassService,
    CourseService,
    Globals,
    UserService,
    ClassResolver,
    ClassesResolver,
    CourseResolver,
    CoursesResolver,
    MaterialsResolver,
    UserResolver,
    UsersResolver
 ],
 exports: [
 ],
 schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  bootstrap: [AppComponent]
})
export class AppModule { }
