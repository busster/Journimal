export interface PackVm {
  id : string;
  name : string;
}

export interface DogVm {
  id : string;
  name : string;
}

export interface UserVm {
  id : string;
  name : string;
  dogs : DogVm[];
  packs : PackVm[];
}