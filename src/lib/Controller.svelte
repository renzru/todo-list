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

  function switchProject(event): void {
    const selectedProject: ProjectOBJ = event.detail;
    isDefault = false;

    project = selectedProject;
  }

  function deleteProject(event): void {
    const projectID: string = event.detail;
    const index: number = getProjectIndex(projectID);

    projectStore.update((store) => (store = store.filter((project) => project.id !== projectID)));
    replaceProject(index);
  }

  function replaceProject(index: number): void {
    const validReplacement: ProjectOBJ = projectStorage[index - 1] || projectStorage[0];

    if (validReplacement) {
      switchProject({ detail: validReplacement });
    } else {
      isDefault = true;
    }
  }

  function getProjectIndex(targetID: string): number {
    const index: number = projectStorage.findIndex((project) => project.id === targetID);

    return index;
  }

  function refreshStore(): void {
    projectStore.update((store) => (store = store));
  }
</script>

<!-- Sidebar -->
<Sidebar on:switchProject={switchProject} {projectStorage} />

<!-- Main Grid -->
<main class="grid">
  <!-- Project -->
  <section class="flow">
    {#if isDefault}
      <Default />
    {:else}
      <Project bind:project on:editProject={refreshStore} on:deleteProject={deleteProject} />
      <Taskbar bind:project />
      <button on:click={addProject}> addproject</button>
    {/if}
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
