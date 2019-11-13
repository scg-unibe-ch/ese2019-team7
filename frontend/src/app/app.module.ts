import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PasswordValidatorDirective } from './passwordValidator.directive';
import { EmailValidatorDirective } from './emailValidator.directive';
import { ProtectedComponent } from './protected/protected.component';
import { OfferCreationFormComponent } from './offer-creation-form/offer-creation-form.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import {OfferItemComponent} from './offer-item/offer-item.component';
import {AdminListComponent} from './admin-list/admin-list.component';

import {MatDatepickerModule} from '@angular/material';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatInputModule, MatFormFieldModule} from '@angular/material';
import {OwnListComponent} from './own-list/own-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'protected', component: ProtectedComponent },
  { path: 'createOffer', component: OfferCreationFormComponent },
  { path: 'offers', component: OfferListComponent},
  { path: 'myOffers', component: OwnListComponent},
  { path: 'adminOffers', component: AdminListComponent},
  { path: '', redirectTo: '/offers', pathMatch: 'full'}
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProtectedComponent,
    PasswordValidatorDirective,
    EmailValidatorDirective,
    OfferCreationFormComponent,
    OfferListComponent,
    OfferItemComponent,
    AdminListComponent,
    OwnListComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
