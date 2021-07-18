import moment from 'moment';
import { db } from '../index'
import { toDate } from '../utils';
import { packsCollection, packInvitesCollection, packMembersCollection } from '../collections'

import { Pack, PackInvite, PackMemberType, PackMemberRank } from '../../domains/pack'

import { PackDoesNotExist, CouldNotCreatePack, CouldNotUpdatePack, NotMemberOfPack, PackInviteNotExist, PackInviteExpired } from './errors'

type PackMembersDto = [string, PackMemberType, PackMemberRank];

const getPackMembersByPackId = async (packUid : string) : Promise<PackMembersDto[]> => {
  const packMembers = await packMembersCollection.where('packId', '==', packUid).get();
  const packMembersDto : [string, PackMemberType, PackMemberRank][] = []
  packMembers.forEach(doc => {
    const packMemberData = doc.data()
    packMembersDto.push([
      packMemberData.memberId,
      packMemberData.memberType,
      packMemberData.rank
    ])
  });
  return packMembersDto;
}

const userInPackMembers = (userId : string, packMembersDto : PackMembersDto[]) : boolean =>
  packMembersDto
    .map(pmd => pmd[0])
    .find(id => id === userId) !== undefined

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

export const updatePackService = async (pack: Pack): Promise<void> => {
  try {
    const packRef = packsCollection.doc(pack.id);

    // update name
    await packRef
      .set({
        name: pack.name
      })

    const packMembersRef = await packMembersCollection.where('packId', '==', pack.id).get();
    packMembersRef.forEach(async packMemberRef => {
      const packMemberData = packMemberRef.data()
      const matchedMember = pack.members.find(member => member[0] === packMemberData.id);
      if (matchedMember) {
        await packMembersCollection.doc(packMemberRef.id).update({
          packId: pack.id,
          memberId: matchedMember[0],
          memberType: matchedMember[1],
          rank: matchedMember[2]
        })
      }
    })
  } catch (ex) {
    throw CouldNotUpdatePack
  }
}

export const getPackByInvite = async (inviteId : string) : Promise<Pack> => {
  try {
    const invite = await packInvitesCollection.doc(inviteId).get();
    if (!invite.exists) {
      throw(PackInviteNotExist);
    }

    const inviteData = invite.data();
    const { packId, expirationDate } = inviteData;

    if (toDate(expirationDate) < moment()) {
      throw(PackInviteExpired);
    }

    return await getPackByIdService(packId);
  } catch (ex) {
    throw(ex);
  }
}

export const getPackByIdService = async (packUid : string) : Promise<Pack> => {
  try {
    const pack = await packsCollection.doc(packUid).get();

    if (!pack.exists) {
      throw PackDoesNotExist
    } else {
      const packDto = pack.data();

      const packMembersDto = await getPackMembersByPackId(packUid);

      return new Pack(packDto.id, packDto.name, packMembersDto);
    }
  } catch (ex) {
    throw PackDoesNotExist
  }
}

export const createPackInviteService = async (packInvite : PackInvite) : Promise<void> => {
  try {
    const packMembersDto = await getPackMembersByPackId(packInvite.packId);

    if (!userInPackMembers(packInvite.userId, packMembersDto)) {
      throw(NotMemberOfPack);
    }

    const inviteRef = await packInvitesCollection.doc();

    // COPY ID FOR EVENT
    packInvite.inviteId = inviteRef.id;

    await inviteRef.set({
      packId: packInvite.packId,
      userId: packInvite.userId,
      expirationDate: packInvite.expirationDate.toDate(),
    });
  } catch (ex) {
    throw ex;
  }
}
