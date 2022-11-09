import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rest-api',
  templateUrl: './rest-api.component.html',
  styleUrls: ['./rest-api.component.css'],
})
export class RestApiComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.queryParams);
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      // const slugs = this.route.query;
      // const message = `Sign this message for authenticating with your wallet. Nonce: ${slugs.slugs[2]}`;
      // const messageBytes = new TextEncoder().encode(message);
      // const publicKeyBytes = bs58.decode(slugs.slugs[1]);
      // const signatureBytes = bs58.decode(slugs.slugs[0]);
      // const result = nacl.sign.detached.verify(
      //   messageBytes,
      //   signatureBytes,
      //   publicKeyBytes
      // );
      // const obj = {
      //   name: 'Torsten',
      //   age: 54,
      // };
      // const thefile = new Blob([JSON.stringify(obj)], {
      //   type: 'application/json',
      // });
      // let url = window.URL.createObjectURL(thefile);
      // window.location.href = url;
    });
  }
}
