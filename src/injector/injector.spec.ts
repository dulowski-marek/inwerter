import 'reflect-metadata';
import { expect } from 'chai';

import { Injector } from './injector';
import { Injectable } from '../injectable';
import { Inject } from '../inject';

describe('Injector', () => {
	it('simple provision of dependencies', () => {
		const injector = new Injector();

		@Injectable()
		class Injectee { }

		@Injectable()
		class Provider {
			constructor(public injectee: Injectee) { }
		}

		const resolved = injector.resolve<Provider>(Provider);

		expect(resolved.injectee).to.not.be.undefined;
	});

	it('resolve with existing if singleton', () => {
		let injector = new Injector(), count = 0;

		@Injectable()
		class Injectee {
			constructor() {
				count++;
			}
		}

		@Injectable()
		class Provider {
			constructor(public injectee: Injectee) {

			}
		}

		injector.register(Injectee, {
			singleton: true
		});

		injector.resolve<Provider>(Provider);
		injector.resolve<Provider>(Provider);

		expect(count).to.equal(1);
	});

	it('use inject to manually specify provider token', () => {
		let injector = new Injector(), config = {
			foo: 'abc'
		}, ProviderConfig = Symbol();

		@Injectable()
		class Provider {
			constructor(@Inject(ProviderConfig) public injectedConfig: typeof config) {

			}
		}

		injector.register(ProviderConfig, {
			factory: () => config,
			provide: [],
		});

		expect(injector.resolve<Provider>(Provider).injectedConfig).to.not.be.undefined;
	});
});
