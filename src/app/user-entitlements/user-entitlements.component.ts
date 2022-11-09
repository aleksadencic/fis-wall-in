import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-entitlements',
  templateUrl: './user-entitlements.component.html',
  styleUrls: ['./user-entitlements.component.css'],
})
export class UserEntitlementsComponent implements OnInit {
  emailFormControl: FormControl;
  walletAddressFormControl: FormControl;
  entitlemensFormControl: FormControl;
  entitlements: string[];
  public gridOptions: GridOptions;

  isAdmin: boolean;
  rowData: any;
  public columnDefs: ColDef[] = [
    { field: 'firstName', cellStyle: { 'text-align': 'left' } },
    { field: 'lastName', cellStyle: { 'text-align': 'left' } },
    {
      field: 'mail',
      cellStyle: { 'text-align': 'left' },
      minWidth: 250,
      width: 250,
    },
    { field: 'walletAddress', cellStyle: { 'text-align': 'left' } },
    { field: 'profiles', cellStyle: { 'text-align': 'left' } },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef;

  // For accessing the Grid's API

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.walletAddressFormControl = new FormControl('');
    this.emailFormControl = new FormControl('');
    this.entitlemensFormControl = new FormControl('');
    this.entitlements = [
      'Entitlement 1',
      'Entitlement 2',
      'Entitlement 3',
      'Entitlement 4',
      'Entitlement 5',
      'Entitlement 6',
    ];
    this.isAdmin = true;
    this.rowData = [
      {
        firstName: 'Aleksa',
        lastName: 'Dencic',
        mail: 'aleksa.dencic@fisglobal.com',
        walletAddress: '86dAd94fHtvdTBdptELMuqRhRETMSsdW5M35TAQxUSbf',
        profiles: ['Supervisor'],
      },
      {
        firstName: 'Luka',
        lastName: 'Vukosavljevic',
        mail: 'luka.vukosavljevic@fisglobal.com',
        walletAddress: '69dAd2eg5asdTBdptELMuqRhRETMSsdW5M36sd2d6sgs',
        profiles: ['Supervisor'],
      },
    ];
    this.defaultColDef = {
      minWidth: 100,
      floatingFilter: true,
      filter: 'agTextColumnFilter',
      filterParams: {},
      sortable: true,
      resizable: true,
    };
    this.gridOptions = <GridOptions>{
      rowData: [],
      columnDefs: this.columnDefs,
      defaultColDef: this.defaultColDef,
      rowSelection: 'single',
      onGridReady: (params) => {
        params.api.setRowData(this.rowData);
      },
      rowHeight: 38,
    };
  }
  ngOnInit(): void {}

  submit() {
    this.rowData.forEach((el: any) => {
      if (el.mail === this.emailFormControl.value) {
        el.walletAddress = this.walletAddressFormControl.value;
      }
    });
    this.isAdmin = true;
    this.gridOptions.api?.setRowData(this.rowData);
  }

  add() {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '350px',
      data: {
        rowData: this.rowData,
        grid: this.gridOptions,
        action: 'add',
        title: 'Add user',
      },
    });
  }

  edit() {
    const row: any = this.gridOptions.api?.getSelectedRows();
    if (row[0]) {
      this.dialog.open(DialogFormComponent, {
        width: '350px',
        data: {
          rowData: this.rowData,
          grid: this.gridOptions,
          action: 'edit',
          rowForEdit: row[0],
          title: 'Edit user',
        },
      });
    }
  }

  delete() {
    const row: any = this.gridOptions.api?.getSelectedRows();
    const newData: any[] = [];
    if (row[0]) {
      this.rowData.forEach((el: any) => {
        if (el.mail === row[0].mail) {
        } else {
          newData.push(el);
        }
      });
      this.rowData = [...newData];
      this.gridOptions.api?.setRowData(newData);
    }
  }
}
