<script lang="ts">
  import { ProjectOBJ } from './lib/ProjectOBJ';
  import { projectStore } from './lib/store';
  import Sidebar from './lib/Sidebar.svelte';
  import Project from './lib/Project.svelte';
  import { newTaskOBJ, TaskOBJ } from './lib/TaskOBJ';

  let project: ProjectOBJ;
  let projectStorage: object;
  const temp: TaskOBJ = newTaskOBJ();

  projectStore.subscribe((store) => (projectStorage = store));

  function addProject() {
    const project: ProjectOBJ = {
      title: '',
      list: [],
    };

    projectStore.update((store) => (store = [...store, project]));
  }

  function handleKey(event) {
    switch (event.key) {
      case 'Enter':
        addTask();
        break;
      default:
        return;
    }
  }

  function addTask() {
    const _temp: TaskOBJ = newTaskOBJ();
    _temp.title = temp.title;
    project.list = [...project.list, _temp];
  }

  function switchProject(event) {
    project = event.detail;
  }

  // TODO: Fix buggy animations on project switch;
  // TODO: Fix inconsistent box shadows on zoom;

  function refreshStore() {
    // #each blocks don't update on mutation, only on reassignment.
    // This has to be done so the sidebar refreshes on project title edit.
    projectStore.update((store) => (store = store));
  }
</script>

<!-- Sidebar -->
<Sidebar on:loadTask={switchProject} {projectStorage} />

<!-- Main Grid -->
<main class="grid">
  <!-- Project -->
  <section class="flow">
    <Project on:editProject={refreshStore} bind:project />

    <!-- Add Task -->
    <div class="add-task-container flex">
      <button on:click={addTask} />
      <input
        bind:value={temp.title}
        on:keydown={handleKey}
        placeholder="Add Task"
        class="add-task-input text-input"
        type="text"
      />
    </div>
  </section>
</main>
<button on:click={addProject} />

<style lang="scss">
  $add-task-shadow: 0 0 1px rgb(0, 0, 0, 0.65);
  $add-task-radius: 5px;
  $container-width: clamp(20rem, 40vw, 40rem);

  .add-task-container {
    position: static;
    gap: clamp(0.25rem, 5vw, 1rem);
    width: $container-width;
    background-color: white;

    input {
      width: 100%;
      height: 2.5rem;
      padding-inline: 1.25rem;
      box-shadow: $add-task-shadow;
      border-radius: $add-task-radius;
    }

    button {
      aspect-ratio: 1;
      width: 1rem;
      height: 1rem;
      padding: 1.25rem;
      box-shadow: $add-task-shadow;
      border-radius: $add-task-radius;
      background: url(./add.svg) no-repeat center;
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
