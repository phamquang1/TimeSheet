import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user-dialog.component';
import { Moment } from 'moment';
import { ResetPasswordDialogComponent } from './reset-password/reset-password.component';

class PagedUsersRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | string ='';
}

@Component({
    templateUrl: './users.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          .padding-custom{
            padding: 20px 5px 0px 5px !important;
          }
        `
      ]
})
export class UsersComponent extends PagedListingComponentBase<UserDto> {
    users: UserDto[] = [];
    keyword = '';
    isActive: boolean | string ='';
    roles: RoleDto[] = [];
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }
    clearKeyword(val) {
        if (val === "") {
          this.refresh();
        }
      }
    createUser(): void {
        let user = {} as UserDto;
        this.showCreateOrEditUserDialog(user);
    }

    editUser(user: UserDto): void {
        this.showCreateOrEditUserDialog(user);
    }

    public resetPassword(user: UserDto): void {
        this.showResetPasswordUserDialog(user.id);
    }

    protected list(
        request: PagedUsersRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._userService
            .getAll(request.keyword, request.isActive, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfUserDto) => {
                this.users = result.items;
                this.showPaging(result, pageNumber);
            });
        this._userService.getRoles().subscribe(result => {
                this.roles = result.items;
        });
    }

    protected delete(user: UserDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', user.fullName),
            (result: boolean) => {
                if (result) {
                    this._userService.delete(user.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        );
    }

    private showResetPasswordUserDialog(userId?: number): void {
        this._dialog.open(ResetPasswordDialogComponent, {
            data: userId
        });
    }

    private showCreateOrEditUserDialog(user: UserDto): void {
        let item ={user : user ,roles: this.roles} ;
        const dialogRef = this._dialog.open(CreateEditUserComponent, {
          data: item
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (user.id === undefined) {
              this._userService.create(result).subscribe(() => {
                this.notify.info(this.l('Create Successfully'));
                this.refresh();
              });
            } else {
              this._userService.update(result).subscribe(() => {
                this.notify.info(this.l('Saved Successfully'));
                this.refresh();
              });
            }
          }
        });
    }
}
