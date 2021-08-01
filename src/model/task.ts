export interface Task {
    title: string;
    assignees: string[];
    completed: boolean;
    createWhen: Date;
    lastModifiedWhen: Date;
}
