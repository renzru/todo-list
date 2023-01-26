<script lang="ts">
  import Task from './Task.svelte';
</script>

<section class="project grid">
  <Task />
  <Task />
</section>

<style lang="scss">
  .project {
    grid-column: 2;
    gap: 0.2rem;
  }
</style>
