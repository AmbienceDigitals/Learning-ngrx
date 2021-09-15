import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as customerActions from '../state/customer.action';
import * as fromCustomer from '../state/customer.reducer';
import { Customer } from '../customers.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  error$: Observable<string>;

  constructor(private store: Store<fromCustomer.AppState>) { }

  ngOnInit(): void {
    // dispatching action to load Customer
    this.store.dispatch(new customerActions.LoadCustomers());
    // subscribing to store using selector
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    // subscribing to get error selector
    this.error$ = this.store.pipe(select(fromCustomer.getError));
  }

  deleteCustomer(customer: Customer) {
    // confirmation prompt using confirm
    if (confirm('Are you sure you want to delete this user')) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }

}
