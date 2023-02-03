<script lang="ts">
  import { newTaskOBJ, TaskOBJ } from './TaskOBJ';
  import { ProjectOBJ } from './ProjectOBJ';

  export let project: ProjectOBJ;

  const temp: TaskOBJ = newTaskOBJ();

  function handleKey(event): void {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  function addTask(): void {
    const _temp: TaskOBJ = newTaskOBJ();
    _temp.title = temp.title.trim();

    console.log(project);
    project.list = [...project.list, _temp];
  }
</script>

<!-- Add Task -->
<div class="add-task-container flex">
  <!-- Button -->
  <button class="add-task-btn" on:click={addTask} />

  <!-- Text Input -->
  <input
    bind:value={temp.title}
    on:keydown={handleKey}
    class="add-task-input text-input"
    placeholder="Add Task"
    type="text" />
</div>

<style lang="scss">
  $add-task-shadow: 0 0 1px rgb(0, 0, 0, 0.65);
  $add-task-radius: 5px;
  $container-width: clamp(20rem, 40vw, 40rem);

  .add-task-container {
    position: relative;
    align-items: center;
    gap: clamp(0.25rem, 5vw, 1rem);
    width: $container-width;
    background-color: white;

    input {
      width: 100%;
      height: 2.5rem;
      padding-inline: 2.5rem;
      box-shadow: $add-task-shadow;
      border-radius: $add-task-radius;
    }

    button {
      position: absolute;
      left: 0;
      width: 1.35rem;
      margin-left: 0.5rem;
      margin-block: auto;
    }
  }

  @media (min-width: 40em) {
    .add-task-container {
      position: fixed;
      bottom: 1rem;
    }
  }
</style>
