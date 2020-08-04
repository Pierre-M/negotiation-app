import { shallowMount, ShallowMountOptions, VueClass, Wrapper } from '@vue/test-utils';

export const prepareComponent = (component: VueClass<Vue>, props: ShallowMountOptions<Vue> = {}): Wrapper<any> => {
    return shallowMount(component, {
        mocks: {
            $t: (key: string) => key,
        },
        ...props,
    });
};
