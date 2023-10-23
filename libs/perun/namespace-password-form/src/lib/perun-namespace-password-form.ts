import { ErrorStateMatcher } from '@angular/material/core';
import { UntypedFormControl } from '@angular/forms';
import { UsersManagerService } from '@perun-web-apps/perun/openapi';
import { ApiRequestConfigurationService } from '@perun-web-apps/perun/services';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RPCError } from '@perun-web-apps/perun/models';

interface PasswordError {
  backendError: string;
}

/**
 * State matcher that shows error on inputs whenever the input is changed and invalid (by default, the error
 * is shown after leaving the input field)
 */
export class ImmediateStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null): boolean {
    return !!(control?.invalid && control?.dirty);
  }
}

export const loginAsyncValidator =
  (
    namespace: string,
    usersManager: UsersManagerService,
    apiRequestConfiguration: ApiRequestConfigurationService,
    useNon = false,
    time = 500,
  ) =>
  (input: UntypedFormControl): Observable<PasswordError | null> =>
    timer(time).pipe(
      switchMap(() => {
        apiRequestConfiguration.dontHandleErrorForNext();
        if (!namespace || namespace === 'No namespace') {
          return of(null);
        }
        return usersManager.checkPasswordStrength(
          {
            password: input.value as string,
            namespace: namespace,
          },
          useNon,
        ) as Observable<PasswordError>;
      }),
      map(() => null),
      // catch error and send it as a valid value
      catchError((err: RPCError) => {
        const pwdError: PasswordError = {
          backendError: err.message.substring(err.message.indexOf(':') + 1),
        };
        return of(pwdError);
      }),
    ) as Observable<PasswordError>;
