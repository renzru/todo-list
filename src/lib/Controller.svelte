<script lang="ts">
  import { newProjectOBJ, ProjectOBJ } from './ProjectOBJ';
  import { projectStore } from './store';
  import Sidebar from './Sidebar.svelte';
  import Project from './Project.svelte';
  import Default from './Default.svelte';
  import Taskbar from './Taskbar.svelte';

  let project: ProjectOBJ;
  let projectStorage: Array<ProjectOBJ>;
  let isDefault: boolean = false;

  projectStore.subscribe((store) => (projectStorage = store));

  function addProject(): void {
    const project: ProjectOBJ = newProjectOBJ();

    projectStore.update((store) => (store = [...store, project]));
  }

  function reloadDisplay(event): void {
    isDefault = false;
    project = event.detail;
  }

  function refreshStore(): void {
    projectStore.update((store) => (store = store));
  }
</script>

<!-- Sidebar -->
<Sidebar on:switchProject={reloadDisplay} bind:projectStorage />

<!-- Main Grid -->
<main class="grid">
  <!-- Project -->
  <section class="flow">
    {#if isDefault}
      <Default />
    {:else}
      <Project
        bind:project
        bind:projectStorage
        on:editProject={refreshStore}
        on:replaceProject={reloadDisplay}
        on:noProjects={() => (isDefault = true)} />
      <Taskbar bind:project />
    {/if}
    <button on:click={addProject}> addproject</button>
  </section>
</main>
<button on:click={addProject} />

<style lang="scss">
  main {
    grid-template-columns: minmax(2rem, 1fr) clamp(20rem, 40vw, 40rem) minmax(2rem, 1fr);
    grid-template-areas: '. project .';
    justify-content: center;

    section {
      grid-area: project;
    }
  }
</style>
