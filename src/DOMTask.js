import {
    newElement,
    renderStatus,
} from "./Utils";

class DOMTask {
    constructor() {
        this.task = newElement('article', 'task', 'flex', 'bg-white');
        this.meta = {};
        this.elements = {};
    }

    static createTitle() {
        const title = newElement('input', 'fs-500');
        title.dataset.meta = 'title';
        title.placeholder = 'Todo';

        return title
    }

    static createExpand() {
        const expand = newElement('img', 'expand-icon');
        expand.src = './public/expand.svg';

        return expand
    }

    static createStatus(title) {
        const status = document.createElement('input');
        status.dataset.meta = 'status';
        status.type = 'checkbox';

        const indicator = newElement('div', 'status-indicator');
        indicator.style.backgroundColor = 'var(--status-default)';

        renderStatus(status, indicator, title);
        indicator.append(status);

        return indicator;
    }

    static createDetails() {
        const description = document.createElement('textarea');
        description.dataset.meta = 'description';

        const details = newElement('div', 'details');
        details.append(description);

        return details;
    }

    static setParent(parent) {
        return document.querySelector(parent);
    }

    appendContent() {
        this.task.append(this.elements.indicator, this.meta.title, this.elements.expand, this.elements.details);
        this.elements.parent.append(this.task);
    }

    getStatus() {
        return this.elements.indicator.querySelector('input[data-meta="status"');
    }

    getDescription() {
        return this.elements.details.querySelector('textarea[data-meta="description"');
    }
}

export {
    DOMTask
}