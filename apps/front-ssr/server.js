import fetch from 'node-fetch'

globalThis.fetch = fetch;

globalThis.gatewayUrl = (() => {
	const protocol = process.env.GATEWAY_SERVICE_PROTOCOL || 'http';
	const url = process.env.GATEWAY_SERVICE_URL || 'localhost';
	const port = process.env.GATEWAY_SERVICE_PORT || '3000';
	return `${protocol}://${url}:${port}`;
})();

export const port = process.env.PORT || 3002;

export default ({ app }) => {
}

