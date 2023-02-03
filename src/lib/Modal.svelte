<script lang="ts">
  import type { ProjectOBJ } from './ProjectOBJ';
  import type { TaskOBJ } from './TaskOBJ';
  import { newTaskOBJ } from './TaskOBJ';

  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { getPriorityColor } from './Update';

  export let selectedTask: TaskOBJ;
  export let project: ProjectOBJ;
  export let show: boolean;

  const temp: TaskOBJ = newTaskOBJ();
  let dispatch = createEventDispatcher();

  let modal;
  onMount(() => {
    for (let property in temp) {
      temp[property] = selectedTask[property];
    }
  });

  function handleKey(event) {
    switch (event.key) {
      case 'Enter':
        save();
        break;
      case 'Escape':
        cancel();
        break;
    }
  }

  function cancel() {
    show = false;
  }

  function save() {
    for (let property in selectedTask) {
      selectedTask[property] = temp[property];
    }
    show = false;
    dispatch('save');
  }
</script>

<svelte:window on:keydown={handleKey} />
<div
  class="modal flow grid bg-white"
  transition:fly={{ x: 800, opacity: 1, duration: 500, easing: quartOut }}>
  <!-- Action Buttons -->
  <div class="modal-buttons">
    <button class="modal-cancel text-light" on:click={cancel}>Cancel</button>
    <button class="modal-save" on:click={save}>Save</button>
  </div>

  <div>
    <!-- Directory Text -->
    <span class="text-light">Projects\ {project.title}</span>

    <!-- Edit Task Title -->
    <textarea bind:value={temp.title} class="fs-900" />

    <!-- Edit Task Notes -->
    <h1 class="fs-500">Notes</h1>
    <textarea placeholder="Notes...✏️" bind:value={temp.notes} />

    <!-- Edit Task Priority -->
    <span class="flex">
      <h2 class="fs-500">Priority</h2>
      <div class="priority-preview" style="background-color: {getPriorityColor(temp.priority)};" />
    </span>
    <select bind:value={temp.priority}>
      <option value="None">None</option>
      <option value="Normal"> Normal </option>
      <option value="Important">Important</option>
      <option value="Urgent">Urgent</option>
    </select>
  </div>
</div>
<!-- Backdrop for Contrast -->
<div class="backdrop" on:click={cancel} transition:fade={{ duration: 400, easing: quartOut }} />

<style lang="scss">
  span.flex {
    gap: 0.5rem;
    align-items: center;
  }

  .priority-preview {
    aspect-ratio: 1;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
    transition: background 0.25s ease;
  }
  .backdrop {
    content: '';
    position: fixed;
    z-index: 500;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
  }

  .modal {
    z-index: 1000;
    position: fixed;
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
