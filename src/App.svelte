<script lang="ts">
  import { ProjectOBJ } from './lib/ProjectOBJ';
  import { projectStore } from './lib/store';
  import Sidebar from './lib/Sidebar.svelte';
  import Project from './lib/Project.svelte';

  let project: ProjectOBJ;
  let projectStorage: object;
  projectStore.subscribe((store) => (projectStorage = store));

  function newProject() {
    const project: ProjectOBJ = {
      title: 'Untitled',
      list: [],
    };

    projectStore.update((store) => (store = [...store, project]));
  }

  function switchProject(event) {
    project = event.detail;
  }

  // TODO: Fix buggy animations on project switch;
  function refreshStore() {
    // #each blocks don't update on mutation, only on reassignment.
    // This has to be done so the sidebar refreshes on project title edit.
    projectStore.update((store) => (store = store));
  }
</script>

<main class="flex">
  <Sidebar on:loadTask={switchProject} {projectStorage} />
  <Project on:editProject={refreshStore} bind:project />
  <button on:click={newProject} />
</main>

<style lang="scss">
  main {
    justify-content: center;
  }
</style>
