import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

export const selectAllEmployees = createSelector(selectEmployeeState, (state) => state.employees);

export const selectLoading = createSelector(selectEmployeeState, (state) => state.loading);

export const selectEmployeeError = createSelector(selectEmployeeState, (state) => state.error);

export const selectSearchTerm = createSelector(selectEmployeeState, (state) => state.searchTerm);

export const selectFilteredEmployees = createSelector(
  selectAllEmployees,
  selectSearchTerm,
  (employees, searchTerm) => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return employees;
    }

    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term) ||
        employee.company.name.toLowerCase().includes(term),
    );
  },
);

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
