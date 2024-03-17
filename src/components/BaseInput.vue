<script lang="ts" setup>
	const emit = defineEmits(["update:modelValue"]);
	const { title, modelValue, nom, errorMessage } = defineProps({
		title: { type: String, default: "" },
		modelValue: { type: [String, Number], default: "" },
		nom: { type: String, required: false },
		errorMessage: { type: String, required: false },
	});
	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement | null;
		if (target) {
			emit("update:modelValue", target.value);
		}
	};
</script>

<template>
	<div class="mb-[26px]">
		<label :for="nom" v-if="title">{{ title }}</label>
		<input
			v-bind="$attrs"
			:name="nom"
			:id="nom"
			:value="modelValue"
			@input="handleInput"
			:class="{ error: errorMessage }"
		/>
		<p v-if="errorMessage" class="mt-2 text-[12px] leading-[15px] text-myred">{{ errorMessage }}</p>
	</div>
</template>
<style>
.error {
	@apply border-myred;
}
</style>

