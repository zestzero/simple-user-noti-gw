export interface Task {
    title: string;
    assignees: string[];
    completed: boolean;
    createWhen: Date;
    lastModifiedWhen: Date;
}

export interface CreateTask {
    title: string;
    assignees: string | null;
    completed: boolean;
}

export interface UpdateTask {
    title?: string;
    assignees?: string;
    completed?: boolean;
}
