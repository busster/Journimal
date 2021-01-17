export interface IDogOwner {
  id : string;
}

export interface IDog {
  id : string;
  name : string;
  owners : IDogOwner[];
}