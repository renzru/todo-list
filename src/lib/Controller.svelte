<script lang="ts">
  import { newProjectOBJ, ProjectOBJ } from './ProjectOBJ';
  import { projectStore } from './store';
  import Sidebar from './Sidebar.svelte';
  import Project from './Project.svelte';
  import ProjectModal from './ProjectModal.svelte';
  import Default from './Default.svelte';
  import Taskbar from './Taskbar.svelte';

  let project: ProjectOBJ;
  let projectStorage: Array<ProjectOBJ>;

  let showProjectModal: boolean = false;
  let isDefault: boolean = false;

  projectStore.subscribe((store) => (projectStorage = store));

  function addProject(): void {
    const project: ProjectOBJ = newProjectOBJ();

    projectStore.update((store) => (store = [...store, project]));
  }

  function reloadDisplay(event): void {
    isDefault = false;
    showProjectModal = false;

    project = event.detail || event;
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
      <!-- Default Page  -->
      <Default />
    {:else}
      <!-- Project Display -->
      <Project bind:project bind:projectStorage bind:showProjectModal on:editProject={refreshStore}>
        <ProjectModal
          slot="edit-project-modal"
          bind:isDefault
          bind:project
          bind:projectStorage
          on:replaceProject={reloadDisplay} />
      </Project>
      <Taskbar bind:project />
    {/if}
    <!-- Add Project Button -->
    <button on:click={addProject}> addproject</button>
  </section>
  <!-- Edit Project Modal -->
</main>

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
