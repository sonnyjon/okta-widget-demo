/*
 *  This component is a modified clone of the OktaCallbackComponent
 *  owned by Okta, Inc. that can be found in their GitHub repository at:
 * 
 *  https://github.com/okta/okta-angular/blob/master/src/okta/components/callback.component.ts
 */
import { Component, Injector, OnInit, Optional } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { ErrorRelayService } from '../service/error-relay.service';

@Component({
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit 
{
  oktaError: Error = new Error();

  constructor(private okta: OktaAuthService,
              private relayService: ErrorRelayService,
              @Optional() private injector?: Injector) {}

  //--------------------------------------------------------------------------
  async ngOnInit(): Promise<void> 
  {
    try 
    {
      // Parse code or tokens from the URL, store tokens in the TokenManager, 
      // and redirect back to the originalUri
      await this.okta.handleLoginRedirect();
    } 
    catch (e) 
    {
      // Callback from social IDP. Show custom login page to continue.
      if (this.okta.isInteractionRequiredError(e) && this.injector) 
      {
        const { onAuthResume, onAuthRequired } = this.okta.getOktaConfig();
        const callbackFn = onAuthResume || onAuthRequired;

        if (callbackFn) 
        {
          callbackFn(this.okta, this.injector);
          return;
        }
      }

      // Set error and relay error to subscribers.
      this.oktaError = e;
      this.relayService.setError(this.oktaError);
    }
  }
}
