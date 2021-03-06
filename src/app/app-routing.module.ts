import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SignupComponent } from './users/signup/signup.component';
// import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
// import { RequestresetComponent } from './users/requestreset/requestreset.component';
// import { UserSettingsComponent } from './users/settings/user-settings.component';
import { HomeComponent } from './home/home.component';
// import { ClassComponent } from './classes/class/class.component';
// import { MaterialsResolver } from './resolvers/materials-resolver.service';
// import { ClassesResolver } from './resolvers/classes-resolver.service';
// import { UsersResolver } from './resolvers/users-resolver';
// import { UserResolver } from './resolvers/user-resolver';
// import { CoursesResolver } from './resolvers/courses-resolver.service';
// import { ClassResolver } from './resolvers/class-resolver.service';
// import { AuthGuard } from './services/auth-guard.service';
// import { UserAuthGuard } from './services/user-auth-guard.service';
// import { ResetComponent } from './users/reset/reset.component';
// import { DiscussionSettingsResolver } from './resolvers/discussion-settings-resolver';
// import { ClassCourseResolver } from './resolvers/class-course-resolver.service';
// import { EnrollmentsResolver } from './resolvers/enrollments-resolver.service';
// import { AssignmentsResolver } from './resolvers/assignments-resolver.service';
// import { NotesSettingsResolver } from './resolvers/notes-settings-resolver';
// import { MessagesResolver } from './resolvers/messages-resolver';
// import { AllDiscussionSettingsResolver } from './resolvers/alldiscussion-settings-resolver';
// import { PermissionComponent } from './users/permission.component';
// import { SuspendedComponent } from './users/suspended/suspended.component';
// import { ContactComponent } from './welcome/contact/contact.component';
// import { AllMaterialsResolver } from './resolvers/all-materials-resolver.service';
// import { RegisterComponent } from './users/register/register.component';
// import { UserSettingsGuard } from './users/settings/user-settings-edit-guard.service';
// import { AnnouncementsResolver } from './resolvers/announcements-resolver.service';
// import { AllAnnouncementsResolver } from './resolvers/allannouncements.resolver';
// import { ValidatorComponent } from './users/validate/validator.component';


const ROUTES: Routes = [


// { path: 'signup', pathMatch: 'full', component: SignupComponent,
// resolve: { user: UserResolver, users: UsersResolver} },
// { path: 'login', pathMatch: 'full', component: LoginComponent },
// { path: 'requestreset', pathMatch: 'full', component: RequestresetComponent },

// This is a component-less parent route that only has one child (so far)
// but this allows me to resolve the class data before loading the child (section)
// In other words - I'm structuring it this way so that I can control the sequence of the resolvers

// { path: 'classes/:id',  canActivate: [ AuthGuard ], resolve: { allDSObjects: AllDiscussionSettingsResolver,
//     thisClass: ClassResolver, users: UsersResolver, assignments: AssignmentsResolver,
//     enrollments: EnrollmentsResolver, allMaterials: AllMaterialsResolver, courses: CoursesResolver, messages: MessagesResolver,
//     discussionSettings: DiscussionSettingsResolver },
//   children: [ {
//       path: ':id2', pathMatch: 'full', component: ClassComponent,
// resolve: { allAnnouncements: AllAnnouncementsResolver, announcements: AnnouncementsResolver,
//     thisCourse: ClassCourseResolver, classMaterials: MaterialsResolver,
//     discussionSettings: DiscussionSettingsResolver,
//     notesSettings: NotesSettingsResolver, messages: MessagesResolver  } }]
// },
// { path: 'classes', component: HomeComponent, canActivate: [ AuthGuard ],
//      resolve: {
//      users: UsersResolver,
//      classes: ClassesResolver,
//      courses: CoursesResolver,
//      enrollments: EnrollmentsResolver,
//      assignments: AssignmentsResolver,
//     //  messages: MessagesResolver
// } },

// { path: 'usersettings/:id/edit', pathMatch: 'full', component: UserSettingsComponent,
//  canActivate: [ AuthGuard, UserAuthGuard ], canDeactivate: [ UserSettingsGuard ], resolve: { users: UsersResolver} },
// { path: 'reset/:key', component: ResetComponent },
// { path: 'permission', component: PermissionComponent },
// { path: 'suspended', component: SuspendedComponent },

// { path: 'contact', component: ContactComponent },
// { path: 'register/:id', component: RegisterComponent, canActivate: [AuthGuard ],
//   resolve: { requestedClass: ClassResolver,
//              enrollments: EnrollmentsResolver,
//              assignments: AssignmentsResolver }},
// { path: 'validator/:vcode', pathMatch: 'full', component: ValidatorComponent },
{ path: '', pathMatch: 'full', component: WelcomeComponent, resolve: {
    users: UsersResolver,
    courses: CoursesResolver,
    classes: ClassesResolver
}},
];


@NgModule ({
    imports: [RouterModule.forRoot(ROUTES, { useHash: false })],
    exports: [RouterModule]
})

export class AppRoutingModule {



 }


