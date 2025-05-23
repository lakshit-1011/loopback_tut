import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Address,
  Customers,
} from '../models';
import {AddressRepository} from '../repositories';

export class AddressCustomersController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @get('/addresses/{id}/customers', {
    responses: {
      '200': {
        description: 'Customers belonging to Address',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customers),
          },
        },
      },
    },
  })
  async getCustomers(
    @param.path.number('id') id: typeof Address.prototype.address_id,
  ): Promise<Customers> {
    return this.addressRepository.customer(id);
  }
}
