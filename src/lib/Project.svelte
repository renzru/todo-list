<script lang="ts">
  import type { ProjectOBJ } from './ProjectOBJ';
  import { newTaskOBJ, TaskOBJ } from './TaskOBJ';
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  import Task from './Task.svelte';

  export let project: ProjectOBJ = {
    title: 'Home ',
    list: [],
  };

  const dispatch = createEventDispatcher();

  export let temp = newTaskOBJ();
  function addTask() {
    project.list = [...project.list, newTaskOBJ()];
  }

  function removeTask(event) {
    project.list = project.list.filter((task) => task.id !== event.detail);
  }

  let currentMeta: TaskOBJ;
  let show: boolean = false;

  function showModal(event) {
    show = !show;
    currentMeta = event.detail;
  }

  function refresh() {
    project.list = project.list;
  }
</script>

<section class="project grid">
  <!-- Project Header -->
  <div class="project-header flex">
    <input
      class="fs-600 medium text-input"
      on:change={dispatch('editProject', project)}
      bind:value={project.title}
      type="text"
      placeholder="Untitled..."
    />
    <button class="add-task" on:click={addTask}>+</button>
  </div>

  <!-- Tasks -->
  {#each project.list as task}
    <Task {project} bind:meta={task} on:remove={removeTask} on:showModal={showModal} />
  {/each}
</section>

{#if show}
  <Modal bind:currentMeta bind:show {project} on:save={refresh} />
{/if}

<style lang="scss">
  ::placeholder {
    color: var(--clr-light);
  }

  .project {
    grid-auto-rows: min-content;
    justify-self: center;
    gap: 0.2rem;

    &-header {
      align-items: center;
      justify-content: space-between;
      margin-block: 3rem 2rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid var(--bg-light);

      .add-task {
        padding: 0;
        height: 60%;
        border-radius: 0.2rem;
        aspect-ratio: 1;
      }
    }
  }
</style>
