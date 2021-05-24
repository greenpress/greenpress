<template>
	<div>
		<section v-for="comment in comments" :key="comment._id">
			<p>
				{{comment.author}}
				<br>
				<small>{{comment.created | dateTime}}</small>
			</p>
			<pre>{{comment}}</pre>
		</section>
		<AddCommentForm v-on="$listeners"/>
	</div>
</template>
<script>
  import AddCommentForm from './AddCommentForm'

  export default {
    components: { AddCommentForm },
    props: {
      comments: Array,
    },
  }
</script>

<style scoped>
</style>
