import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {LoopbackProjectDataSource} from '../datasources';
import {Customers, CustomersRelations, Order, Address} from '../models';
import {OrderRepository} from './order.repository';
import {AddressRepository} from './address.repository';

export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.customer_id,
  CustomersRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Customers.prototype.customer_id>;

  public readonly address: HasOneRepositoryFactory<Address, typeof Customers.prototype.customer_id>;

  constructor(
    @inject('datasources.loopback_project') dataSource: LoopbackProjectDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Customers, dataSource);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
