import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { employeeReducer } from './employees/employee.reducer';
import { EmployeeEffects } from './employees/employee.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),

    provideStore({
      employees: employeeReducer,
    }),

    provideEffects([EmployeeEffects]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
