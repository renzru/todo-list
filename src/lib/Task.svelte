<script lang="ts">
  import type { TaskOBJ } from './TaskOBJ';

  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { getPriorityColor } from './Update';

  export let task: TaskOBJ;

  let dispatch = createEventDispatcher();

  $: priorityColor = getPriorityColor(task.priority);

  function handleKey(event): void {
    if (event.key === 'Escape') {
      event.srcElement.blur();
      dispatch('showModal', task);
    }

    switch (event.key) {
      case 'Escape':
        event.srcElement.blur();
        dispatch('showModal', task);
        break;
      case 'Delete':
        dispatch('remove', task.id);
    }
  }
</script>

<li class="task flex" in:fly={{ x: -100, y: 50, duration: 450 }}>
  <!-- isDone Checkbox -->
  <input bind:checked={task.isDone} on:change={() => dispatch('remove', task.id)} type="checkbox" />

  <!-- Title  -->
  <input
    bind:value={task.title}
    on:keyup={handleKey}
    class="fs-500 text-input"
    placeholder="New Task..."
    type="text" />

  <!-- Priority -->
  {#key task.priority}
    <div
      class="priority fs-500"
      style="background-color: {priorityColor}"
      transition:fade={{ duration: 300 }} />
  {/key}

  <!-- Edit Button -->
  <img on:click={() => dispatch('showModal', task)} class="edit" src="./edit.svg" alt="Edit Task" />
</li>

<style lang="scss">
  .task {
    position: relative;
    align-items: center;
    gap: 1rem;
    height: 2.75rem;
    border-radius: 0.2rem;
    border-bottom: 2px solid var(--bg-light);
    transition: transform 0.45s ease, outline 0.25s ease;

    &:has(:focus) {
      outline: 0.75px solid #97bde5;
    }
    &:hover {
      transform: scale(1.005);
      outline: 0.75px solid #97bde5;
    }
    .edit {
      opacity: 0.35;
      width: 2rem;
      transition: rotate 0.25s ease-in-out;
    }

    input {
      height: 100%;
    }

    input[type='text'] {
      position: relative;
      width: 100%;
    }

    div {
      &.priority {
        position: absolute;
        left: 0;
        z-index: -1;
        width: clamp(1.35rem, 1%, 3rem);
        height: 100%;
        border-radius: 0.2rem 0 0 0.2rem;
        background-color: var(--priority-default);
      }
    }
  }
</style>
