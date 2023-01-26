<script lang="ts">
  import Task from './Task.svelte';
  import type { ProjectOBJ } from './ProjectOBJ';

  let project: ProjectOBJ = {
    title: 'Home 🏠',
    list: [],
  };
</script>

<section class="project grid">
  <div class="project-heading flex">
    <h1 class="fs-900 bold">{project.title}</h1>
    <button class="add-task">+</button>
  </div>
  <Task {project} />
  <Task {project} />
</section>

<style lang="scss">
  .project {
    grid-column: 2;
    gap: 0.2rem;
  }
</style>
