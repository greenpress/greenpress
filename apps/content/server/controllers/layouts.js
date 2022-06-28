const Layout = require("../models/layout");

function getLayoutsList(req, res) {
	Layout.search({
		tenant: req.headers.tenant,
	})
		.then((data) => {
			if (!data) {
				return Promise.reject(null);
			}
			res.status(200).json(data).end();
		})
		.catch(() => {
			res.status(400).json({ message: "failed to load layouts list" }).end()
		});
}

// IMPORTANT: feature before update and delete handler functions
function getLayoutByKind(req, res, next) {
	const { kind } = req.params || {};
	const { tenant } = req.headers || {};
	Layout.findOne({ kind, tenant }).then((layout) => {
		if (!layout) {
			layout = new Layout({ kind, tenant });
		}
		req.layout = layout;
		next();
	}).catch(() => {
		res.status(404).json({ message: "layout not exists" }).end()
	});
}

async function singleLayout(req, res) {
	const { kind } = req.params || {};
	const { tenant } = req.headers || {};
	const useCache = !req.user?.isEditor;
	try {
		const layout = await Layout.getSingleLayout({ kind, tenant, useCache });
		if (layout) {
			res.status(200).set('Content-Type', 'application/json').end(layout);
			return;
		}
	} catch {
		//
	}
	res.status(404).json({ message: "layout not exists" }).end();
}

// create a layout. accept all types
function createLayout(req, res) {
	const { kind } = req.body || {};
	const { tenant } = req.headers;
	const newLayout = new Layout({
		tenant,
		kind,
		content: req.body.content || [],
		connectedData: req.body.connectedData || []
	});
	newLayout.save().then((layout) => {
		if (!layout) {
			return Promise.reject(null);
		}
		layout = layout.toObject();
		res.status(200).json(layout).end();
	}).catch(() => {
		res.status(500).json(
			{ message: "error while creating layout, try again" },
		).end()
	});
}

function updateLayout(req, res) {
	const { layout: currLayout } = req;

	if (req.body.content) {
		currLayout.content = req.body.content;
	}

	if (req.body.connectedData) {
		currLayout.connectedData = req.body.connectedData;
	}

	currLayout.save()
		.then((newLayout) => {
			res.status(200).json(newLayout).end();
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(
				{ message: "error while updating layout, try again" },
			).end()
		});
}

function deleteLayout(req, res) {
	const { layout: deletedLayout } = req;

	deletedLayout.remove()
		.then((layout) => {
			res.status(200).json(layout).end();
		})
		.catch(() =>
			res.status(500).json(
				{ message: "error while deleting layout, try again" },
			).end()
		);
}

module.exports = {
	getLayoutsList,
	getLayoutByKind,
	singleLayout,
	createLayout,
	updateLayout,
	deleteLayout,
};
