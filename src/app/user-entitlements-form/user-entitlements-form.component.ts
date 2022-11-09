import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-entitlements-form',
  templateUrl: './user-entitlements-form.component.html',
  styleUrls: ['./user-entitlements-form.component.css'],
})
export class UserEntitlementsFormComponent implements OnInit {
  emailFormControl: FormControl;
  walletAddressFormControl: FormControl;

  constructor() {
    this.walletAddressFormControl = new FormControl('');
    this.emailFormControl = new FormControl('');
  }

  ngOnInit(): void {}

  submit() {
    this.emailFormControl.patchValue('');
    this.walletAddressFormControl.patchValue('');
  }
}
