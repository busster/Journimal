export class User {
  id : string;
  name : string;
  packs : string[];
  dogs : string[];

  constructor(id : string, name : string, packs : string[], dogs : string[]) {
    this.id = id;
    this.name = name;
    this.packs = packs;
    this.dogs = dogs;
  }
}
