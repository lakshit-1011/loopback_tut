import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {LoopbackProjectDataSource} from '../datasources';
import {Address, AddressRelations, Customers} from '../models';
import {CustomersRepository} from './customers.repository';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.address_id,
  AddressRelations
> {

  public readonly customer: BelongsToAccessor<Customers, typeof Address.prototype.address_id>;

  constructor(
    @inject('datasources.loopback_project') dataSource: LoopbackProjectDataSource, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>,
  ) {
    super(Address, dataSource);
    this.customer = this.createBelongsToAccessorFor('customer', customersRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
