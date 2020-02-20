import { AppComponentBase } from 'shared/app-component-base';
import { Injector, OnInit } from '@angular/core';

export class PagedResultDto {
    items: any[];
    totalCount: number;
}

export class EntityDto {
    id: number;
}

export class FilterDto{
    propertyName: string;
    value: object;
    comparison: number;
    comparisionName: string;
}

export class PagedRequestDto {
    skipCount: number;
    maxResultCount: number;
    searchText: string;
    filterItems: FilterDto[] = [];
    sort: string;
    sortDirection: number;
}

export abstract class PagedListingComponentBase<TEntityDto> extends AppComponentBase implements OnInit {

    public pageSize = 10;
    public pageNumber = 1;
    public totalPages = 1;
    public totalItems: number;
    public isTableLoading = false;

    public searchText: string = '';
    public filterItems: FilterDto[] = [];

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.refresh();
    }

    public searchOrFilter(){
        // console.log(this.searchText);
        this.pageNumber = 1;
        this.refresh();
    }

    refresh(): void {
        this.getDataPage(this.pageNumber);
    }

    public showPaging(result: PagedResultDto, pageNumber: number): void {
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

        this.totalItems = result.totalCount;
        this.pageNumber = pageNumber;
    }

    public getDataPage(page: number): void {
        var req = new PagedRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (page - 1) * this.pageSize;
        req.searchText = this.searchText;
        req.filterItems = this.filterItems;

        this.isTableLoading = true;
        this.list(req, page, () => {
            this.isTableLoading = false;
        });
    }

    public onAddedFilterItem(item: FilterDto){
        // console.log('onAddedFilterItem()');
        // console.log(item);
        if (this.filterItems.findIndex(i => i.propertyName == item.propertyName && i.comparison == item.comparison) < 0){
            this.filterItems.push(item);
        }
        // console.log(this.filterItems);
    }

    public deleteFilterItem(item: FilterDto){
        var index = this.filterItems.findIndex(i => i.comparison==item.comparison && i.propertyName==item.propertyName && i.value == item.value);
        if (index >= 0) this.filterItems.splice(index, 1);
    }
    protected abstract list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void;
    protected abstract delete(entity: TEntityDto): void;
}
