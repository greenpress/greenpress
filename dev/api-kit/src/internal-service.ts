import axios from 'axios';
import { serviceDescriptor } from './constants';
import { InternalService, InternalServiceOptions } from './types';

function callInternalService(service: InternalService, options: InternalServiceOptions) {
	const url = `${service.protocol}://${service.url}:${service.port}${options.url}`;
	return axios({ ...options, url });
}

function createServiceDescriptor(name: string) {
	name = name.toUpperCase();

	return {
		protocol: process.env[`${name}${serviceDescriptor.PROTOCOL}`] || 'http',
		url: process.env[`${name}${serviceDescriptor.URL}`] || 'localhost',
		port: process.env[`${name}${serviceDescriptor.PORT}`] as string,
	};
}

export default {
	callInternalService,
	service: (name: string) => {
		const service = createServiceDescriptor(name);
		return (options: InternalServiceOptions) => callInternalService(service, options);
	},
};
