<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ProjectOBJ } from './ProjectOBJ';
  import { projectStore } from './store';

  export let project: ProjectOBJ;
  export let projectStorage: Array<ProjectOBJ>;
  export let isDefault: boolean;

  const dispatch = createEventDispatcher();

  function clearTasks(): void {
    project.list = [];
  }

  function deleteProject(): void {
    const index: number = getProjectIndex(project.id);

    projectStore.update(
      (store) => (store = store.filter((_project) => _project.id !== project.id)),
    );

    findReplacement(index);
  }

  function getProjectIndex(targetID: string): number {
    const index: number = projectStorage.findIndex((_project) => _project.id === targetID);

    return index;
  }

  // Finds a project to display in place of the last deleted project
  function findReplacement(index: number): void {
    const replacement: ProjectOBJ = projectStorage[index - 1] || projectStorage[0];

    if (replacement) dispatch('replaceProject', replacement);
    else isDefault = true;
  }
</script>

<ul class="edit-project-modal fs-default flow grid bg-white">
  <li class="list-style-1">Rename</li>
  <li class="list-style-1" on:click={clearTasks}>Clear</li>
  <li class="list-style-1" on:click={deleteProject}>Delete</li>
</ul>

<style lang="scss">
  .edit-project-modal {
    --flow-margin: 0.25rem;
    justify-items: left;
    margin: 0;
    padding-block: 1rem;
    box-shadow: 0 0 1px rgb(0, 0, 0, 0.5);

    li {
      padding-inline: 0.5rem 4rem;
    }
  }

  @media (max-width: 30em) {
    .edit-project-modal {
      position: fixed;
      z-index: 2000;
      bottom: 0;
      left: 0;
      width: 100%;
      right: -10rem;
    }
  }
  @media (min-width: 40em) {
    .edit-project-modal {
      position: absolute;
      width: unset;
      border-radius: 0.3rem;
      right: -10rem;
    }
  }
</style>
