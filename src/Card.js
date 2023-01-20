import {
    newElement,
} from "./Utils";

import {
    Animation
} from "./Animation"

class Card {
    constructor() {
        this.card = newElement('article', 'task', 'flex', 'bg-white'),
            this.task,
            this.parent,
            this.assets = {
                title: Card.createTitle(),
                status: Card.createStatus(),
                indicator: Card.createIndicator(),
                expand: Card.createExpand()
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
        expand.ariaHidden = 'true';

        return expand
    }

    static createStatus() {
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
        this.getNode('indicator').append(this.getNode('status'));

        this.card.append(this.getNode('indicator'), this.getNode('title'), this.getNode('expand'));
        this.parent.append(this.card);

        this.syncModalView();
        this.syncModalData();
        this.renderAnimations();
    }

    syncModalView() {
        const modal = document.querySelector('.modal');

        this.getNode('expand').addEventListener('click', () => {
            if (modal.ariaHidden === 'true') {
                modal.ariaHidden = 'false';
            } else {
                modal.ariaHidden = 'true';
            }
        })
    }

    syncModalData() {
        const modal = document.querySelector('.modal');
        const description = modal.querySelector('textarea[data-meta="description"]');

        // TODO: make it so that the task's values update on button submit, not on value change
        description.addEventListener('change', () => {
            this.task.setProperty('description', description.value);
            this.getNode('title').value = description.value;
        })
    }

    renderAnimations() {
        Animation.animateStatus(this.getNode('status'), this.getNode('indicator'), this.getNode('title'), this.card);
        Animation.animateNewTask(this.card);
        // Animation.animateDetails(this.getNode(expand), this.assets.details);
    }
}

export {
    Card
}