<template>
    <div class="tabs">
        <ul role="tablist" aria-label="Sample Tabs">
            <li v-for="(tab, idx) in tabs" :key="tab.id">
                <button
                    type="button"
                    role="tab"
                    :aria-selected="isTabActive(idx)"
                    :aria-controls="tab.id"
                    :tabindex="isTabActive(idx) ? 0 : -1"
                    :id="`tab_${tab.id}`"
                    @click="setTabActive(idx)"
                >
                    {{ tab.label }}
                </button>
            </li>
        </ul>

        <div
            v-for="(tab, idx) in tabs"
            v-show="isTabActive(idx)"
            :key="tab.id"
            :id="tab.id"
            :tabindex="0"
            role="tabpanel"
            :aria-labelledby="`tab_${tab.id}`"
        >
            <slot :name="tab.id" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api';

export default defineComponent({
    name: 'TabsLayout',
    props: {
        tabs: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        const activeTabIdx: Ref<number> = ref(0);
        const isTabActive = (tabIdx: number): boolean => {
            return activeTabIdx.value === tabIdx;
        };
        const setTabActive = (idx: number) => (activeTabIdx.value = idx);

        return {
            isTabActive,
            setTabActive,
        };
    },
});
</script>

<style lang="stylus"></style>
