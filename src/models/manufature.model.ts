import {Entity, model, property} from '@loopback/repository';

@model()
export class Manufature extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  manufacture_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'number',
  })
  order_id?: number;

  constructor(data?: Partial<Manufature>) {
    super(data);
  }
}

export interface ManufatureRelations {
  // describe navigational properties here
}

export type ManufatureWithRelations = Manufature & ManufatureRelations;
