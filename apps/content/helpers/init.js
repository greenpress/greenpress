/**
 * this file used to initiate basic data inside the authentication service
 */
const config = require('../config');
const mongoose = require('mongoose');
const { appConfiguration } = require('../config');
require('../server/models').connect(config.mongoUri);

const TENANT = process.env.TENANT || '0';
const HOST = process.env.HOST || 'localhost';

const Category = mongoose.model('Category');
const Menu = mongoose.model('Menu');
const Post = mongoose.model('Post');
const Configuration = mongoose.model('Configuration');

const configuration = new Configuration({
	tenant: TENANT,
	key: appConfiguration,
	public: true,
	metadata: {
		name: 'greenpress',
		language: 'en',
		direction: 'ltr',
		logoUrl: '/logo.png',
		description: 'Blogs and content sites open-source platform, built for the 21st century, using micro-services and best common technologies.',
		slogan: 'amazing blog platform',
		keywords: 'blog, platform, open-source, node, vue, fastify-dx',
		theme: 'damal',
		themeStylesUrl: '',
		websiteUrls: [HOST],
	}
})

const homePage = new Category({
	tenant: TENANT,
	path: '-',
	isPublic: true,
	content: '<p>Welcome to my website!</p>'
});


const category = new Category({
	tenant: TENANT,
	name: 'Test Category',
	path: 'test-cat',
	isPublic: true,
});


const cat2 = new Category({
	tenant: TENANT,
	name: 'Second Category',
	path: 'test2-cat',
	isPublic: true,
});


console.log('initiate content');

Promise.all([
	category.save(),
	cat2.save(),
	homePage.save(),
	configuration.save(),
])
	.then(async ([newCategory, secondCat]) => {

		await (new Post({
			tenant: TENANT,
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
Authentication service is responsible for the authentication mechanism and users, and can be used as a standalone for any other platform,
 so you can use it for a personal use.<br>
Content service is responsible for menus, posts, categories (and comments in the future).
<br>
Front Service is responsible for the client frontend and SSR, using Fastify-DX and Vue.<br>
The Admin Panel written in Vue and is located <a href="/gp-admin/" target="blank">/gp-admin</a>. :)
</p>`],
			tags: [],
		})).save();

		return (new Menu({
			tenant: TENANT,
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

