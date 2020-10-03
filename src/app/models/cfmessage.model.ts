import { MessageReply } from './messagereply.model';
import { Freshness } from './freshness.model';

export class CFMessage {
    id?: string;

    constructor(
        public CFMessageId: string,
        public firstname: string,
        public lastname: string,
        public message: string,

    ) {}
  }
