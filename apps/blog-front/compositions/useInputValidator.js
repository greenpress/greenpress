import { ref, watch } from '@nuxtjs/composition-api'

export default function(startVal, validators, onValidate) {
	const input = ref(startVal)
	const errors = ref([])
	watch(input, (value) => {
		errors.value = validators.map((validator) => validator(value))
		onValidate(value)
	})
	return {
		input,
		errors
	}
}
