import { Address } from "./address.model";
import { Client } from "./client.model";

export class User{
   
    constructor(public id: string, public username: string, public firstname: string, 
        public lastname: string, public email: string,
        public phone: number, public address: Address, public client: Client){

    }
}