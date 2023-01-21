class Task {
    constructor() {
        this.status = false;
        this.title = '';
        this.notes = '';
        this.priority = '';
        this.deadline;
    }

    setProject(project) {
        this.project = project;
    }

    getProject() {
        return this.project;
    }

    pushTask(project) {
        project.tasks.push(this);
    }

    syncData(dom) {
        dom.task = this;
    }
}

export {
    Task
};