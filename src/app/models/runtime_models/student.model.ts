export class Student {
  id?: string;

  constructor(
      public userId: string,
      public status: any[],
      public sectionsCompleted: any[],
      public materialsCompleted: any[]
  ) {}

}


