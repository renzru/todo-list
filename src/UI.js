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
    }

    static getTaskButton() {
        const button = document.querySelector(".add-task");

        button.onclick = () => UI.newTask();
    }

    static newTask() {
        const card = UI.createCard();

        card.render();
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