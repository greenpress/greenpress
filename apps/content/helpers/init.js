/**
 * this file used to initiate basic data inside the authentication service
 */
const config = require('../config');
const mongoose = require('mongoose');
require('../server/models').connect(config.mongoUri);

const Category = mongoose.model('Category');
const Menu = mongoose.model('Menu');
const Post = mongoose.model('Post');

const category = new Category({
	tenant: '0',
	name: 'Test Category',
	path: 'test-cat',
	isPublic: true,
});


const cat2 = new Category({
	tenant: '0',
	name: 'Second Category',
	path: 'test2-cat',
	isPublic: true,
});


console.log('initiate content');

Promise.all([
	category.save(),
	cat2.save(),
])
	.then(async ([newCategory, secondCat]) => {

		await (new Post({
			tenant: '0',
			category: newCategory._id,
			isPublic: true,
			authors: [],
			title: 'Welcome to your new blog',
			short: 'This is the first and demo post.<br>I hope you will enjoy this platform',
			editorContentsStates: ['editor'],
			contents: [`<p>
	This is an example post for Greenpress platform.<br>
	You can change it as you like, but this is a reference for you to create many more blog posts in the near future.
</p><p>
	While I'm writing those lines, there is no website or domain for this platform, so I can't help you with instructions.<br>
    I can only hope you cloned it from github, and you should find all the help you need inside thr readme.md files (there's one on each service).
</p><p>
This platform is separated to different services, each one is supposed to do one thing.<br>
Authentication service is responsible of the authentication mechanism and users, and can be used as a standalone for any other platform,
 so you can use it for a personal use.<br>
Content service is responsible for menus, posts, categories (and comments in the future).
<br>
Front Service is responsible for the client frontend and SSR, using Nuxt.js (+vue, vuex, vue-router..).<br>
Hopefully on the time you read this line, there's already an admin service for you, so you can manage all of the content. :)
</p>`],
			tags: [],
		})).save();

		return (new Menu({
			tenant: '0',
			name: 'main',
			links: [{
				kind: 'category',
				category: newCategory._id,
			}, {
				kind: 'category',
				category: secondCat._id,
			}]
		})).save();
	})
	.then(() => {
		console.log('content created successfully');
		process.exit(0);
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

