import {
    Task
} from "./Task"

import {
    Card
} from "./Card"

import {
    Project
} from "./Project"
import {
    Modal
} from "./Modal";

let project = new Project('Home');
class UI {
    static initialize() {
        UI.getTaskButton();
        UI.getModal();
    }

    static getModal() {
        document.querySelector('body').append(Modal.createModal());
    }

    static getTaskButton() {
        const button = document.querySelector(".add-task");

        button.onclick = () => UI.newTask();
    }

    static newTask() {
        const task = UI.createTask();
        const card = UI.createCard();

        task.syncData(card);
        card.render();
    }

    static createTask() {
        const task = new Task();

        return task;
    }

    static createCard() {
        const card = new Card();
        card.setParent('.container--tasks');

        return card;
    }
}

export {
    UI
}