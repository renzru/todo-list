<script lang="ts">
</script>

<article class="task flex">
  <div class="is-done" />
  <input data-meta="is-done" type="checkbox" />
  <input data-meta="title" type="text" placeholder="New Task" class="fs-500" />
  <div data-meta="priority">Not Started</div>
  <img class="edit" src="./edit.svg" alt="Edit Task" />
</article>

<style lang="scss">
  $status-default: #e0e0e0;
  $status-completed: #73eca6;
  $priority-normal: #4879ff;
  $priority-important: #fbc54f;
  $priority-urgent: #ff5582;

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
        background-color: $status-default;
        border-radius: 0.2rem 0 0 0.2rem;
      }

      &[data-meta="priority"] {
        width: 8rem;
        padding: 0.35rem 1rem;
        color: var(--bg-white);
        text-align: center;
        white-space: nowrap;
        background-color: $priority-urgent;
        border-radius: 0.35rem;
      }
    }
  }
</style>
