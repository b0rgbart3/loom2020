export class Image {
  id?: string;

  constructor(
      public title: string,
      public objId: string,
      public image: string,
      public owner: string   // this is the id of the user who uploaded this
  ) {}

}


