import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css'],
})
export class DialogFormComponent implements OnInit {
  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  emailFormControl: FormControl;
  profilesFormControl: FormControl;
  profiles: string[];
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      rowData: any;
      grid: any;
      action: any;
      title: string;
      rowForEdit?: any;
    },
    public dialogRef: MatDialogRef<DialogFormComponent>
  ) {
    this.title = this.data.title;
    this.firstNameFormControl = new FormControl('');
    this.lastNameFormControl = new FormControl('');
    this.emailFormControl = new FormControl('');
    this.profilesFormControl = new FormControl('');
    this.profiles = [
      'Admin Rights',
      'NEXTGEN Challenge Regular',
      'NEXTGEN OTP Regular',
      'Supervisor',
      'EflowUser',
      'ETD Middle Office Operator',
      'Securities Middle Office Operator',
      'IP Executor',
      'IP Admin',
      'ETD Middle Office Static Data Operator',
      'ETD Middle Office Clearing Operator',
      'ETD Middle Office Read Only Data Operator',
      'ETD Middle Office IT Support',
      'ETD Middle Office Manager',
      'Monitoring Tool Account',
      'Guest',
      'Testing Tool Account',
      'REPORTING_ADMIN',
      'ETD Back Office Operations View Only',
      'ETD Back Office Operations View and Update',
      'CX_Read_Only',
      'Allocation Engine',
      'IH Public API User',
      'Trade Allocator',
    ];
    if (this.data.action === 'edit') {
      this.firstNameFormControl.patchValue(this.data.rowForEdit.firstName);
      this.lastNameFormControl.patchValue(this.data.rowForEdit.lastName);
      this.emailFormControl.patchValue(this.data.rowForEdit.mail);
      this.profilesFormControl.patchValue(this.data.rowForEdit.profiles);
    }
  }

  ngOnInit(): void {}

  submit() {
    if (this.data.action === 'add') {
      this.data.rowData.push({
        firstName: this.firstNameFormControl.value,
        lastName: this.lastNameFormControl.value,
        mail: this.emailFormControl.value,
        profiles: this.profilesFormControl.value,
      });
      this.data.grid.api.setRowData(this.data.rowData);
    } else if (this.data.action === 'edit') {
      this.data.rowData.forEach((el: any) => {
        if (el.mail === this.data.rowForEdit.mail) {
          el.firstName = this.firstNameFormControl.value;
          el.lastName = this.lastNameFormControl.value;
          el.mail = this.emailFormControl.value;
          el.profiles = this.profilesFormControl.value;
        }
      });
      this.data.grid.api.setRowData(this.data.rowData);
    }
    this.dialogRef.close();
  }
}
