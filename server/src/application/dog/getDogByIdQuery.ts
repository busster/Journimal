import { Query, QueryHandler } from '../../utils/cqrs'

import { Dog } from '../../domains/dog'

import { getDogByIdService } from '../../repositories/dogs'

export class GetDogByIdQuery extends Query {
  userId : string;
  id : string;

  constructor (userId : string, id : string) {
    super();
    this.userId = userId;
    this.id = id;
  }
}

export class GetDogByIdQueryHandler extends QueryHandler<GetDogByIdQuery, Dog> {
  async handle(query: GetDogByIdQuery): Promise<Dog> {
    return new Dog('', '', [])
    // try {
    //   const dog = await getDogByIdService(query.id);

    //   const owner = dog.owners.find((dogOwnerDto : IDogOwnerDto) => dogOwnerDto.ownerId === query.userId)
    //   if (!owner) throw new Error('User not an owner of this dog')

    //   return {
    //     id: dog.id,
    //     name: dog.name,
    //     owners: dog.owners.map(o => ({ id: o.ownerId }))
    //   }
    // } catch (ex) {
    //   throw ex
    // }
  }
}
