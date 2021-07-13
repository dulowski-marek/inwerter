import { DescriptorReducer } from './DescriptorReducer';

export const withToken = <T>(token: any): DescriptorReducer<T> => {
    return (descriptor) => ({
        ...descriptor,
        getToken: () => token,
    });
}
