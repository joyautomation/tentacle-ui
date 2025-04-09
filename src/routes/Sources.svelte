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
          {#if source.type === 'modbus'}
            <img height="30px" src="/logoModbus.png" alt="Modbus" />
          {/if}
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
    gap: 0 calc(var(--spacing-unit) * 1);
    grid-template-columns: auto 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "logo name state"
      "logo description state";

    & > .source__name {
      grid-area: name;
      font-size: var(--text-lg);
      line-height: var(--text-lg-lh);
    }
    & > .source__description {
      grid-area: description;
      font-size: var(--text-sm);
      line-height: var(--text-sm-lh);
      color: var(--theme-neutral-600);
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
    & > img {
      grid-area: logo;
      align-self: center;
    }
  }
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing-unit) * 2);
}
</style>