<script lang="ts">
  import type { ProjectOBJ } from './ProjectOBJ';
  import type { TaskOBJ } from './TaskOBJ';

  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { Animate } from './Animate';

  export let project: ProjectOBJ;
  export let meta: TaskOBJ;

  let dispatch = createEventDispatcher();

  $: priorityColor = Animate.swapPriority(meta.priority);
</script>

<li class="task flex" in:fly={{ x: -100, y: 50, duration: 450 }}>
  <!-- isDone Checkbox -->
  <input bind:checked={meta.isDone} on:change={() => dispatch('remove', meta.id)} type="checkbox" />

  <!-- Title  -->
  <input bind:value={meta.title} class="fs-500 text-input" type="text" placeholder="New Task..." />

  <!-- Priority -->
  {#key meta.priority}
    <div
      class="priority fs-500"
      style="background-color: {priorityColor}"
      transition:fade={{ duration: 300 }}
    />
  {/key}

  <!-- Remove Button
  <button on:click={() => dispatch('remove', meta.id)}>X</button> -->
  <!-- Edit Button -->
  <img on:click={() => dispatch('showModal', meta)} class="edit" src="./edit.svg" alt="Edit Task" />
</li>

<style lang="scss">
  ::placeholder {
    color: var(--clr-light);
  }

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
