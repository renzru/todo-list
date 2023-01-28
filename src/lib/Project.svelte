<script lang="ts">
  import type { ProjectOBJ } from './ProjectOBJ';
  import { newTaskOBJ } from './TaskOBJ';
  import Task from './Task.svelte';

  let project: ProjectOBJ = {
    title: 'Home ',
    list: [],
  };

  $: console.log(project.list);

  function addTask() {
    project.list = [...project.list, newTaskOBJ()];
  }

  function removeTask(event) {
    project.list = project.list.filter((task) => task.id !== event.detail);
  }
</script>

<section class="project grid">
  <!-- Project Header -->
  <div class="project-header flex">
    <h1 class="fs-900 bold">{project.title}</h1>
    <button class="add-task" on:click={addTask}>+</button>
  </div>

  <!-- Tasks -->
  {#each project.list as task}
    <Task {project} bind:meta={task} on:remove={removeTask} />
  {/each}
</section>

<style lang="scss">
  .project {
    grid-column: 2;
    gap: 0.2rem;

    &-header {
      align-items: center;
      gap: 1.5rem;
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
