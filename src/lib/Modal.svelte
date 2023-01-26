<script lang="ts">
  import { onMount } from 'svelte';
  import type { TaskOBJ } from './TaskOBJ';
  import { newTaskOBJ } from './TaskOBJ';
  export let meta: TaskOBJ;
  export let show: boolean;

  const temp: TaskOBJ = newTaskOBJ();

  onMount(() => {
    temp.title = meta.title;
    temp.notes = meta.notes;
    temp.priority = meta.priority;
  });

  function save() {
    show = false;
    meta.title = temp.title;
    meta.notes = temp.notes;
    meta.priority = temp.priority;
  }
</script>

<div class="modal flow grid">
  <div class="modal-buttons">
    <button class="modal-cancel text-light" on:click={() => (show = false)}>Cancel</button>
    <button class="modal-save" on:click={save}>Save</button>
  </div>
  <div>
    <textarea bind:value={temp.title} class="fs-900" />
    <h1 class="fs-500">Notes</h1>
    <textarea placeholder="Notes..." bind:value={temp.notes} />
  </div>
  <div>
    <h2 class="fs-500">Priority</h2>
    <select bind:value={temp.priority}>
      <option value="None">None</option>
      <option value="Normal">Normal</option>
      <option value="Urgent">Urgent</option>
      <option value="Important">Important</option>
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
    padding: 2rem;
    background-color: white;
    transform: translateX(0%);
    transition: transform 0.35s ease-in-out;
    box-shadow: 0 0 1px rgb(0, 0, 0, 0.5);

    &-buttons {
      justify-self: end;
      right: 2rem;
      top: 2rem;
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
      border-bottom: 1px solid $clr-light;
    }

    select {
      padding-block: 0.5rem;
    }
  }
</style>
