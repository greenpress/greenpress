const mongoose = require("mongoose");
const fetch = require('node-fetch');
const cacheManager = require("../utils/cache-manager");
const Menu = require('./menu');
const Block = require('./block');

const cachePrefix = "layout:";

const LayoutContentSchema = new mongoose.Schema({
	component: {
		type: String,
		required: true,
	},
	predefined: Boolean,
	classes: String,
	props: mongoose.Schema.Types.Mixed,
});
LayoutContentSchema.add({
	children: [ LayoutContentSchema ]
})

const LayoutSchema = new mongoose.Schema({
	kind: {
		type: String,
		enum: [ 'index', 'search', 'tag', 'category', 'post' ],
		required: true,
		index: true,
	},
	tenant: {
		type: String,
		required: true,
	},
	connectedData: [
		{
			kind: {
				type: String,
				enum: [ 'block', 'menu', 'http', 'posts', 'categoryPosts', 'category' ]
			},
			context: mongoose.Schema.Types.Mixed,
			identifier: String,
			reference: String
		}
	],
	content: [ LayoutContentSchema ]
});

LayoutSchema.index({ tenant: 1, kind: 1 }, { unique: true });

// some useful methods
LayoutSchema.statics.search = function search(query = {}) {
	return this.find(query).lean();
};

LayoutSchema.statics.getSingleLayout = function getSingleLayout({ kind, tenant, useCache = true }) {
	if (useCache) {
		return cacheManager.wrap(
			`${cachePrefix}single:${kind}.${tenant}`,
			() => this.findOne({ kind, tenant })
				.select('tenant content connectedData') // must retrieve connectedData and merge with content layout
				.lean()
				.exec()
				.then(async (layout) => {
					await Promise.all(layout.connectedData.map(async (item) => {
						const { kind, identifier, context } = item;
						let data;
						switch (kind) {
							case 'menu':
								data = await Menu.getSingleMenu({ name: identifier, tenant });
								break;
							case 'block':
								data = await Block.getSingleBlock({ blockId: identifier, tenant });
								break;
							case 'http':
								data = (await fetch({
									url: identifier,
									method: context?.method || 'GET',
									headers: { tenant },
								})).then(res => res.text());
								break;
						}
						item.data = data && JSON.parse(data);
					}));
					return JSON.stringify(layout);
				})
		);
	}
	return this.findOne({ kind, tenant }).lean().exec().then(JSON.stringify);
}

LayoutSchema.post('save', function () {
	cacheManager.setItem(`${cachePrefix}single:${this.kind}.${this.tenant}`, null, { ttl: 1 })
})

module.exports = mongoose.model("Layout", LayoutSchema);
