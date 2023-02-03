<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ProjectOBJ } from './ProjectOBJ';
  import { fly } from 'svelte/transition';

  export let projectStorage: Array<ProjectOBJ>;
  const dispatch = createEventDispatcher();
</script>

<aside class="grid flow bg-white">
  <!-- App Title -->
  <h1 class="fs-default text-light thin">Todo Management</h1>
  <!-- Project Section -->
  <section>
    <!-- Heading -->
    <h2 class="medium fs-default sidebar-heading flex">
      <img src="./project.svg" alt="List of Projects" />Projects
    </h2>
    <!-- Projects List -->
    <ul>
      {#each projectStorage as project (project)}
        <li
          class="fs-default list-style-1"
          in:fly={{ y: 20, duration: 350 }}
          on:click={() => dispatch('switchProject', project)}>
          {#if project.title === ''}
            <span in:fly={{ y: 20, duration: 350 }} style="color: var(--clr-light)">
              Untitled...
            </span>
          {:else}
            <span in:fly={{ y: 20, duration: 350 }}>{project.title}</span>
          {/if}
        </li>
      {/each}
    </ul>
  </section>
</aside>

<style lang="scss">
  $sidebar-padding: 0.25rem 0.8rem;

  aside {
    position: fixed;
    grid-auto-rows: min-content;
    height: 100%;
    width: 100%;
    padding-block: 0.8rem;
    transform: translateY(100%);
    box-shadow: 0.45px 0 1px rgb(0, 0, 0, 0.5);

    > * {
      padding: $sidebar-padding;
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
          padding-block: 0.3rem;
          padding-left: 1rem;
        }
      }
    }
  }

  // Components
  .sidebar-heading {
    border-bottom: 1px solid var(--bg-light);
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
