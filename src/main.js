class Task {
  constructor() {
    this.status;
    this.title;
    this.description;
    this.priority;
    this.deadline;
  }
}
class Project {
  constructor(title) {
    this.title = title
    this.tasks = [];
  }
}

let project = new Project('Home');


function getNewTaskBtn() {
  const newTaskBtn = document.querySelector(".add-task");

  newTaskBtn.onclick = () => {
    createDOMTask();
  };
}

// class DOMTask {

//   constructor() {
//     this.task = newElement('article', 'task', 'flex', 'bg-white');
//     this.meta = {};
//     this.elements = {};
//   }

//   static setParent(parent) {
//     this.elements.parent = document.querySelector(parent);
//   }

//   static appendContent() {
//     this.task.append(this.elements.indicator, this.meta.title, this.elements.expand, this.elements.details);
//     this.elements.parent.append(this.task);
//   }

//   static createTitle() {
//     const title = newElement('input', 'fs-500');
//     title.dataset.meta = 'title';
//     title.placeholder = 'Todo';

//     this.meta.title = title;
//   }

//   static createExpand() {
//     const expand = newElement('img', 'expand-icon');
//     expand.src = './public/expand.svg';

//     this.elements.expand = expand;
//   }

//   static createStatus(title) {
//     const status = document.createElement('input');
//     status.dataset.meta = 'status';
//     status.type = 'checkbox';

//     const indicator = newElement('div', 'status-indicator');
//     indicator.style.backgroundColor = 'var(--status-default)';

//     renderStatus(status, indicator, title);
//     indicator.append(status);

//     this.meta.status = status;
//     this.elements.indicator = indicator;
//   }

//   static createDetails() {
//     const description = document.createElement('textarea');
//     description.dataset.meta = 'description';

//     const details = newElement('div', 'details');
//     details.append(description);

//     this.meta.description = description;
//     this.elements.details = details;
//   }
// }

class DOMTask {

  constructor() {
    this.task = newElement('article', 'task', 'flex', 'bg-white');
    this.meta = {};
    this.elements = {};
  }

  static setParent(parent) {
    return document.querySelector(parent);
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

function createDOMTask() {
  const task = new DOMTask();

  task.elements.parent = DOMTask.setParent('.container--tasks');
  task.meta.title = DOMTask.createTitle();
  task.elements.expand = DOMTask.createExpand();

  task.elements.indicator = DOMTask.createStatus(task.meta.title);
  task.meta.status = task.getStatus();

  task.elements.details = DOMTask.createDetails();
  task.meta.description = task.getDescription();

  console.log(task)
  createTask(task.meta.status, task.meta.title, task.meta.description);
  renderDOMTask(task);
}

function renderDOMTask(task) {
  task.appendContent();
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

function createTask(...properties) {
  const task = new Task();
  pushTask(task, project);

  properties.forEach((property) => {
    linkData(property, task);
  });
}

function pushTask(task, project) {
  project.tasks.push(task);
}

function linkData(DOMsource, obj) {
  if (DOMsource.type === 'checkbox') {
    DOMsource.addEventListener('change', () => {
      obj[DOMsource.dataset.meta] = DOMsource.checked;
    });
  } else {
    DOMsource.addEventListener('change', () => {
      obj[DOMsource.dataset.meta] = DOMsource.value;
    });
  }
}

// Utilities

function newElement(tag, ...classes) {
  const element = document.createElement(tag);
  classes.forEach(e => {
    element.classList.add(e);
  })

  return element;
}


getNewTaskBtn();







// // only renders task in DOM
// function renderTask() {
//   const parent = document.querySelector(".container--tasks");
//   const task = newElement('article', 'task', 'flex', 'bg-white');

//   const title = createTitle();
//   const expand = createExpand();

//   const statusParent = createStatus(title);
//   const status = statusParent.querySelector('input');

//   const detailsParent = createDetails();
//   const description = detailsParent.querySelector('textarea[data-info="description"]');

//   linkTask(status, title, description);

//   task.append(statusParent, title, expand, detailsParent);
//   parent.append(task);
// }

// // only creates title
// function createTitle() {
//   const title = newElement('input', 'fs-500');
//   title.dataset.meta = 'title';
//   title.placeholder = 'Todo';

//   return title;
// }

// // only creates expand button
// function createExpand() {
//   const expand = newElement('img', 'expand-icon');
//   expand.src = './public/expand.svg';

//   return expand;
// }

// // only creates a status container
// function createStatus(title) {
//   const status = document.createElement('input');
//   status.dataset.meta = 'status';
//   status.type = 'checkbox';

//   const statusIndicator = newElement('div', 'status-indicator');
//   statusIndicator.style.backgroundColor = 'var(--status-default)';

//   renderStatus(status, statusIndicator, title);

//   statusIndicator.append(status);
//   return statusIndicator;
// }

// // only create a details container
// function createDetails() {
//   const details = newElement('div', 'details');
//   const description = document.createElement('textarea');
//   description.dataset.meta = 'description';

//   details.append(description);
//   return details;
// }