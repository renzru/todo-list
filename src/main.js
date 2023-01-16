import {
  DOMTask
} from "./DOMTask";

import {
  Task
} from "./Task"

import {
  Project
} from "./Project"

import {
  renderStatus,
  renderTask,
  pushTask,
  newElement
} from "./Utils"

let project = new Project('Home');

function getTaskButton() {
  const button = document.querySelector(".add-task");

  button.onclick = () => createTask();
}

function createTask() {
  const task = new Task();
  const taskDOM = new DOMTask();

  createDOMTask(taskDOM);
  linkData(task, taskDOM.meta);
  pushTask(task, project);

  renderTask(taskDOM)
}

function linkData(task, meta) {
  const properties = [meta.title, meta.status, meta.description];

  properties.forEach(property => {
    property.addEventListener('change', () => {
      console.log(project);
      task[property.dataset.meta] = property.value;
    });
  });
}

function createDOMTask(task) {
  const elements = task.elements;
  const meta = task.meta;

  elements.parent = DOMTask.setParent('.container--tasks');
  elements.expand = DOMTask.createExpand();
  meta.title = DOMTask.createTitle();

  elements.indicator = DOMTask.createStatus(meta.title);
  meta.status = task.getStatus();

  elements.details = DOMTask.createDetails();
  meta.description = task.getDescription();
}

getTaskButton();