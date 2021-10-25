<template>
	<div>
		<FormInput title="Select GCS JSON Key" type="file" v-model="file" @change.native="setFileData"/>
	</div>
</template>
<script lang="ts">
import {watchEffect, reactive, ref} from 'vue'
import FormInput from '../../core/components/forms/FormInput.vue'

export default {
	name: 'StorageGcsAuth',
	components: {FormInput},
	setup(props, {emit}) {
		const form = reactive({
			projectId: '',
			clientEmail: '',
			privateKey: '',
		})

		function getFormInputs({projectId, clientEmail, privateKey}) {
			return {projectId, clientEmail, privateKey};
		}

		watchEffect(() => emit('update:modelValue', getFormInputs(form)))

		function readFile(file: File): Promise<string> {
			return new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.readAsText(file, 'UTF-8')
				reader.onload = function (evt: any) {
					resolve(evt?.target.result)
				}
				reader.onerror = function () {
					reject(new Error('error reading file'))
				}
			})
		}

		return {
			form,
			file: ref(null),
			async setFileData($event) {
				if ($event.target.files && $event.target.files[0]) {
					const {
						project_id: projectId,
						private_key: privateKey,
						client_email: clientEmail
					} = JSON.parse(await readFile($event.target.files[0]))

					form.projectId = projectId
					form.privateKey = privateKey
					form.clientEmail = clientEmail
				}
			}
		}
	}
}
</script>
