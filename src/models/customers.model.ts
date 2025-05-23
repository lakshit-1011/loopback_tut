import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Order} from './order.model';
import {Address} from './address.model';

@model()
export class Customers extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  customer_id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @hasMany(() => Order, {keyTo: 'customer_id'})
  orders: Order[];

  @hasOne(() => Address, {keyTo: 'customer_id'})
  address: Address;

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  // describe navigational properties here
}

export type CustomersWithRelations = Customers & CustomersRelations;
