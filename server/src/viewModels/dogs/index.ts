export interface DogOwner {
  id : string;
  name : string;
}

export interface Dog {
  id : string;
  name : string;
  owners : DogOwner[];
}