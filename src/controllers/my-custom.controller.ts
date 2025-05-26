// Uncomment these imports to begin using these cool features!

import { get } from "@loopback/rest";
import { MyCustomService } from "../services";
import { inject } from "@loopback/core";

export class MyCustomController {
  constructor( @inject('services.MyCustomService')private customservice: MyCustomService ) {}

  @get('/get-customer')
  async getcustomer(){
    return this.customservice.runcustomQuery();
  }
}
