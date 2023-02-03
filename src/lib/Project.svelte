<script lang="ts">
  import { newProjectOBJ, ProjectOBJ } from './ProjectOBJ';
  import { newTaskOBJ, TaskOBJ } from './TaskOBJ';
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  import Task from './Task.svelte';
  import { projectStore } from './store';

  export let project: ProjectOBJ = newProjectOBJ();
  export let projectStorage: Array<ProjectOBJ>;
  let selectedTask: TaskOBJ;
  let show: boolean = false;

  const dispatch = createEventDispatcher();

  projectStore.subscribe((store) => (projectStorage = store));

  function deleteProject(): void {
    const index: number = getProjectIndex(project.id);

    projectStore.update(
      (store) => (store = store.filter((_project) => _project.id !== project.id)),
    );

    findReplacement(index);
  }

  // Finds a project to display in place of the last deleted projec
  function findReplacement(index: number): void {
    const replacement: ProjectOBJ = projectStorage[index - 1] || projectStorage[0];

    if (replacement) {
      dispatch('replaceProject', replacement);
    } else {
      dispatch('noProjects');
    }
  }

  function getProjectIndex(targetID: string): number {
    const index: number = projectStorage.findIndex((_project) => _project.id === targetID);

    return index;
  }

  function addTask(): void {
    project.list = [...project.list, newTaskOBJ()];
  }

  function removeTask(event): void {
    const taskID: string = event.detail;

    project.list = project.list.filter((task) => task.id !== taskID);
  }

  function clearTasks(): void {
    project.list = [];
  }

  function refreshList(): void {
    project.list = project.list;
  }

  function showModal(event): void {
    show = !show;
    selectedTask = event.detail;
  }
</script>

<section class="project grid">
  <!-- Project Header -->
  <div class="project-header flex">
    <!-- Project Title -->
    <input
      class="fs-600 medium text-input"
      on:change={() => dispatch('editProject')}
      bind:value={project.title}
      type="text"
      placeholder="Untitled..." />
    <!-- Add Task Button -->
    <button class="add-task-btn" on:click={addTask} />
    <!-- Edit Project Modal -->
    <ul class="edit-project-modal fs-default flow grid bg-white">
      <li class="list-style-1">Rename</li>
      <li class="list-style-1" on:click={clearTasks}>Clear</li>
      <li class="list-style-1" on:click={deleteProject}>Delete</li>
    </ul>
  </div>

  <!-- Tasks -->
  {#each project.list as task}
    <Task bind:task on:remove={removeTask} on:showModal={showModal} />
  {/each}
</section>

{#if show}
  <Modal bind:selectedTask bind:show {project} on:save={refreshList} />
{/if}

<style lang="scss">
  // TODO: Add clear all tasks button and delete project button

  .project {
    grid-auto-rows: min-content;
    justify-self: center;
    gap: 0.2rem;

    &-header {
      position: relative;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 2rem;
      margin-block: 3rem 2rem;
      border-bottom: 2px solid var(--bg-light);

      .edit-project-modal {
        --flow-margin: 0.25rem;
        position: absolute;
        right: 0;
        justify-items: left;
        padding-block: 1rem;
        grid-auto-rows: min-content;
        border-radius: 0.3rem;
        box-shadow: 0 0 1px rgb(0, 0, 0, 0.65);

        li {
          padding-inline: 0.5rem 4rem;
        }
      }
      input {
        width: 100%;
      }

      button {
        height: 60%;
      }
    }
  }
</style>
