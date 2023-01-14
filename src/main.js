// only returns a new task object
class Task {
  constructor(title, description, priority, deadline) {
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
  const parent = document.querySelector(".tasks-container");
  const task = newElement('article', 'task', 'flex');

  const status = document.createElement('input');
  status.dataset.info = 'status';
  status.type = 'checkbox';

  const title = newElement('input', 'fs-500');
  title.dataset.info = 'title';
  title.placeholder = 'Todo';

  const details = document.createElement('div');

  const description = document.createElement('textarea');
  description.dataset.info = 'description';

  renderTaskStatus(status, title);
  linkTask(title, description);

  details.append(description);
  task.append(status, title, details);

  parent.append(task);
}

function renderTaskStatus(status, title) {
  status.addEventListener('change', () => {
    if (status.checked) {
      title.classList.toggle('completed');
    } else {
      title.classList.toggle('completed');
    }
  })
}

// only for creating a new element
function newElement(tag, ...classes) {
  const element = document.createElement(tag);
  classes.forEach(e => {
    element.classList.add(e);
  })

  return element;
}

// only links task in DOM to its object
function linkTask(...properties) {
  const taskObj = new Task();
  pushTask(taskObj, project);

  properties.forEach((property) => {
    createTaskListener(property, taskObj);
  });
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