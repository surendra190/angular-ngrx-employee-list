import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as EmployeeActions from './employees/employee.actions';
import {
  selectFilteredEmployees,
  selectLoading,
  selectEmployeeError,
  selectSearchTerm,
  selectAllEmployees,
} from './employees/employee.selectors';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-ngrx-employee-app');
  private store = inject(Store);

  employees$ = this.store.select(selectFilteredEmployees);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectEmployeeError);
  searchTerm$ = this.store.select(selectSearchTerm);
  allEmployees$ = this.store.select(selectAllEmployees);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
  }

  onSearch(searchTerm: string): void {
    this.store.dispatch(EmployeeActions.setSearchTerm({ searchTerm }));
  }
}
