import {
    newElement,
} from "./Utils";

import {
    Animation
} from "./Animation"
import {
    Modal
} from "./Modal";

import {
    Task
} from "./Task";

class Card {
    constructor() {
        this.card = newElement('article', 'task', 'flex', 'bg-white', 'container--input'),
            this.task = new Task(),
            this.parent,
            this.assets = {
                title: this.createTitle(),
                status: this.createStatus(),
                indicator: Card.createIndicator(),
                expand: Card.createExpand()
            }
    }

    // Create HTML Elements
    createTitle() {
        const title = newElement('input', 'fs-500');
        title.value = this.task.title;
        title.dataset.meta = 'title';
        title.placeholder = 'New Task';

        return title
    }

    createStatus() {
        const status = document.createElement('input');
        status.checked = this.task.status
        status.dataset.meta = 'status';
        status.type = 'checkbox';

        return status;
    }

    static createExpand() {
        const expand = newElement('img', 'expand-icon');
        expand.src = './public/expand.svg';

        return expand
    }

    static createIndicator() {
        const indicator = newElement('div', 'status-indicator');
        indicator.style.backgroundColor = 'var(--status-default)';

        return indicator;
    }

    static createPriority(value) {
        if (value === 'none') {
            return;
        }

        const priority = newElement('div', 'priority-indicator', 'medium');
        priority.textContent = this.getPriorityText(value);
        priority.style.backgroundColor = Card.getPriorityColor(value);

        return priority;
    }

    static getPriorityText(priority) {
        switch (priority) {
            case 'important':
                return 'Important';
            case 'urgent':
                return 'Urgent';
            default:
                return 'Normal';
        }
    }

    static getPriorityColor(priority) {
        switch (priority) {
            case 'important':
                return 'var(--priority-important)';
            case 'urgent':
                return 'var(--priority-urgent)';
            default:
                return 'var(--priority-normal)';
        }
    }

    // Getter Methods
    getNode(node) {
        return this.assets[node];
    }

    // Setter Methods
    setParent(parent) {
        this.parent = document.querySelector(parent);
    }

    // Render in DOM
    render() {
        this.card.append(this.getNode('indicator'), this.getNode('status'), this.getNode('title'), this.getNode('expand'));
        this.parent.append(this.card);

        this.syncHeaderData();
        this.syncModalView();
        this.renderAnimations();
    }

    // TODO: clean up/ bundle into Modal.js

    syncHeaderData() {
        this.getNode('title').onchange = () => {
            this.task.title = this.getNode('title').value;
        }

        this.getNode('status').onchange = () => {
            this.task.status = this.getNode('status').checked;
        }
    }

    syncModalView() {
        const modal = document.querySelector('.modal');

        this.getNode('expand').addEventListener('click', () => {
            Modal.initialize(modal, this.task);
            this.syncModalData();

            Modal.show(modal);
        });
    }

    syncModalData() {
        const modal = document.querySelector('.modal');
        const cancel = modal.querySelector('.modal-cancel');
        const save = modal.querySelector('.modal-save');

        cancel.onclick = () => {
            Modal.hide(modal);
        }

        save.onclick = () => {
            this.save(modal)
            Modal.hide(modal);
        }
    }

    save(modal) {
        const notes = modal.querySelector('textarea[data-meta="notes"]');
        const priority = modal.querySelector('select[data-meta="priority"]');

        this.task.notes = notes.value;
        this.task.priority = priority.value;

        console.log(this.task)
    }

    renderAnimations() {
        Animation.animateStatus(this.getNode('status'), this.getNode('indicator'), this.getNode('title'), this.card);
        Animation.animateNewTask(this.card);
    }
}

export {
    Card
}