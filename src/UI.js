import {
    Task
} from "./Task"

import {
    Template
} from "./Template"

import {
    Project
} from "./Project"

let project = new Project('Home');
class UI {
    static getTaskButton() {
        const button = document.querySelector(".add-task");

        button.onclick = () => UI.newTask();
    }

    static newTask() {
        const task = UI.createTask();
        const template = UI.createTemplate();

        UI.linkData(task, template.meta);
        template.render();
    }

    static createTask() {
        const task = new Task();
        task.pushTask(project);

        return task;
    }

    static createTemplate() {
        const template = new Template();
        template.setParent('.container--tasks');

        return template;
    }

    static linkData(task, meta) {
        const properties = [meta.title, meta.status, meta.description];

        properties.forEach(property => {
            property.addEventListener('change', task.setProperty(property.dataset.meta, property.value));
        });
    }

    static initialize() {
        UI.getTaskButton();
    }
}

export {
    UI
}