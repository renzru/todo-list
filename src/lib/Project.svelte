<script lang="ts">
  import Task from './Task.svelte';
  import Modal from './Modal.svelte';

  let activeTask: HTMLElement;

  const setActiveTask = (task: HTMLElement) => {
    activeTask = task;
  };
</script>

<section class="project grid">
  <Task {setActiveTask} />
  <Modal {activeTask} />
</section>

<style lang="scss">
  .project {
    grid-column: 2;
    gap: 0.2rem;
  }
</style>
