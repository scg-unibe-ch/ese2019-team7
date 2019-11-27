import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PasswordValidatorDirective } from './passwordValidator.directive';
import { EmailValidatorDirective } from './emailValidator.directive';
import { OfferCreationFormComponent } from './offer-creation-form/offer-creation-form.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { OwnListComponent } from './own-list/own-list.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';

import {MatDatepickerModule, MatFormFieldModule} from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createOffer', component: OfferCreationFormComponent },
  { path: 'offers', component: OfferListComponent},
  { path: 'myOffers', component: OwnListComponent},
  { path: 'adminOffers', component: AdminListComponent},
  { path: 'navigation', component: NavigationBarComponent},
  { path: 'changeUserData', component: ChangeUserDataComponent},
  { path: '', redirectTo: '/offers', pathMatch: 'full'}
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordValidatorDirective,
    EmailValidatorDirective,
    OfferCreationFormComponent,
    OfferListComponent,
    OfferItemComponent,
    AdminListComponent,
    OwnListComponent,
    NavigationBarComponent,
    ChangeUserDataComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    MatFormFieldModule,
  ],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
