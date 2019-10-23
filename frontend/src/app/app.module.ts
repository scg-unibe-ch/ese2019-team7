import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {PasswordValidatorDirective} from './passwordValidator.directive';
import {EmailValidatorDirective} from './emailValidator.directive';
import {TelValidatorDirective} from './telValidator.directive';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',      component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordValidatorDirective,
    EmailValidatorDirective,
    TelValidatorDirective
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
