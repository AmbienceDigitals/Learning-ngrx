import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as customerAction from '../state/customer.action';
import * as fromCustomer from '../state/customer.reducer';
import { Customer } from '../customers.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) { }

  ngOnInit(): void {
    // creating form group for adding customer
    this.customerForm = this.fb.group({
      name : ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      membership: ['', Validators.required],
      id: null
    });

    // creating Observable to equate customer$ to currentCustomer
    //  from the store using the getCurrent selector
    const customer$: Observable<Customer> = this.store.select(
      fromCustomer.getCurrentCustomer
    );

    // subscribing customer$ to the initial value of currentCustomer
    customer$.subscribe(currentCustomer => {
      if (currentCustomer) {
        // patching the initial value of current customer into customerForm
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id
        });
      }
    });
  }

  // getting the values of customerForm
  updateCustomer(): void {
    const updatedCustomer: Customer = {
      name: this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      address: this.customerForm.get('address').value,
      membership: this.customerForm.get('membership').value,
      id: this.customerForm.get('id').value
    };

    // dispatching action to update customer using the values of customerForm
    this.store.dispatch(new customerAction.UpdateCustomer(updatedCustomer));
  }

}
