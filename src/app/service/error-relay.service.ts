import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorRelayService 
{
  private oktaError: Error = new Error();  
  errorChanged = new Subject<Error>();

  constructor() {}

  //--------------------------------------------------------------------------
  getError()
  {
    return this.oktaError;
  }
  //--------------------------------------------------------------------------
  setError(error: Error)
  {
    this.oktaError = error;
    this.errorChanged.next(error);
  }
}
