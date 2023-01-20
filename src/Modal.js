import {
    newElement,
} from "./Utils";

class Modal {

    static createDetails() {
        const details = newElement('div', 'modal');
        details.ariaHidden = 'true';

        return details;
    }

    static createNotes() {
        const notes = document.createElement('textarea');
        notes.dataset.meta = 'description';
        notes.placeholder = 'Write a description';

        return notes;
    }

    static createModal() {
        const details = Modal.createDetails()
        const notes = Modal.createNotes();

        details.append(notes);
        return details;
    }

    setProperty(property, value) {
        this[property] = value;
    }

    getProperty(property) {
        return this[property];
    }
}

export {
    Modal
}