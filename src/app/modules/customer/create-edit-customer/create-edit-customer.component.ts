import { AppComponentBase } from '@shared/app-component-base';
import { CustomerService } from '../../../service/api/customer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Optional, Injector, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CustomerDto } from '../customer.component';

@Component({
  selector: 'app-create-edit-customer',
  templateUrl: './create-edit-customer.component.html',
  styleUrls: ['./create-edit-customer.component.css']
})
export class CreateEditCustomerComponent extends AppComponentBase implements OnInit  {
  customer = {} as CustomerDto;
  title: string;
  active: boolean = true;
  saving: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    injector: Injector,
  ) {
    super(injector);
   } 

   ngOnInit() {
    this.customer = this.data;
    console.log(this.customer);
    console.log(this.data);
    this.title = this.customer.id != null ? 'Edit Client: ' : 'New Client';
  }

}
