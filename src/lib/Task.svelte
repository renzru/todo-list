<script lang="ts">
  import Modal from './Modal.svelte';
  import type { TaskOBJ } from './TaskOBJ';
  import { newTaskOBJ } from './TaskOBJ';

  let meta: TaskOBJ = newTaskOBJ();
  const elements = {
    title: HTMLInputElement,
  };

  let task: HTMLElement;
  let show: boolean = false;

  function updateIsDone() {
    elements.title.classList.toggle('done');
  }
</script>

<article class="task flex" bind:this={task}>
  <div class="is-done" />
  <input bind:checked={meta.isDone} on:change={updateIsDone} type="checkbox" />
  <input
    bind:this={elements.title}
    bind:value={meta.title}
    class="fs-500"
    type="text"
    placeholder="New Task"
  />
  <div class="priority">{meta.priority}</div>
  <img on:click={() => (show = !show)} class="edit" src="./edit.svg" alt="Edit Task" />
</article>
{#if show}
  <Modal bind:meta bind:show />
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
    border-radius: 0.2rem;
    border-bottom: 2px solid $bg-light;

    .edit {
      margin-right: auto;
      width: 2rem;
      opacity: 0.35;
      transition: rotate 0.25s ease-in-out;
    }

    input {
      font-family: 'Open Sans', sans-serif !important;
      border: none;
      outline: none;
    }

    div {
      &.is-done {
        width: clamp(8px, 2.5%, 10px);
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
