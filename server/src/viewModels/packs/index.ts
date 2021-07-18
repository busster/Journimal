import { PackMemberType, PackMemberRank } from '../../domains/pack'

export interface PackMemberVm {
  id : string;
  name : string;
  rank : PackMemberRank;
  type : PackMemberType;
}

export interface PackVm {
  id : string;
  name : string;
  members : PackMemberVm[];
}