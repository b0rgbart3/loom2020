import { Course } from './course.model';

export class ChoiceList {
  id?: string;

  constructor(
      public headline: string,
      public type: string,
      public choices: string[],

  ) {}

}


