<script lang="ts">
	import type { Snippet } from "svelte";

    const { children, title, header }: { children: Snippet, title: string, header?: Snippet } = $props();
</script>

<section>
   <h2>{title} {#if header } <div class="flex flex-grow">{@render header() }</div> {/if}</h2>
   <div>
       {@render children()}
   </div>
</section>

<style lang="scss">
  section {
    & > h2 {
      font-size: var(--text-xl);
      line-height: var(--text-xl-lh);
      border-radius: var(--rounded-md) var(--rounded-md) 0px 0px;
      background-color: var(--theme-neutral-300);
      padding: calc(var(--spacing-unit) * 2);
      margin-bottom: 0px;
      display: flex;
      
    }
    background-color: var(--theme-neutral-50);
    & > div {
      border: 1px solid var(--theme-neutral-300);
      border-radius: 0px 0px var(--rounded-md) var(--rounded-md);
    }
  }
</style>