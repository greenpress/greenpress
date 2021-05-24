import Vue from 'vue';

Vue.filter('dateTime', strOrDate => {
	const date = new Date(strOrDate);

	return date.toLocaleString();
});
