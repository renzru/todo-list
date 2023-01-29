<script lang="ts">
  import Project from './lib/Project.svelte';
  import Sidebar from './lib/Sidebar.svelte';
</script>

<main>
  <Sidebar />
  <Project />
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: minmax(2rem, 1fr) 40rem minmax(2rem, 1fr);
    grid-template-areas: '. project .';
  }
</style>
