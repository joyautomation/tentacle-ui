<script lang="ts">
	import type { Plc } from "$lib/graphql/generated/graphql";
	import { slide } from "svelte/transition";
	import TaskExecutionBar from "./TaskExecutionBar.svelte";
	import Section from "./Section.svelte";
	import Error from "./Error.svelte";

  const { plc }: { plc: Plc } = $props();
  const tasks = $derived(plc?.runtime?.tasks || []);
</script>

<Section title="Tasks">
  <div class="lines">
    {#each tasks as task}
        <article>
            <div class="task__info">
                <h3 class="task__name">{task.name}</h3>
                <p class="task__description">{task.description}</p>
                <p class="task__scanRate">{task.scanRate}ms</p>
            </div>
            <div>
              <TaskExecutionBar task={task} />
            </div>
            {#if task.error?.message}
              <Error text={task.error?.message} />
            {/if}
        </article>
    {/each}
  </div>
</Section>


<style lang="scss">
  h3, p {
    margin-bottom: 0;
  }
  article {
    & > .task__info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        "name scan"
        "description scan";

      & > .task__name {
        grid-area: name;
        font-size: var(--text-lg);
        line-height: var(--text-lg-lh);
      }
      & > .task__description {
        grid-area: description;
      }
      & > .task__scanRate {
        grid-area: scan;
        justify-self: end;
        align-self: center;
      }
    }
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing-unit) * 2);
    padding: calc(var(--spacing-unit) * 2);
  }
  .task__scanRate {
    border: solid 1px var(--theme-neutral-300);
    background-color: var(--theme-neutral-300);
    padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit)*3);
    border-radius: var(--rounded-full);
  }
  .task__error {
    color: var(--red-500);
    border: 1px solid var(--red-500);
    border-radius: var(--rounded-md);
    padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
    background-color: var(--red-100)
  }
  
</style>