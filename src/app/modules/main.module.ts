import { MainRoutingModule } from './main-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditCustomerComponent } from './customer/create-edit-customer/create-edit-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    CreateEditCustomerComponent,
    CustomerComponent,
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class MainModule { }
