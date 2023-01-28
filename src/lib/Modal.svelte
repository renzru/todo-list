<script lang="ts">
  import type { ProjectOBJ } from './ProjectOBJ';
  import type { TaskOBJ } from './TaskOBJ';
  import { newTaskOBJ } from './TaskOBJ';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  export let meta: TaskOBJ;
  export let show: boolean;
  export let project: ProjectOBJ;
  import { quartOut } from 'svelte/easing';

  const temp: TaskOBJ = newTaskOBJ();

  onMount(() => {
    for (let property in temp) {
      temp[property] = meta[property];
    }
  });

  function save() {
    for (let property in meta) {
      meta[property] = temp[property];
    }
    show = false;
  }
</script>

<div
  class="modal flow grid"
  transition:fly={{ x: 600, opacity: 1, duration: 450, easing: quartOut }}
>
  <div class="modal-directory text-light" />
  <div class="modal-buttons">
    <button class="modal-cancel text-light" on:click={() => (show = false)}>Cancel</button>
    <button class="modal-save" on:click={save}>Save</button>
  </div>
  <div>
    <span class="text-light">Projects\ {project.title}</span>
    <textarea bind:value={temp.title} class="fs-900" />
    <h1 class="fs-500">Notes</h1>
    <textarea placeholder="Notes...✏️" bind:value={temp.notes} />
  </div>
  <div>
    <h2 class="fs-500">Priority</h2>
    <select bind:value={temp.priority}>
      <option value="None">None</option>
      <option value="Important">Important</option>
      <option value="Urgent">Urgent</option>
    </select>
  </div>
</div>

<style lang="scss">
  .modal {
    z-index: 1000;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    grid-auto-rows: min-content;
    width: clamp(10rem, 30vw, 60rem);
    height: 100vh;
    padding-inline: 2rem;
    transform: translateX(0%);
    transition: transform 0.35s ease-in-out;
    box-shadow: 0 0 1px rgb(0, 0, 0, 0.5);

    &-buttons {
      justify-self: end;
    }

    &-cancel {
      background-color: transparent;
      cursor: pointer;
    }

    &-save {
      padding: 0.25rem 0.5rem;
      cursor: pointer;
    }

    textarea,
    select {
      width: 100%;
      border: none;
      outline: none;
    }

    textarea {
      resize: vertical;
      padding-block: 1rem;
      border-bottom: 1px solid var(--clr-light);
    }

    select {
      padding-block: 0.5rem;
    }
  }
</style>
