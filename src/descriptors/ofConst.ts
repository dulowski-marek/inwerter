import { Descriptor } from '../Descriptor';
import { makeDescriptor } from './makeDescriptor';
import { withToken } from './reducers/withToken';
import { withFactory } from './reducers/withFactory';
import { GenericFactory } from '../Factory/GenericFactory';
import { withDependencies } from './reducers/withDependencies';

export const ofConst = <T>(token: any, constant: T): Descriptor<T> => {
    return makeDescriptor<T>(
        withToken(token),
        withFactory(new GenericFactory(() => constant)),
        withDependencies([]),
    )({});
}
