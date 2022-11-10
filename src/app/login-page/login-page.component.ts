import { Component, OnInit } from '@angular/core';
import * as solana from '@solana/web3.js';
import { SolWalletsService } from 'angular-sol-wallets';
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  setAuthority,
  transfer,
} from '@solana/spl-token';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  connection: any;
  fromWallet: any;
  fromAirdropSignature: any;
  mint: any;
  fromTokenAccount: any;
  toTokenAccount: any;
  signature: any;

  constructor(private solWalletS: SolWalletsService) {}

  async ngOnInit() {
    // Keys -> Wallet -> Account -> NFT (top to down)
    this.connection = await this.connectToSolana();
    await this.creatingNewWalletAndAirdropingSol();
    this.mint = await this.creatNewTokenMint(
      this.connection,
      this.fromWallet,
      this.fromWallet.publicKey
    );
  }

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
        // window.location.assign(
        //   'https://localhost:8090/gatewaycontroller/app/index.html?crypto=true&seed=' +
        //     signature +
        //     '&pubKey=' +
        //     wallet.publicKey +
        //     '&appID=nextGen'
        // );
      })
      .catch((err) => {
        console.log('err transaction', err);
      });
  }

  /* ----------------------------------------------------------------------------------- */

  async createAndReceiveNft() {
    this.fromTokenAccount = await this.creatNewTokenAccount(
      this.connection,
      this.fromWallet,
      this.mint,
      this.fromWallet.publicKey
    );
    console.log('FROM_ACCOUNT', this.fromTokenAccount);
    this.toTokenAccount = await this.creatNewTokenAccount(
      this.connection,
      this.fromWallet,
      this.mint,
      new solana.PublicKey('ELGR2ybfdQxdG8VapTsuPChg6NQm5oQrK1HdndsY8cWX')
    );
    console.log('TO_ACCOUNT', this.toTokenAccount);
    this.signature = await this.mintAndSendNft(
      this.connection,
      this.fromWallet,
      this.mint,
      this.fromWallet.publicKey,
      this.fromTokenAccount,
      this.toTokenAccount
    );
    console.log('SIGNATURE', this.signature);
  }

  async connectToSolana() {
    // Connect to cluster
    return new Connection(clusterApiUrl('devnet'), 'confirmed');
  }

  async creatingNewWalletAndAirdropingSol() {
    // Generate a new wallet keypair and airdrop SOL
    this.fromWallet = Keypair.generate();
    this.fromAirdropSignature = await this.connection.requestAirdrop(
      this.fromWallet.publicKey,
      LAMPORTS_PER_SOL
    );
    // Wait for airdrop confirmation
    await this.connection.confirmTransaction(this.fromAirdropSignature);
  }

  async creatNewTokenMint(connection: any, fromWallet: any, publicKey: any) {
    return await createMint(
      connection,
      fromWallet, // Payer of the transaction
      publicKey, // Account that will control the minting
      null, // Account that will control the freezing of the token
      0 // Location of the decimal place
    );
  }

  async creatNewTokenAccount(
    connection: any,
    fromWallet: any,
    mint: any,
    publicKey?: any
  ) {
    return await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      publicKey || Keypair.generate().publicKey
    );
  }

  async mintAndSendNft(
    connection: any,
    fromWallet: any,
    mint: any,
    publicKey: any,
    fromTokenAccount: any,
    toTokenAccount: any
  ) {
    // Minting 1 new token to the "fromTokenAccount" account we just returned/created.
    let signature = await mintTo(
      connection,
      fromWallet, // Payer of the transaction fees
      mint, // Mint for the account
      fromTokenAccount.address, // Address of the account to mint to
      publicKey, // Minting authority
      1 // Amount to mint
    );

    await setAuthority(
      connection,
      fromWallet, // Payer of the transaction fees
      mint, // Account
      publicKey, // Current authority
      0, // Authority type: "0" represents Mint Tokens
      null // Setting the new Authority to null
    );

    return await transfer(
      connection,
      fromWallet, // Payer of the transaction fees
      fromTokenAccount.address, // Source account
      toTokenAccount.address, // Destination account
      publicKey, // Owner of the source account
      1 // Number of tokens to transfer
    );
  }

  /* ----------------------------------------------------------------------------------- */

  // async getTheOwnerAddressOfPhantomWallet() {
  //   //check solana on window. This is useful to fetch address of your wallet.
  //   getProvider = () => {
  //     if ('solana' in window) {
  //       const provider = window.solana;
  //       if (provider.isPhantom) {
  //         return provider;
  //       }
  //     }
  //   };
  // }

  disconnect() {
    this.solWalletS.disconnect();
  }
}
