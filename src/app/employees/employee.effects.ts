import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as EmployeeActions from './employee.actions';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  private employeeService = inject(EmployeeService);

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),

      switchMap(() =>
        this.employeeService.getEmployees().pipe(
          map((employees) => EmployeeActions.loadEmployeesSuccess({ employees })),

          catchError((error: unknown) => {
            const message =
              error instanceof Error
                ? error.message
                : 'Unable to load employees. Please try again.';

            return of(
              EmployeeActions.loadEmployeesFailure({
                error: message,
              }),
            );
          }),
        ),
      ),
    ),
  );
}
