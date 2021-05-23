import {
	ElButton,
	ElInput,
	ElSelect,
	ElOption,
	ElCheckbox,
	ElFormItem,
	ElForm,
	ElUpload,
	ElCheckboxGroup,
	ElInputNumber,
	ElSwitch,
	ElIcon
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/en'
import locale from 'element-plus/lib/locale'

export default function(app) {
	locale.use(lang)

	app.use(ElIcon)
	app.use(ElButton)
	app.use(ElInput)
	app.use(ElInputNumber)
	app.use(ElSelect)
	app.use(ElOption)
	app.use(ElCheckbox)
	app.use(ElForm)
	app.use(ElFormItem)
	app.use(ElUpload)
	app.use(ElCheckboxGroup)
	app.use(ElSwitch)
}
