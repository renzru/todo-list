<script lang="ts">
  let project;
  let isDone: boolean;
  let title: string;
  let notes: string;
  let priority: string = "Normal";
  let deadline;

  const updateIsDone = (e) => {
    const _title: HTMLElement = e.target.parentNode.querySelector(
      'input[data-meta="title"]'
    );

    _title.classList.toggle("done");
  };
</script>

<article class="task flex">
  <div class="is-done" />
  <input
    bind:checked={isDone}
    on:change={updateIsDone}
    data-meta="is-done"
    type="checkbox"
  />
  <input
    bind:value={title}
    data-meta="title"
    class="fs-500"
    type="text"
    placeholder="New Task"
  />
  <div class="priority">{priority}</div>
  <img class="edit" src="./edit.svg" alt="Edit Task" />
</article>

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

    input {
      font-family: "Open Sans", sans-serif !important;
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
