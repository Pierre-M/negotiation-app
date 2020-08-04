import { ref } from '@vue/composition-api';

export const useComponentRendering = (nextTick: () => Promise<void>) => {
    const ready = ref<boolean>(true);
    const rerender = async () => {
        ready.value = false;
        await nextTick();
        ready.value = true;
    };

    return {
        ready,
        rerender,
    };
};
