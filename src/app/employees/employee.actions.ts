import { createAction, props } from '@ngrx/store';
import { Employee } from './employee.model';

export const loadEmployees = createAction('[Employee Page] Load Employees');

export const loadEmployeesSuccess = createAction(
  '[Employee API] Load Employees Success',
  props<{ employees: Employee[] }>(),
);

export const loadEmployeesFailure = createAction(
  '[Employee API] Load Employees Failure',
  props<{ error: string }>(),
);

export const setSearchTerm = createAction(
  '[Employee Page] Set Search Term',
  props<{ searchTerm: string }>(),
);
