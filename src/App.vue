<script setup lang="ts">
	import BaseInput from "@/components/BaseInput.vue";
	import { useForm } from "vee-validate";
	import { cardSchema } from "@/utils/schema";
	import { reactive, ref, watchEffect } from "vue";

	const { defineField, handleSubmit, errors, validate, handleReset } = useForm({
		validationSchema: cardSchema,
	});

	const isSubmitted = ref(false);
	const [cardName, cardNameAttrs] = defineField("cardName");
	const [cardNumber, cardNumberAttrs] = defineField("cardNumber");
	const [month, monthAttrs] = defineField("month");
	const [year, yearAttrs] = defineField("year");
	const [cvc, cvcAttrs] = defineField("cvc");

	const visaCard = reactive({
		cardName: "Jane Applessed",
		cardNumber: "0000 0000 0000 0000",
		month: "00",
		year: "00",
		cvc: "000",
	});
	const onSubmit = handleSubmit(async (values) => {
		const { valid } = await validate();
		if (valid) {
			isSubmitted.value = true;
		}
	});
	const onReset = () => {
		isSubmitted.value = false;
		handleReset();
		visaCard.cardName = "Jane Applessed";
		visaCard.cardNumber = "0000 0000 0000 0000";
		visaCard.month = "00";
		visaCard.year = "00";
		visaCard.cvc = "000";
	};
	watchEffect(() => {
		if (cardName.value) {
			visaCard.cardName = cardName.value;
		}
		if (month.value) {
			visaCard.month = month.value;
		}
		if (year.value) {
			visaCard.year = year.value;
		}
		if (cvc.value) {
			visaCard.cvc = cvc.value;
		}
		if (cardNumber.value) {
			const formatted = cardNumber.value.replace(/(\d{4})(?=\d)/g, "$1 ");
			visaCard.cardNumber = formatted;
		}
	});
</script>

<template>
	<main class="max-w-[1049px] mr-[14.653%] ml-[10.278%] xflex lmd:flex-col gap-4" aria-label="main content of the page">
		<section
			class="relative max-w-[541px] md:basis-[51%] lmd:mx-auto md:flex-1 flex flex-col lmd:flex-col-reverse md:mr-6 lmd:mt-8"
			aria-label="card details"
		>
			<div class="relative mb-[37px] w-[82.625%] lmd:z-20 lsm:mt-[-70px]">
				<img src="/images/bg-card-front.png" alt="visa card front display" />
				<div class="absolute z-10 left-0 top-0 bottom-0 right-0 text-white">
					<img
						src="/images/card-logo.svg"
						alt="visa card logo"
						class="absolute top-[11.43%] left-[7.16%]"
					/>
					<h2 class="absolute top-[56.735%] left-[7.16%]"  >
						{{ visaCard.cardNumber }}
					</h2>
					<div class="xflex absolute top-[81.837%] left-[7.16%] right-[7.16%]" >
						<span class="cd">{{ visaCard.cardName }}</span>
						<p class="cd">
							<span class="">{{ visaCard.month }}</span
							>/<span class="">{{ visaCard.year }}</span>
						</p>
					</div>
				</div>
			</div>
			<div class="relative w-[82.625%] self-end lmd:z-10 " aria-labelledby="card-details-back">
				<img src="/images/bg-card-back.png" alt="visa card back display" />
				<span
					class="absolute right-[12.752%] top-[45.31%] lmd:top-[46.9%] cd text-white"
					>{{ visaCard.cvc }}</span
				>
			</div>
		</section>
		<section
			class="md:basis-[36.5%] md:max-w-[381px] lmd:zflex lmd:mt-10 lsm:mt-0 lmd:px-2 lmd:pb-11"
			aria-label="card form container"
			aria-describedby="card form and success message"
		>
			<form
				v-if="!isSubmitted"
				@submit.prevent="onSubmit"
				class="max-w-[381px]"
				autocomplete="on"
				aria-label="card form"
			>
				<BaseInput
					type="text"
					nom="card-name"
					title="cardholder name"
					placeholder="e.g. Jane Applessed"
					v-model="cardName"
					v-bind="cardNameAttrs"
					maxlength="25"
					:error-message="errors.cardName"
				/>
				<BaseInput
					type="text"
					nom="card-number"
					title="card number"
					placeholder="e.g. 1234 5678 9123 0000"
					v-model="cardNumber"
					v-bind="cardNumberAttrs"
					maxlength="16"
					:error-message="errors.cardNumber"
				/>
				<div class="flex gap-5">
					<div class="tablet:basis-[60%] basis-[170px]">
						<label for="month">exp date (mm/yy)</label>
						<div class="flex space-x-[10px]">
							<BaseInput
								type="text"
								nom="month"
								placeholder="MM"
								v-model="month"
								v-bind="monthAttrs"
								maxlength="2"
								:error-message="errors.month"
							/>
							<BaseInput
								type="text"
								nom="year"
								placeholder="YY"
								v-model="year"
								v-bind="yearAttrs"
								maxlength="2"
								:error-message="errors.year"
							/>
						</div>
					</div>
					<div class="tablet:basis-[40%] basis-[191px]">
						<BaseInput
							type="text"
							nom="cvc"
							placeholder="e.g. 123"
							title="cvc"
							v-model="cvc"
							v-bind="cvcAttrs"
							maxlength="3"
							:error-message="errors.cvc"
						/>
					</div>
				</div>
				<button type="submit" class="btn mt-[14px]" aria-label="submit button">Confirm</button>
			</form>
			<div v-else class="zflex flex-col" role="completionMessage">
				<img src="/images/icon-complete.svg" alt="completed" />
				<h1 class="text-vDeep mt-[34px] mb-4">thank you!</h1>
				<p>We've added your card details</p>
				<button @click="onReset" class="btn mt-12" aria-label="reset button">Continue</button>
			</div>
		</section>
	</main>
</template>

<style>
	label {
		@apply text-[12px] leading-[15px] uppercase tracking-[2px] mb-[9px] text-vDeep block;
	}
	input {
		@apply border border-grey rounded-lg h-[45px] leading-[23px] text-vDeep px-4 py-[11px] w-full placeholder-grey;
	}
	.btn {
		@apply h-[53px] rounded-lg bg-vDeep text-center py-[15px] text-white leading-[23px] w-full;
	}
	.cd {
		@apply lmd:text-[9px] lmd:leading-[11px] lmd:tracking-[1.286px] text-[14px] leading-[18px] tracking-[2px] uppercase text-white;
	}
</style>
