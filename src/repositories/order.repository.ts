import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {LoopbackProjectDataSource} from '../datasources';
import {Order, OrderRelations, Customers, Manufature} from '../models';
import {CustomersRepository} from './customers.repository';
import {ManufatureRepository} from './manufature.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.order_id,
  OrderRelations
> {

  public readonly customers: BelongsToAccessor<Customers, typeof Order.prototype.order_id>;

  public readonly manufactures: HasManyRepositoryFactory<Manufature, typeof Order.prototype.order_id>;

  constructor(
    @inject('datasources.loopback_project') dataSource: LoopbackProjectDataSource, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>, @repository.getter('ManufatureRepository') protected manufatureRepositoryGetter: Getter<ManufatureRepository>,
  ) {
    super(Order, dataSource);
    this.manufactures = this.createHasManyRepositoryFactoryFor('manufactures', manufatureRepositoryGetter,);
    this.registerInclusionResolver('manufactures', this.manufactures.inclusionResolver);
    this.customers = this.createBelongsToAccessorFor('customers', customersRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
