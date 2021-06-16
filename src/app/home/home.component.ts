import { Component, OnDestroy, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  isAuthenticated: boolean = false;

  constructor(public oktaAuth: OktaAuthService) 
  {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated
      }
    );
  }

  //--------------------------------------------------------------------------
  async ngOnInit()
  {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();                        
  }
}
