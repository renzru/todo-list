<script lang="ts">
  import { newProjectOBJ, ProjectOBJ } from './ProjectOBJ';
  import { newTaskOBJ, TaskOBJ } from './TaskOBJ';
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  import Task from './Task.svelte';

  export let project: ProjectOBJ = newProjectOBJ();

  let selectedTask: TaskOBJ;
  let show: boolean = false;

  const dispatch = createEventDispatcher();

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

  function showModal(event): void {
    show = !show;
    selectedTask = event.detail;
  }

  function refresh(): void {
    project.list = project.list;
  }
</script>

<section class="project grid">
  <!-- Project Header -->
  <div class="project-header flex">
    <!-- Project Title -->
    <input
      class="fs-600 medium text-input"
      on:change={() => dispatch('editProject', project)}
      bind:value={project.title}
      type="text"
      placeholder="Untitled..." />
    <!-- Add Task Button -->
    <button class="add-task-btn" on:click={addTask} />
    <!-- Edit Project Modal -->
    <ul class="edit-project-modal fs-default flow grid bg-white">
      <li class="list-style-1">Rename</li>
      <li class="list-style-1" on:click={clearTasks}>Clear</li>
      <li class="list-style-1" on:click={() => dispatch('deleteProject', project.id)}>Delete</li>
    </ul>
  </div>

  <!-- Tasks -->
  {#each project.list as task}
    <Task bind:task on:remove={removeTask} on:showModal={showModal} />
  {/each}
</section>

{#if show}
  <Modal bind:selectedTask bind:show {project} on:save={refresh} />
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
