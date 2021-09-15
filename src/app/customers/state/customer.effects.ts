// import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { Customer } from '../customers.model';
import { CustomerService } from '../customer.service';
import * as customerActions from './customer.action';

@Injectable(
    {providedIn: 'root'}
    )

export class CustomerEffect {
    constructor(
        private actions$: Actions,
        private customerService: CustomerService
    ) { }

    @Effect()
    // effect dispersed by LoadCustomers Action
    loadCustomers$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.LoadCustomers>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMERS
        ),
        // mergemap to use customer service to get the values from customer array
        mergeMap((action: customerActions.LoadCustomers) =>
            // code to dispatch the LoadCustomerSuccess action
            this.customerService.getCustomers().pipe(
                map((customers: Customer[]) =>
                new customerActions.LoadCustomersSuccess(customers)
                ),
                // code to dispatch the LoadCustomerFail action
                catchError(err => of(new customerActions.LoadCustomersFail(err)))
            ),
        )
    );

    @Effect()
    // effect dispersed by LoadCustomers Action
    loadCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.LoadCustomer>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMER
        ),
        // mergemap to use customer service to get the values from customer array
        mergeMap((action: customerActions.LoadCustomer) =>
            // code to dispatch the LoadCustomerSuccess action
            this.customerService.getCustomerById(action.payload).pipe(
                map((customer: Customer) =>
                new customerActions.LoadCustomerSuccess(customer)
                ),
                // code to dispatch the LoadCustomerFail action
                catchError(err => of(new customerActions.LoadCustomerFail(err)))
            ),
        )
    );

    @Effect()
    // effect dispersed by CreateCustomers Action
    createCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.CreateCustomer>(
            customerActions.CustomerActionTypes.CREATE_CUSTOMER
        ),
        map((action: customerActions.CreateCustomer) => action.payload),
        // mergemap to use customer service to get the values from customer array
        mergeMap((customer: Customer) =>
            // code to dispatch the CreateCustomerSuccess action
            this.customerService.createCustomer(customer).pipe(
                map((newCustomer: Customer) =>
                new customerActions.CreateCustomerSuccess(newCustomer)
                ),
                // code to dispatch the CreateCustomerFail action
                catchError(err => of(new customerActions.CreateCustomerFail(err)))
            ),
        )
    );

    @Effect()
    // effect dispersed by UpdateCustomers Action
    updateCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.UpdateCustomer>(
            customerActions.CustomerActionTypes.UPDATE_CUSTOMER
        ),
        map((action: customerActions.UpdateCustomer) => action.payload),
        // mergemap to use customer service to get the values from customer array
        mergeMap((customer: Customer) =>
            // code to dispatch the UpdateCustomerSuccess action
            this.customerService.updateCustomer(customer).pipe(
                map((updateCustomer: Customer) =>
                new customerActions.UpdateCustomerSuccess({
                    id: updateCustomer.id,
                    changes: updateCustomer
                })
                ),
                // code to dispatch the UpdateCustomerFail action
                catchError(err => of(new customerActions.UpdateCustomerFail(err)))
            ),
        )
    );
    @Effect()
    // effect dispersed by DeleteCustomers Action
    deleteCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.DeleteCustomer>(
            customerActions.CustomerActionTypes.DELETE_CUSTOMER
        ),
        map((action: customerActions.DeleteCustomer) => action.payload),
        // mergemap to use customer service to get the values from customer array
        mergeMap((id: number) =>
            // code to dispatch the DeleteCustomerSuccess action
            this.customerService.deleteCustomer(id).pipe(
                map(() => new customerActions.DeleteCustomerSuccess(id)
                ),
                // code to dispatch the DeleteCustomerFail action
                catchError(err => of(new customerActions.DeleteCustomerFail(err)))
            ),
        )
    );
}
