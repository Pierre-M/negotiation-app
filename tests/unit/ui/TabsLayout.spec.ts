import TabsLayout from '@/ui/TabsLayout.vue';
import { prepareComponent } from '../_utils';
import { Wrapper } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import { Tab } from '@/ui/tabs';

const FAKE_TABS: Tab[] = [
    {
        id: 'tab1',
        label: 'Label for tab1',
    },
    {
        id: 'tab2',
        label: 'Label for tab2',
    },
    {
        id: 'tab3',
        label: 'Label for tab3',
    },
];

let wrapper: Wrapper<any>;

describe('TabsLayout', () => {
    beforeEach(() => {
        wrapper = prepareComponent(TabsLayout, {
            propsData: {
                tabs: FAKE_TABS,
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    describe('Initial state', () => {
        it('should have first tab active on init', () => {
            expectActiveTabToBe(0);
        });
    });

    describe('Tab change upon click', () => {
        it('should change active tab upon click on it', async () => {
            wrapper.findAll('[role="tab"]').at(1).trigger('click');

            await wrapper.vm.$nextTick();

            expectActiveTabToBe(1);

            wrapper.findAll('[role="tab"]').at(2).trigger('click');

            await flushPromises();

            expectActiveTabToBe(2);
        });
    });
});

const expectActiveTabToBe = (tabIdx: number) => {
    const tab = wrapper.findAll('[role="tab"]').at(tabIdx);
    const tabContent = wrapper.find(`#${FAKE_TABS[tabIdx].id}`);

    expect(tab.attributes()).toMatchObject({
        tabindex: '0',
        'aria-selected': 'true',
    });

    expect(tabContent.element).toBeVisible();
};
