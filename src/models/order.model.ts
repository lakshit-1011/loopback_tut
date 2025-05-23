import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Customers} from './customers.model';
import {Manufature} from './manufature.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  order_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Customers, {name: 'customers'})
  customer_id: number;

  @hasMany(() => Manufature, {keyTo: 'order_id'})
  manufactures: Manufature[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
