import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService extends BaseApiService {

  submitTimesheet(timesheetId: any): any {
    return this.http.post(this.getUrl('SubmitTimesheet?timesheetId=' + timesheetId), {});
  }
  
  constructor(http: HttpClient) {
    super(http);
  }

  changeUrl() {
    return 'Timesheet';
  }

  getAllTimesheet(status: number): Observable<any> {
    return this.http.get(this.rootUrl + '/GetAll?Status=' + status);
  }

  approveTimesheet(listId) {
    return this.http.post(this.rootUrl + '/ApproveTimesheets', listId );
  }

  rejectTimesheet(listId){
    return this.http.post(this.rootUrl + '/RejectTimesheets', listId );
  }

  createOrGetMyTimesheet() {
    return this.http.post(this.getUrl('CreateMyTimesheet'), {});
  }

  changeStatusService(id: number, statusCode: number): Observable<any> {
    return this.http.post(this.getUrl('ChangeStatusTimesheet?id=' + id), statusCode);
  }

  getMyTimesheet(status: any): Observable<any> {
    return this.http.get(this.getUrl('GetMyTimesheet?Status=' + status));
  }

  getPendingTimesheet(): Observable<any> {
    return this.http.get(this.getUrl('getPendingTimesheet'));
  }

  getTimesheetReport(fromDate, toDate): Observable<any> {
    return this.http.get(this.getUrl(`GetTimesheetReport?fromDate=${fromDate}&toDate=${toDate}`));
  }

  getProjectList(fromDate, toDate): Observable<any>{
    return this.http.get(this.getUrl(`GetProjectList?fromDate=${fromDate}&toDate=${toDate}`));
  }


  getTaskList(fromDate, toDate): Observable<any> {
    return this.http.get(this.getUrl(`GetTaskList?fromDate=${fromDate}&toDate=${toDate}`));
  }

  getTeamList(fromDate, toDate): Observable<any> {
    return this.http.get(this.getUrl(`GetTeamList?fromDate=${fromDate}&toDate=${toDate}`));
  }

  getCustomerList(fromDate, toDate): Observable<any> {
    return this.http.get(this.getUrl(`GetCustomerList?fromDate=${fromDate}&toDate=${toDate}`));
  }

  checkAdmin():Observable<any> {
    return this.http.get(this.getUrl(`CheckAdmin`));
  }
}
