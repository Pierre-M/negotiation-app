<template>
    <div class="tabs-layout">
        <ul class="tabs-layout__tabs" role="tablist" aria-label="Sample Tabs">
            <li v-for="(tab, idx) in tabs" :key="tab.id">
                <button
                    class="tabs-layout__tab-item"
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
        <div aria-hidden="true" class="tabs-layout__marker" />

        <div
            class="tabs-layout__content"
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

<style lang="scss">
.tabs-layout {
    min-width: 800px;
    box-shadow: 0 0 15px transparentize(#000, 0.8);
    background-color: $white;
    @include radius;
    overflow: hidden;

    &__tabs {
        position: relative;
        display: flex;
        width: 100%;

        > li {
            flex-basis: 50%;
        }
    }

    &__tab-item {
        width: 100%;
        padding: 15px 20px;
        font-size: $fs_m;
        text-align: center;
        border: none;
        background-color: transparentize($c_primary, 0.5);
        color: $white;
        cursor: pointer;

        &:focus {
            outline: none;
        }

        &[aria-selected='true'] {
            background-color: transparent;
            color: $c_primary;
            font-weight: 600;
        }
    }
}
</style>
