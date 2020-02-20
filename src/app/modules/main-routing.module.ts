import { AppRouteGuard } from './../../shared/auth/auth-route-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CreateEditCustomerComponent } from './customer/create-edit-customer/create-edit-customer.component';
import { ManageTasksComponent } from '../manage-tasks/manage-tasks.component';
const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'app/main/customers', pathMatch: 'full'},
    { path: 'customers', component: CustomerComponent, data: { permission: 'Pages.Customer' }, canActivate: [AppRouteGuard] },
    { path: 'task', component: ManageTasksComponent, data: { permission: 'Pages.Task' }, canActivate: [AppRouteGuard] }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  entryComponents: [
   CreateEditCustomerComponent
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
