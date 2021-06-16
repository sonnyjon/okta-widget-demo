import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { ErrorRelayService } from '../service/error-relay.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit 
{
  isAuthenticated: boolean = false;

  constructor(public oktaAuth: OktaAuthService,
              public router: Router,
              private relayService: ErrorRelayService) 
  {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated
      },
      error => {
        this.relayService.setError(error);
      }
    );
  }

  //--------------------------------------------------------------------------
  async ngOnInit()
  {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();                        
  }
  //--------------------------------------------------------------------------
  login()
  {
    // Navigating to this URL should cause Okta to redirect to
    // widget and then back to profile page.
    this.router.navigateByUrl('/profile');
  }
  //--------------------------------------------------------------------------
  logout()
  {
    // Clear out storage.
    sessionStorage.clear();
    localStorage.clear();

    // Terminates the session with Okta and removes current tokens.
    this.oktaAuth.signOut();
  }

}
