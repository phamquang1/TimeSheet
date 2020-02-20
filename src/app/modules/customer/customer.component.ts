import { CreateEditCustomerComponent } from './create-edit-customer/create-edit-customer.component';
import { MatDialog, PageEvent } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CustomerService } from './../../service/api/customer.service';
import { Component, OnInit, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  animations: [appModuleAnimation()]
})

export class CustomerComponent extends PagedListingComponentBase<CustomerDto> implements OnInit {

  isActive: boolean | null;

  customers = [] as CustomerDto[];
  isLoading: boolean = true;
  totalCount: number = 1;
  lan3: number = 2;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    injector: Injector
  ) {
    super(injector);
  }

  protected list(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this.customerService
      .getAllPagging(request)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: any) => {
        this.customers = result.result.items;
        this.showPaging(result.result, pageNumber);
      });
  }

  protected delete(item: CustomerDto): void {
    abp.message.confirm(
      "Delete customer '" + item.name + "'?",
      (result: boolean) => {
        if (result) {
          this.customerService.delete(item.id).subscribe(() => {
            abp.notify.info('Deleted customer: ' + item.name);
            this.refresh();
          });
        }
      }
    );
  }

  createCustomer(): void {
    let customer = {} as CustomerDto;
    this.showDialog(customer);
  }

  editCustomer(customer: CustomerDto): void {
    this.showDialog(customer);
  }


  showDialog(customer: CustomerDto): void {
    let item = { id: customer.id, name: customer.name, address: customer.address } as CustomerDto;
    const dialogRef = this.dialog.open(CreateEditCustomerComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.save(result).subscribe(res => {
          this.refresh();          
        })
      }
    });
  }
}

export class CustomerDto {
  id: number;
  name: string;
  address: string;
}
