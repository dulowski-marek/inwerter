import { merge } from './merge';

describe('merge', () => {
	test('throw when types are incompatible', () => {
		const num = 1,
			str = 'abc',
			obj = {},
			arr = [];

		expect(() => merge(num, str)).toThrow();
		expect(() => merge(num, obj)).toThrow();
		expect(() => merge(num, arr)).toThrow();
		expect(() => merge(str, arr)).toThrow();
		expect(() => merge(arr, obj)).toThrow();
	});

	it('assign, if not recursive merge', () => {
		const target = {
			num: 123
		}, source = {
			num: 456
		}, merged = merge(target, source);

		expect(merged.num).toBe(source.num);
	});

	it('assign, if types incompatible', () => {
		const target = {
			obj: {
				foo: 'bar'
			}
		}, source = {
			obj: 123
		}, merged = merge(target, source);

		expect(merged.obj).toBe(123);
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

		expect(merged.obj.bar).toBe(source.obj.bar);
		expect(merged.obj.quux).toBe(source.obj.quux);
		expect(merged.obj.foo).toBe(target.obj.foo);
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

		expect(merged.obj.foo.bar).toBe(source.obj.foo.bar);
	});
});
