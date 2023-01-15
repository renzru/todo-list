// only returns a new task object
class Task {
  constructor(status, title, description, priority, deadline) {
    this.status = status,
      this.title = title,
      this.description = description,
      this.priority = priority,
      this.deadline = deadline
  }
}

// only returns a new project object
class Project {
  constructor(title) {
    this.title = title
    this.tasks = [];
  }
}

let project = new Project('Home');

// only initializes the new task button
function getNewTaskBtn() {
  const newTaskBtn = document.querySelector(".add-task");

  newTaskBtn.onclick = () => {
    renderTask();
  };
}

// only renders task in DOM
function renderTask() {
  const parent = document.querySelector(".container--tasks");
  const task = newElement('article', 'task', 'flex', 'bg-white');

  const title = createTitle();
  const expand = createExpandBtn();

  const statusParent = createStatus(title);
  const status = statusParent.querySelector('input');

  const detailsParent = createDetails();
  const description = detailsParent.querySelector('textarea[data-info="description"]');

  linkTask(status, title, description);

  task.append(statusParent, title, expand, detailsParent);
  parent.append(task);
}

// only creates title
function createTitle() {
  const title = newElement('input', 'fs-500');
  title.dataset.info = 'title';
  title.placeholder = 'Todo';

  return title;
}

// only creates expand button
function createExpandBtn() {
  const expand = newElement('img', 'expand-icon');
  expand.src = './public/expand.svg';

  return expand;
}

// only creates a status container
function createStatus(title) {
  const status = document.createElement('input');
  status.dataset.info = 'status';
  status.type = 'checkbox';

  const statusIndicator = newElement('div', 'status-indicator');
  statusIndicator.style.backgroundColor = 'var(--status-default)';

  renderStatus(status, statusIndicator, title);

  statusIndicator.append(status);
  return statusIndicator;
}

// only create a details container
function createDetails() {
  const details = newElement('div', 'details');
  const description = document.createElement('textarea');
  description.dataset.info = 'description';

  details.append(description);
  return details;
}

// only for modifying a task's completion status
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


// Utilities

// only links task in DOM to its object
function linkTask(...properties) {
  const taskObj = new Task();
  pushTask(taskObj, project);

  properties.forEach((property) => {
    createTaskListener(property, taskObj);
  });
}

// only for creating a new element
function newElement(tag, ...classes) {
  const element = document.createElement(tag);
  classes.forEach(e => {
    element.classList.add(e);
  })

  return element;
}

// only pushes a task to a specified project
function pushTask(task, project) {
  project.tasks.push(task);
}

// only adds a listener
function createTaskListener(source, obj) {
  source.addEventListener('change', () => {
    obj[source.dataset.info] = source.value;
    console.log(project)
  });
}



getNewTaskBtn();