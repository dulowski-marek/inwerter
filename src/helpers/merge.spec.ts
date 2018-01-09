import { expect } from 'chai';

import { merge } from './merge';

describe('merge', () => {
	it('throw when types are incompatible', () => {
		const num = 1,
			str = 'abc',
			obj = {},
			arr = [];

		expect(() => merge(num, str)).to.throw;
		expect(() => merge(num, obj)).to.throw;
		expect(() => merge(num, arr)).to.throw;
		expect(() => merge(str, arr)).to.throw;
		expect(() => merge(arr, obj)).to.throw;
	});

	it('assign, if not recursive merge', () => {
		const target = {
			num: 123
		}, source = {
			num: 456
		}, merged = merge(target, source);

		expect(merged.num).to.equal(source.num);
	});

	it('assign, if types incompatible', () => {
		const target = {
			obj: {
				foo: 'bar'
			}
		}, source = {
			obj: 123
		}, merged = merge(target, source);

		expect(merged.obj).to.be.a('number');
	});

	it('merge recursively, if types compatible', () => {
		const target = {
			obj: {
				foo: 'bar',
				bar: 123
			}
		}, source = {
			obj: {
				bar: 'baaz',
				quux: 456
			}
		}, merged = merge(target, source);

		expect(merged.obj.bar).to.equal(source.obj.bar);
		expect(merged.obj.quux).to.equal(source.obj.quux);
		expect(merged.obj.foo).to.equal(target.obj.foo);
	});

	it('deep merge recursively', () => {
		const target = {
			obj: {
				foo: {
					bar: 123
				}
			}
		}, source = {
			obj: {
				foo: {
					bar: 456
				}
			}
		}, merged = merge(target, source);

		expect(merged.obj.foo.bar).to.equal(source.obj.foo.bar);
	});
});
