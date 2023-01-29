<script lang="ts">
  import Project from './lib/Project.svelte';
  import Sidebar from './lib/Sidebar.svelte';
</script>

<main class="flex">
  <Sidebar />
  <Project />
</main>

<style lang="scss">
  main {
    justify-content: center;
  }
</style>
