export class Dog {
  id : string;
  name : string;
  owners : string[];

  constructor(id : string, name : string, owners : string[]) {
    this.id = id;
    this.name = name;
    this.owners = owners;
  }
}
