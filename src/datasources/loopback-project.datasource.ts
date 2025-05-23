import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'loopback_project',
  connector: 'mongodb',
  url: 'mongodb+srv://tyagiparlakshit2k03:Jp23t9Ut9gpuQEJY@cluster0.dm88hcw.mongodb.net/loopbackdb?retryWrites=true&w=majority',
  useNewUrlParser: true,
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LoopbackProjectDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'loopback_project';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.loopback_project', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
