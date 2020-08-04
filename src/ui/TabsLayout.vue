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

        <div class="tabs-layout__content" :key="activeTab.id" :id="activeTab.id" role="tabpanel" :aria-labelledby="`tab_${activeTab.id}`">
            <slot :name="activeTab.id" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from '@vue/composition-api';
import { Tab } from '@/ui/tabs';

export default defineComponent({
    name: 'TabsLayout',
    props: {
        tabs: {
            type: Array,
            default: () => [],
        },
    },
    setup(props: { tabs: Tab[] }) {
        const activeTabIdx: Ref<number> = ref(0);
        const isTabActive = (tabIdx: number): boolean => {
            return activeTabIdx.value === tabIdx;
        };
        const setTabActive = (idx: number) => (activeTabIdx.value = idx);
        const activeTab = computed<Tab>(() => {
            return props.tabs[activeTabIdx.value];
        });

        return {
            isTabActive,
            setTabActive,
            activeTab,
        };
    },
});
</script>

<style lang="scss" scoped>
.tabs-layout {
    min-width: 800px;
    box-shadow: 0 0 15px transparentize($black, 0.8);
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
