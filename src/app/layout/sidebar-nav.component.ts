import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l('Users'), 'Pages.Users', 'people', '/app/users'),
        new MenuItem(this.l('Clients'), 'Pages.Customer', 'people_outline', '/app/main/customers'),
        new MenuItem(this.l('Manage Tasks'), 'Pages.Task', 'import_contacts', '/app/main/task'),
        new MenuItem(this.l('Manage Projects'), 'Pages.Project', 'date_range', '/app/main/projects'),
        
    ];

    constructor(
        injector: Injector,

    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }
        console.log(this.permission);

        return true;
    }
}
