import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { EmailSettingService } from '@app/service/api/email-setting.service';
import { AppComponentBase } from '@shared/app-component-base';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent extends AppComponentBase implements OnInit {
  emailsetting = {} as EmailSettingDto;
  isEditing: boolean = false;
  isShowPassword: boolean = true;

  constructor(
    private emailsettingservice: EmailSettingService,
    injector: Injector) {

    super(injector);
  }

  list(): void {
    this.emailsettingservice.getMail().subscribe((result: any) => {
      this.emailsetting = result.result;
    });
  }

  editMail() {
    this.isEditing = true;
  }
  SaveMail(emailsetting: EmailSettingDto) {
    this.emailsettingservice.change(emailsetting).subscribe((result: any) => {
      this.emailsetting = result.result;
      this.isEditing = !this.isEditing;
    })
  }
  checkShowpass() {
    this.isShowPassword = !this.isShowPassword;
  }

  ngOnInit() {
    this.list();
  }


}
export class EmailSettingDto {
  fromDisplayName: string;
  userName: string;
  port: string;
  host: string;
  password: string;
}
