<script>
	import { Pencil, Xmark } from '@joyautomation/salt/icons';
	const { id, value } = $props();
	const editedValue = $state(value);
</script>

<form class="flex align-center space-x-2" method="post" action="?/setValue">
	<input type="hidden" name="id" value={id} />
	<input class="variable__input" type="text" name="value" value={editedValue} />
	<button type="submit" class="button--icon"><Pencil /></button>
	<button type="submit" class="button--icon"><Xmark /></button>
</form>

<style lang="scss">
	.variable__input {
		text-align: end;
	}
</style>
