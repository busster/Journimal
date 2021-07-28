import moment from 'moment';

export type PackMember = [string, PackMemberType, PackMemberRank]

export enum PackMemberRank {
  Leader = 'Leader',
  Member = 'Member'
}

export enum PackMemberType {
  Human = 'Human',
  Dog = 'Dog'
}

export class Pack {
  id : string;
  name : string;
  members : Map<string, PackMember>;

  constructor(id : string, name : string, members : PackMember[]) {
    this.id = id;
    this.name = name;
    this.members = members.reduce((membersMap, member) => {
      membersMap.set(member[0], member);
      return membersMap;
    }, new Map<string, PackMember>());
  }

  addMembers (members : PackMember[]) {
    members.forEach(member => {
      this.members.set(member[0], member);
    })
  }
}

export class PackInvite {
  inviteId : string;
  packId : string;
  userId : string;
  expirationDate : moment.Moment;

  constructor (packId : string, userId : string) {
    this.packId = packId;
    this.userId = userId;
    this.expirationDate = moment().add(1, 'days');
  }
}
