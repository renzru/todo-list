import {
    createImportSpecifier
} from "typescript";
import {
    newElement,
} from "./Utils";


class Template {
    constructor() {
        this.task = newElement('article', 'task', 'flex', 'bg-white'),
            this.parent,
            this.meta = {
                title: Template.createTitle(),
                description: Template.createDescription(),
                status: Template.createStatus()
            }
        this.assets = {
            indicator: Template.createIndicator(),
            expand: Template.createExpand(),
            details: Template.createDetails()
        }
    }

    // Create HTML Elements
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

        return status;
    }

    static createIndicator() {
        const indicator = newElement('div', 'status-indicator');
        indicator.style.backgroundColor = 'var(--status-default)';

        return indicator;
    }

    static createDetails() {
        const details = newElement('div', 'details');

        return details;
    }

    static createDescription() {
        const description = document.createElement('textarea');
        description.dataset.meta = 'description';

        return description
    }

    // Misc. 
    static renderStatus(status, indicator, title) {
        status.addEventListener('change', () => {
            if (status.checked) {
                title.classList.toggle('completed');
                indicator.classList.toggle('status-completed');
            } else {
                title.classList.toggle('completed');
                indicator.classList.toggle('status-completed');
            }

        })
    }

    // Getter Methods
    getTitle() {
        return this.meta.title;
    }

    getStatus() {
        return this.meta.status;
    }

    getDescription() {
        return this.meta.description;
    }

    // Setter Methods
    setTitle(value) {
        this.getTitle().value = value;
    }

    setStatus(value) {
        this.getStatus().checked = value;
    }

    setDescription(value) {
        this.getDescription().value = value;
    }

    setParent(parent) {
        this.parent = document.querySelector(parent);
    }

    // Render in DOM
    render() {
        Template.renderStatus(this.meta.status, this.assets.indicator, this.meta.title);

        this.assets.indicator.append(this.getStatus());
        this.assets.details.append(this.getDescription());

        this.task.append(this.assets.indicator, this.meta.title, this.assets.expand, this.assets.details);
        this.parent.append(this.task);
    }
}

export {
    Template
}