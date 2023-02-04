<script lang="ts">
  import { newProjectOBJ, ProjectOBJ } from './ProjectOBJ';
  import { newTaskOBJ, TaskOBJ } from './TaskOBJ';
  import { createEventDispatcher } from 'svelte';
  import { projectStore } from './store';
  import Modal from './Modal.svelte';
  import Task from './Task.svelte';

  export let project: ProjectOBJ = newProjectOBJ();
  export let projectStorage: Array<ProjectOBJ>;
  export let showProjectModal: boolean;

  let selectedTask: TaskOBJ;
  let show: boolean = false;

  const dispatch = createEventDispatcher();

  projectStore.subscribe((store) => (projectStorage = store));

  function addTask(): void {
    project.list = [...project.list, newTaskOBJ()];
  }

  function removeTask(event): void {
    const taskID: string = event.detail;

    project.list = project.list.filter((task) => task.id !== taskID);
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
    <img src="./edit.svg" on:click={() => (showProjectModal = !showProjectModal)} />
    {#if showProjectModal}
      <slot name="edit-project-modal" />
    {/if}
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
      justify-content: space-between;
      align-items: center;
      padding-bottom: 2rem;
      margin-block: 3rem 2rem;
      border-bottom: 2px solid var(--bg-light);

      input {
        width: 100%;
      }

      button {
        height: 60%;
      }
    }
  }

  @media (min-width: 40em) {
    .project-header {
      position: relative;
    }
  }
</style>
