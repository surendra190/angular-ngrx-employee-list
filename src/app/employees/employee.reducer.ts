import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';
import { Employee } from './employee.model';

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

export const initialEmployeeState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  searchTerm: '',
};

export const employeeReducer = createReducer(
  initialEmployeeState,

  on(EmployeeActions.loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
    error: null,
  })),

  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(EmployeeActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
);
