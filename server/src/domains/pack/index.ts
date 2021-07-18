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
  members : PackMember[];

  constructor(id : string, name : string, members : PackMember[]) {
    this.id = id;
    this.name = name;
    this.members = members;
  }

  join (members : PackMember[]) {
    // members.forEach(member => {

    // })
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
