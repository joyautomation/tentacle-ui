<script lang="ts">
  import Section from "./Section.svelte";
  import type { Plc } from "$lib/graphql/generated/graphql";
	import { slide } from "svelte/transition";
	import Error from "./Error.svelte";

  const { plc }: { plc: Plc } = $props();
  const sources = $derived(plc?.runtime?.sources || []);
</script>

<Section title="Sources">
  <div class="lines">
    {#each sources as source}
      <article>
        <div class="source__info">
          <h3 class="source__name">{source.name}</h3>
          <p class="source__description">{source.description}</p>
          <p class="source__state">{source.state}</p>
        </div>
        {#if source.error?.message}
          <Error text={source.error?.message} />
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
  & > .source__info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "id state"
      "name state"
      "description state";

    & > .source__name {
      grid-area: name;
      font-size: var(--text-lg);
      line-height: var(--text-lg-lh);
    }
    & > .source__description {
      grid-area: description;
    }
    & > .source__state {
      grid-area: state;
      justify-self: end;
      align-self: center;
      border: solid 1px var(--theme-neutral-300);
      background-color: var(--theme-neutral-300);
      padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit)*3);
      border-radius: var(--rounded-full);
    }
  }
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing-unit) * 2);
}
</style>