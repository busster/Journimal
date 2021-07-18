import { db } from '../index'
import { packsCollection, packMembersCollection, usersCollection, dogsCollection } from '../collections'

import { PackMemberType, PackMemberRank } from '../../domains/pack'

import { PackVm, PackMemberVm } from '../../viewModels/packs'

import { PackDoesNotExist } from './errors'

export const getPackByIdService = async (packUid : string, userId : string) : Promise<PackVm> => {
  try {
    const pack = await packsCollection.doc(packUid).get()
    const packMembers = await packMembersCollection.where('packId', '==', packUid).get()

    if (!pack.exists) {
      throw PackDoesNotExist;
    } else {
      const packDto = pack.data();

      const packMembersDto : PackMemberVm[] = []
      packMembers.forEach(doc => {
        const packMemberData = doc.data()
        packMembersDto.push({
          id: packMemberData.memberId,
          type: packMemberData.memberType,
          rank: packMemberData.rank,
          name: ''
        })
      });

      const requestingUserAsMember = packMembersDto
        .find(member => member.type === PackMemberType.Human && member.id === userId);

      if (!requestingUserAsMember) {
        throw PackDoesNotExist;
      }

      const membersVm = await Promise.all(
        packMembersDto.map(
          async (memberDto : PackMemberVm) => {
            switch (memberDto.type) {
              case PackMemberType.Human:
                const user = await usersCollection.doc(memberDto.id).get();
                const userData = user.data();
                return { ...memberDto, name: userData.name };
              case PackMemberType.Dog:
                const dog = await dogsCollection.doc(memberDto.id).get();
                const dogData = dog.data();
                return { ...memberDto, name: dogData.name };
              default:
                return null;
            }
          })
          .filter(member => member !== null)
        )

      return {
        id: packDto.id,
        name: packDto.name,
        members: membersVm.filter(member => member !== null)
      }
    }
  } catch (ex) {
    throw PackDoesNotExist
  }
}
