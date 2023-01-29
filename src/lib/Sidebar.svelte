<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  export let projectStorage: object;
</script>

<aside class="grid flow">
  <h1 class="fs-default text-light thin">Todo Management</h1>
  <section>
    <h2 class="medium fs-default sidebar-heading flex">
      <img src="./project.svg" />Projects
    </h2>
    <ul>
      {#each projectStorage as project (project)}
        <li
          class="fs-default sidebar-link"
          on:click={() => dispatch('loadTask', project)}
          in:fly={{ y: 20, duration: 350 }}
        >
          {project.title}
        </li>
      {/each}
    </ul>
  </section>
</aside>

<style lang="scss">
  // Components
  .sidebar-heading {
    border-bottom: 1px solid var(--bg-light);
  }

  .sidebar-link:hover {
    background-color: #f7f8ff;
    outline: 0.5px solid #c7e1ff;
  }

  aside {
    position: fixed;
    z-index: 500;
    grid-auto-rows: min-content;
    height: 100%;
    width: 100%;
    padding-block: 0.8rem;
    background-color: white;
    transform: translateY(100%);
    box-shadow: 0.45px 0 1px rgb(0, 0, 0, 0.5);

    > * {
      padding: 0.25rem 0.8rem;
      width: 100%;
    }

    section {
      h2 {
        gap: 0.25rem;
        padding-block: 0.5rem;
        align-items: center;

        img {
          aspect-ratio: 1;
          width: 1em;
          height: 1rem;
        }
      }

      ul {
        padding: unset;

        li {
          padding: 0.25rem 0.8rem;
        }
      }
    }
  }

  @media (min-width: 1200px) {
    aside {
      left: 0;
      width: 20rem;
      justify-self: start;
      transform: translateY(0);
    }
  }
</style>
