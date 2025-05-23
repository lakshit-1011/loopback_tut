import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LoopbackProjectDataSource} from '../datasources';
import {Manufature, ManufatureRelations} from '../models';

export class ManufatureRepository extends DefaultCrudRepository<
  Manufature,
  typeof Manufature.prototype.manufacture_id,
  ManufatureRelations
> {
  constructor(
    @inject('datasources.loopback_project') dataSource: LoopbackProjectDataSource,
  ) {
    super(Manufature, dataSource);
  }
}
