export class Video {
  id?: string;

  constructor(
      public title: string,
      public description: string,
      public videoId: string,
      public url: string,
      public image: string,
      public owner: string   // this is the id of the user who uploaded this
  ) {}

}


