import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Order,
  Manufature,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderManufatureController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/manufatures', {
    responses: {
      '200': {
        description: 'Array of Order has many Manufature',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manufature)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Manufature>,
  ): Promise<Manufature[]> {
    return this.orderRepository.manufactures(id).find(filter);
  }

  @post('/orders/{id}/manufatures', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manufature)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Order.prototype.order_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufature, {
            title: 'NewManufatureInOrder',
            exclude: ['manufacture_id'],
            optional: ['order_id']
          }),
        },
      },
    }) manufature: Omit<Manufature, 'manufacture_id'>,
  ): Promise<Manufature> {
    return this.orderRepository.manufactures(id).create(manufature);
  }

  @patch('/orders/{id}/manufatures', {
    responses: {
      '200': {
        description: 'Order.Manufature PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufature, {partial: true}),
        },
      },
    })
    manufature: Partial<Manufature>,
    @param.query.object('where', getWhereSchemaFor(Manufature)) where?: Where<Manufature>,
  ): Promise<Count> {
    return this.orderRepository.manufactures(id).patch(manufature, where);
  }

  @del('/orders/{id}/manufatures', {
    responses: {
      '200': {
        description: 'Order.Manufature DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Manufature)) where?: Where<Manufature>,
  ): Promise<Count> {
    return this.orderRepository.manufactures(id).delete(where);
  }
}
