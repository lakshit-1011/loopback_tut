import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Manufature} from '../models';
import {ManufatureRepository} from '../repositories';

export class ManufactureController {
  constructor(
    @repository(ManufatureRepository)
    public manufatureRepository : ManufatureRepository,
  ) {}

  @post('/manufatures')
  @response(200, {
    description: 'Manufature model instance',
    content: {'application/json': {schema: getModelSchemaRef(Manufature)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufature, {
            title: 'NewManufature',
            exclude: ['manufacture_id'],
          }),
        },
      },
    })
    manufature: Omit<Manufature, 'manufacture_id'>,
  ): Promise<Manufature> {
    return this.manufatureRepository.create(manufature);
  }

  @get('/manufatures/count')
  @response(200, {
    description: 'Manufature model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Manufature) where?: Where<Manufature>,
  ): Promise<Count> {
    return this.manufatureRepository.count(where);
  }

  @get('/manufatures')
  @response(200, {
    description: 'Array of Manufature model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Manufature, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Manufature) filter?: Filter<Manufature>,
  ): Promise<Manufature[]> {
    return this.manufatureRepository.find(filter);
  }

  @patch('/manufatures')
  @response(200, {
    description: 'Manufature PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufature, {partial: true}),
        },
      },
    })
    manufature: Manufature,
    @param.where(Manufature) where?: Where<Manufature>,
  ): Promise<Count> {
    return this.manufatureRepository.updateAll(manufature, where);
  }

  @get('/manufatures/{id}')
  @response(200, {
    description: 'Manufature model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Manufature, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Manufature, {exclude: 'where'}) filter?: FilterExcludingWhere<Manufature>
  ): Promise<Manufature> {
    return this.manufatureRepository.findById(id, filter);
  }

  @patch('/manufatures/{id}')
  @response(204, {
    description: 'Manufature PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufature, {partial: true}),
        },
      },
    })
    manufature: Manufature,
  ): Promise<void> {
    await this.manufatureRepository.updateById(id, manufature);
  }

  @put('/manufatures/{id}')
  @response(204, {
    description: 'Manufature PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() manufature: Manufature,
  ): Promise<void> {
    await this.manufatureRepository.replaceById(id, manufature);
  }

  @del('/manufatures/{id}')
  @response(204, {
    description: 'Manufature DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.manufatureRepository.deleteById(id);
  }
}
