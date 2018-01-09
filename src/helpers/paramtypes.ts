import { Metadata } from '../metadata';

export function getParamtypes(target: any): { token: any }[] {
	return (Metadata
		.get(target, 'design:paramtypes') || [])
		.map(paramtype => ({ token: paramtype }));
}
