import NegotiationWidget from '@/ui/NegotiationWidget.vue';
import { prepareComponent } from '../_utils';
import { Wrapper } from '@vue/test-utils';
import { NEGOTIATION_SERVICE_KEY, NegotiationStatus } from '@/services/NegotiationService';
import { mockedNegotiationService } from '../_mocks/MockedNegotiationService';
import NegotiationPanel from '@/ui/NegotiationPanel.vue';
import flushPromises from 'flush-promises';
import NegotiationResultModal from '@/ui/NegotiationResultModal.vue';
import TabsLayout from '@/ui/TabsLayout.vue';

let wrapper: Wrapper<any>;
let employerPanel: Wrapper<any>;
let employeePanel: Wrapper<any>;

describe('NegotiationWidget', () => {
    beforeEach(() => {
        wrapper = prepareComponent(NegotiationWidget, {
            provide: {
                [NEGOTIATION_SERVICE_KEY]: mockedNegotiationService,
            },
        });
        employerPanel = wrapper.findAllComponents(NegotiationPanel).at(0);
        employeePanel = wrapper.findAllComponents(NegotiationPanel).at(1);
    });

    afterEach(() => {
        wrapper.destroy();
        jest.clearAllMocks();
    });

    it('should not execute negotiation if employee value is empty', async () => {
        employerPanel.vm.$emit('submit', 2000);

        await flushPromises();

        expect(mockedNegotiationService.execute).not.toHaveBeenCalled();
        expect(wrapper.emitted().negotiated).toBeFalsy();
    });

    it('should not execute negotiation if employer value is empty', async () => {
        employeePanel.vm.$emit('submit', 2000);

        await flushPromises();

        expect(mockedNegotiationService.execute).not.toHaveBeenCalled();
        expect(wrapper.emitted().negotiated).toBeFalsy();
    });

    it('should execute negotiation and show result modal when both employer AND employee values have been provided', async () => {
        const employerMaxSalary = 2000;
        const employeeMinWanted = 3000;

        employerPanel.vm.$emit('submit', employerMaxSalary);
        employeePanel.vm.$emit('submit', employeeMinWanted);
        await flushPromises();

        expect(mockedNegotiationService.execute).toHaveBeenCalledWith({ max: employerMaxSalary, min: employeeMinWanted });
        expect(wrapper.findComponent(NegotiationResultModal).props()).toMatchObject({
            opened: true,
            status: NegotiationStatus.SUCCESS,
            min: employeeMinWanted,
            max: employerMaxSalary,
        });
    });

    it('should rerender and reset state upon negotiation modal closed event', async () => {
        wrapper.setData({
            status: NegotiationStatus.SUCCESS,
            showResultModal: true,
            employeeTargetSalary: 2000,
            employerMaxSalary: 3000,
        });

        await flushPromises();

        wrapper.findComponent(NegotiationResultModal).vm.$emit('closed');

        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(TabsLayout).exists()).toBe(false);
        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(TabsLayout).exists()).toBe(true);

        expect(wrapper.vm.status).toBe(null);
        expect(wrapper.vm.employerMaxSalary).toBe(null);
        expect(wrapper.vm.employeeTargetSalary).toBe(null);
        expect(wrapper.vm.showResultModal).toBe(false);
    });
});
