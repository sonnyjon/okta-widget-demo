import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorRelayService } from './service/error-relay.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { CallbackComponent } from './callback/callback.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import myOktaConfig from './config/my-okta-config';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth:any, injector:any) => {
    const router = injector.get(Router);
    // Redirect the user to our custom login page
    router.navigate(['/login']); 
  }
}, myOktaConfig.oidc);

const routes: Routes = [
  {path: 'login/callback', component: CallbackComponent},
  {
    path:'profile', 
    component: ProfileComponent, 
    canActivate: [OktaAuthGuard]
  },
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    CallbackComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    OktaAuthModule
  ],
  providers: [
    {provide: OKTA_CONFIG, useValue: oktaConfig},
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true    
    },
    ErrorRelayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
