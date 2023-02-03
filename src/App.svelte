<script lang="ts">
  import { ProjectOBJ } from './lib/ProjectOBJ';
  import { projectStore } from './lib/store';
  import Sidebar from './lib/Sidebar.svelte';
  import Project from './lib/Project.svelte';
  import { newTaskOBJ, TaskOBJ } from './lib/TaskOBJ';
  import Default from './lib/Default.svelte';

  let project: ProjectOBJ;
  let projectStorage: Array<ProjectOBJ>;
  let isDefault: boolean = false;

  const temp: TaskOBJ = newTaskOBJ();

  projectStore.subscribe((store) => (projectStorage = store));

  function addProject(): void {
    const project: ProjectOBJ = {
      title: '',
      list: [],
      id: (Math.random() * Date.now()).toString(32).substring(0, 8),
    };

    projectStore.update((store) => (store = [...store, project]));
  }

  function handleKey(event): void {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  function addTask(): void {
    const _temp: TaskOBJ = newTaskOBJ();
    _temp.title = temp.title;

    project.list = [...project.list, _temp];
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

  // TODO: Fix buggy animations on project switch;
  // TODO: Fix inconsistent box shadows on zoom;

  function refreshStore(): void {
    projectStore.update((store) => (store = store));
  }
</script>

<!-- Sidebar -->
<Sidebar on:loadTask={switchProject} {projectStorage} />

<!-- Main Grid -->
<main class="grid">
  <!-- Project -->
  <section class="flow">
    {#if isDefault}
      <Default />
    {:else}
      <Project on:editProject={refreshStore} on:deleteProject={deleteProject} bind:project />
      <button on:click={addProject}> addproject</button>
      <!-- Add Task -->
      <div class="add-task-container flex">
        <!-- Button -->

        <button class="add-task-btn" on:click={addTask} />
        <!-- Text Input -->
        <input
          bind:value={temp.title}
          on:keydown={handleKey}
          class="add-task-input text-input"
          placeholder="Add Task"
          type="text" />
      </div>
    {/if}
  </section>
</main>
<button on:click={addProject} />

<style lang="scss">
  $add-task-shadow: 0 0 1px rgb(0, 0, 0, 0.65);
  $add-task-radius: 5px;
  $container-width: clamp(20rem, 40vw, 40rem);

  .add-task-container {
    position: relative;
    align-items: center;
    gap: clamp(0.25rem, 5vw, 1rem);
    width: $container-width;
    background-color: white;

    input {
      width: 100%;
      height: 2.5rem;
      padding-inline: 2.5rem;
      box-shadow: $add-task-shadow;
      border-radius: $add-task-radius;
    }

    button {
      position: absolute;
      left: 0;
      width: 1.35rem;
      margin-left: 0.5rem;
      margin-block: auto;
    }
  }

  @media (min-width: 40em) {
    .add-task-container {
      position: fixed;
      bottom: 1rem;
    }
  }

  main {
    grid-template-columns: minmax(2rem, 1fr) clamp(20rem, 40vw, 40rem) minmax(2rem, 1fr);
    grid-template-areas: '. project .';
    justify-content: center;

    section {
      grid-area: project;
    }
  }
</style>
