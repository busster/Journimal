import { db } from '../index'
import { packsCollection, packMembersCollection } from '../collections'

import { Pack, PackMemberType, PackMemberRank } from '../../domains/pack'

const PackDoesNotExist = new Error('Pack does not exist')
const CouldNotCreatePack = new Error('Could not create pack')

export const createPackService = async (pack : Pack) : Promise<void> => {
  const packRef = packsCollection.doc()
  const packId = packRef.id

  // COPY ID FOR EVENT
  pack.id = packId

  try {
    await packRef
      .set({
        name: pack.name
      })

      pack.members.forEach(async member => {
        await packMembersCollection.doc().set({
          packId,
          memberId: member[0],
          memberType: member[1],
          rank: member[2]
        })
      })
  } catch (ex) {
    throw CouldNotCreatePack
  }
}

export const getPackByIdService = async (packUid : string) : Promise<Pack> => {
  try {
    const pack = await packsCollection.doc(packUid).get()
    const packMembers = await packMembersCollection.where('packId', '==', packUid).get()

    if (!pack.exists) {
      throw PackDoesNotExist
    } else {
      const packDto = pack.data();

      const packMembersDto : [string, PackMemberType, PackMemberRank][] = []
      packMembers.forEach(doc => {
        const packMemberData = doc.data()
        packMembersDto.push([
          packMemberData.memberId,
          packMemberData.memberType,
          packMemberData.rank
        ])
      })

      return new Pack(packDto.id, packDto.name, packMembersDto)
    }
  } catch (ex) {
    throw PackDoesNotExist
  }
}
