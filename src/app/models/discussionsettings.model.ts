export class DiscussionSettings {
    id?: string;

    constructor(
        public discussionSettingsId: string,
        public userId: string,
        public classId: string,
        public section: string,
        public discussing: boolean,
        public folds: boolean[]

    ) {}

}
