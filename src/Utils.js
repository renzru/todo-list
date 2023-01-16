function newElement(tag, ...classes) {
    const element = document.createElement(tag);
    classes.forEach(e => {
        element.classList.add(e);
    })

    return element;
}

function renderStatus(status, indicator, title) {
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

function renderTask(task) {
    task.appendContent();
}

function pushTask(task, project) {
    project.tasks.push(task);
}

export {
    renderStatus,
    renderTask,
    pushTask,
    newElement
};