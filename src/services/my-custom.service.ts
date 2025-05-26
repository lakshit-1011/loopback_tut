import {inject, bind, BindingScope} from '@loopback/core';
import {juggler} from '@loopback/repository';

@bind({scope: BindingScope.TRANSIENT})
export class MyCustomService {
  constructor(
    @inject('datasources.loopbackProject')
    private dataSource: juggler.DataSource,
  ) {}

  async runcustomQuery() {
    const connector = this.dataSource.connector as any;

    if (!connector?.client?.db) {
      throw new Error('MongoDB client is not connected');
    }

    const db = connector.client.db();
    const usersCollection = db.collection('Customers');

    const res = await usersCollection.findOne({
      email: 'tyagilakshit2k03@gmail.com',
    });

    return res;
  }
}
