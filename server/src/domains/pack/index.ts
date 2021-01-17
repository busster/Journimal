export enum PackMemberRank {
  Leader,
  Dog
}

export enum PackMemberType {
  User,
  Dog
}

export class Pack {
  id : string;
  name : string;
  members : [string, PackMemberType, PackMemberRank][];

  constructor(id : string, name : string, members : [string, PackMemberType, PackMemberRank][]) {
    this.id = id;
    this.name = name;
    this.members = members;
  }
}
