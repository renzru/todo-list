<script lang="ts">
  import type { TaskOBJ } from './TaskOBJ';
  import type { ProjectOBJ } from './ProjectOBJ';

  import { Animate } from './Animate';
  import { fly } from 'svelte/transition';
  import Modal from './Modal.svelte';
  export let project: ProjectOBJ;
  export let meta: TaskOBJ;
  let show: boolean = false;

  const elements = { title: HTMLElement };
  $: priorityColor = Animate.swapPriority(meta.priority);
  $: isDoneColor = Animate.swapIsDone(meta.isDone);
</script>

<article class="task flex" in:fly={{ y: 100, duration: 450 }}>
  <!-- isDone Indicator -->
  <div class="is-done" style="background-color: {isDoneColor}" />

  <!-- isDone Checkbox -->
  <input
    bind:checked={meta.isDone}
    on:change={Animate.strikeThrough(elements.title)}
    type="checkbox"
  />

  <!-- Title  -->
  <input
    bind:this={elements.title}
    bind:value={meta.title}
    class="fs-500"
    type="text"
    placeholder="New Task..."
  />

  <!-- Priority -->
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

  <!-- Edit Button -->
  <img on:click={() => (show = !show)} class="edit" src="./edit.svg" alt="Edit Task" />
</article>

<!-- Editing Modal -->
{#if show}
  <Modal bind:meta bind:show {project} />
{/if}

<style lang="scss">
  :is(.done) {
    color: var(--clr-light);
    text-decoration: line-through;
  }

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
        background-color: var(--status-default);
      }

      &.priority {
        width: 8rem;
        padding: 0.35rem 1rem;
        color: white;
        text-align: center;
        white-space: nowrap;
        border-radius: 0.35rem;
      }
    }
  }
</style>
