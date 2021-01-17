export interface IPackMemeber {
  id : string;
  rank : string;
}

export interface IPack {
  id : string;
  name : string;
  members : IPackMemeber[];
}