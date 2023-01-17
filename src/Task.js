class Task {
    constructor() {
        this.status;
        this.title;
        this.description;
        this.priority;
        this.deadline;
    }

    setProject(project) {
        this.project = project;
    }

    setProperty(property, value) {
        this[property] = value;
    }

    getProject() {
        return this.project;
    }

    getProperty(property) {
        return this[property];
    }

    pushTask(project) {
        project.tasks.push(this);
    }
}

export {
    Task
};