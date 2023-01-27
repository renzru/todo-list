<script lang="ts">
  import type { TaskOBJ } from './TaskOBJ';
  import type { ProjectOBJ } from './ProjectOBJ';
  import { fly } from 'svelte/transition';
  import { newTaskOBJ } from './TaskOBJ';
  import { Update } from './Update';
  import Modal from './Modal.svelte';

  export let project: ProjectOBJ;
  let meta: TaskOBJ = newTaskOBJ();
  let show: boolean = false;

  function showModal() {
    show = !show;
  }
  const elements = { title: HTMLElement };
  $: priorityColor = Update.updatePriorityColor(meta.priority);
  $: isDoneColor = Update.updateisDoneColor(meta.isDone);
</script>

<article class="task flex">
  <div class="is-done" style="background-color: {isDoneColor}" />
  <input
    bind:checked={meta.isDone}
    on:change={Update.updateIsDone(elements.title)}
    type="checkbox"
  />
  <input
    bind:this={elements.title}
    bind:value={meta.title}
    class="fs-500"
    type="text"
    placeholder="New Task"
  />
  {#if meta.priority !== 'None'}
    {#key meta.priority}
      <div
        class="priority fs-500"
        style="background-color: {priorityColor}"
        transition:fly={{ x: -100, duration: 600 }}
      >
        {meta.priority}
      </div>
    {/key}
  {/if}

  <img on:click={showModal} class="edit" src="./edit.svg" alt="Edit Task" />
</article>

{#if show}
  <Modal bind:meta bind:show {project} />
{/if}

<style lang="scss">
  $status-default: #e0e0e0;
  $status-completed: #73eca6;
  $priority-normal: #4879ff;
  $priority-important: #fbc54f;
  $priority-urgent: #ff5582;

  :is(.done) {
    color: $clr-light;
    text-decoration: line-through;
  }

  ::placeholder {
    color: $clr-light;
  }

  .task {
    position: relative;
    align-items: center;
    gap: 1rem;
    height: 2.75rem;
    border-radius: 0.2rem;
    border-bottom: 2px solid $bg-light;

    .edit {
      opacity: 0.35;
      width: 2rem;
      transition: rotate 0.25s ease-in-out;
    }

    input {
      font-family: 'Futura', sans-serif !important;
      border: none;
      outline: none;
    }

    input[type='text'] {
      width: 100%;
    }

    div {
      &.is-done {
        position: absolute;
        left: 0;
        z-index: -1;
        width: clamp(1.35rem, 1%, 3rem);
        height: 100%;
        border-radius: 0.2rem 0 0 0.2rem;
        background-color: $status-default;
      }

      &.priority {
        width: 8rem;
        padding: 0.35rem 1rem;
        color: white;
        text-align: center;
        white-space: nowrap;
        border-radius: 0.35rem;
        background-color: $priority-normal;
      }
    }
  }
</style>
