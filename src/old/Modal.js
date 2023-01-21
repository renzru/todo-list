import {
    nodeModuleNameResolver
} from "typescript";

class Modal {
    static initialize(modal, source) {
        modal.querySelector('textarea[data-meta="notes"]').value = source.notes;
        modal.querySelector('select[data-meta="priority"]').value = source.priority;
    }

    static reset(modal) {
        modal.querySelector('textarea[data-meta="notes"]').value = '';
        modal.querySelector('select[data-meta="priority"]').value = '';
    }

    static show(modal) {
        modal.style.transform = 'translateX(0)';
    }

    static hide(modal) {
        modal.style.transform = 'translateX(100%)';
    }
}

export {
    Modal
}