<script lang="ts">
	import type { PlcTaskRuntime } from "$lib/graphql/generated/graphql";

    const { task }: { task: PlcTaskRuntime } = $props();

    const waitTime = $derived(task?.metrics?.waitTime ?? 0);
    const executeTime = $derived(task?.metrics?.executeTime ?? 0);
    const totalTime = $derived(waitTime + executeTime);
    const waitBasis = $derived(totalTime > 0 ? (waitTime / totalTime) * 100 : 0);
    const executeBasis = $derived(totalTime > 0 ? (executeTime / totalTime) * 100 : 0);

</script>

<div class="flex justify-between">
    <span>{executeTime.toFixed(2)}ms</span>
    <span>{waitTime.toFixed(2)}ms</span>
</div>
<div class="flex execution-bar">
    <div style:flex-basis={`${executeBasis}%`}></div>
    <div style:flex-basis={`${waitBasis}%`}></div>
</div>

<style lang="scss">
    .execution-bar {
        & > div {
            height: var(--spacing-unit);
            &:first-child {
                background-color: var(--theme-primary);
            }
            &:last-child {
                background-color: var(--neutral-400);
            }
        }
    }
</style>
