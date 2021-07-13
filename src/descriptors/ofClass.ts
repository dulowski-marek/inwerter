import { Descriptor } from '../Descriptor';
import { ClassFactory } from '../Factory/ClassFactory';
import { makeDescriptor } from './makeDescriptor';
import { withToken } from './reducers/withToken';
import { withFactory } from './reducers/withFactory';
import { withClassDependencies } from './reducers/withClassDependencies';

export const ofClass = <T>(Constructor: new (...args: any[]) => T): Descriptor<T> => {
    return makeDescriptor<T>(
        withToken(Constructor),
        withFactory(new ClassFactory(Constructor)),
        withClassDependencies(Constructor),
    )({});
}
