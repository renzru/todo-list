<script lang="ts">
  import Project from './lib/Project.svelte';
</script>

<main>
  <Project />
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: minmax(2rem, 1fr) minmax(0, 40rem) minmax(2rem, 1fr);
  }
</style>
