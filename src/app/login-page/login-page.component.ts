import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as solana from '@solana/web3.js';
import { SolWalletsService } from 'angular-sol-wallets';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(private solWalletS: SolWalletsService) {}

  ngOnInit(): void {}

  openWallet() {
    console.log('enter!');
    this.connect();
    console.log('finish!');
  }

  connect() {
    this.solWalletS
      .connect()
      .then((wallet) => {
        console.log(
          'Wallet connected successfully with this address:',
          wallet.publicKey
        );
        this.signMessage(wallet);
      })
      .catch((err) => {
        console.log('Error connecting wallet', err);
      });
  }

  signMessage(wallet: any) {
    const nonce = 'test123';
    this.solWalletS
      .signMessage(`Sign message to login in PTS app. Nonce: ${nonce}`)
      .then((signature) => {
        console.log('Message signed:', signature);
        window.location.assign(
          'https://localhost:8090/gatewaycontroller/app/index.html?crypto=true&seed=' +
            signature +
            '&pubKey=' +
            wallet.publicKey +
            '&appID=nextGen'
        );
      })
      .catch((err) => {
        console.log('err transaction', err);
      });
  }

  disconnect() {
    this.solWalletS.disconnect();
  }
}
