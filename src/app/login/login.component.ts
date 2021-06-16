import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import myOktaConfig from '../config/my-okta-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  oktaSignIn: any;

  constructor(public oktaAuth: OktaAuthService, private router: Router) 
  {
    this.oktaSignIn = new OktaSignIn({
      el: '#okta-signin-container',
      features: {
        registration: false
      },
      baseUrl: myOktaConfig.oidc.oktaBaseUrl,
      clientId: myOktaConfig.oidc.clientId,
      redirectUri: myOktaConfig.oidc.redirectUri,
      authParams: {
        issuer: myOktaConfig.oidc.issuer,
        scopes: myOktaConfig.oidc.scopes,
        pkce: true
      },
    });

    this.oktaSignIn.remove();
  }

  //--------------------------------------------------------------------------
  ngOnInit(): void 
  {
    this.oktaSignIn.showSignInAndRedirect()
                    .catch((err: any) => {throw(err)});

    this.showOktaConfig();
  }
  //==========================================================================
  private showOktaConfig()
  {
    console.log("OKTA CONFIG:")
    console.log(`baseUrl: ${myOktaConfig.oidc.oktaBaseUrl}`);
    console.log(`clientId: ${myOktaConfig.oidc.clientId}`);
    console.log(`redirectUri: ${myOktaConfig.oidc.redirectUri}`);
    console.log(`issuer: ${myOktaConfig.oidc.issuer}`);
    console.log(`scopes: ${myOktaConfig.oidc.scopes}`);
  }

}
