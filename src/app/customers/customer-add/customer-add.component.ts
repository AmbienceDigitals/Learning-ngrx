import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as customerAction from '../state/customer.action';
import * as fromCustomer from '../state/customer.reducer';
import { Customer } from '../customers.model';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    private store: Store<fromCustomer.AppState>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // creating form group for adding customer
    this.customerForm = this.fb.group({
      name : ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      membership: ['', Validators.required]
    });
  }

  // getting the values of customerForm
  createCustomer(): any {
    const newCustomer: Customer = {
      name: this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      address: this.customerForm.get('address').value,
      membership: this.customerForm.get('membership').value
    };
    // dispatching action to create new customer using the values of customerForm
    this.store.dispatch(new customerAction.CreateCustomer(newCustomer));

    this.customerForm.reset();
  }

}
