import NegotiationWidget from '@/ui/NegotiationWidget.vue';
import { prepareComponent } from '../_utils';
import { Wrapper } from '@vue/test-utils';
import { NegotiationServiceKey } from '@/services/NegotiationService';
import { mockedNegotiationService } from '../_mocks/MockedNegotiationService';
import NegotiationPanel from '@/ui/NegotiationPanel.vue';
import flushPromises from 'flush-promises';

let wrapper: Wrapper<any>;
let employerPanel: Wrapper<any>;
let employeePanel: Wrapper<any>;

describe('NegotiationWidget', () => {
    beforeEach(() => {
        wrapper = prepareComponent(NegotiationWidget, {
            provide: {
                [NegotiationServiceKey]: mockedNegotiationService,
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

    it('should execute negotiation and emit right payload when both employer AND employee values have been provided', async () => {
        const employerMaxSalary = 2000;
        const employeeMinWanted = 3000;

        employerPanel.vm.$emit('submit', employerMaxSalary);
        employeePanel.vm.$emit('submit', employeeMinWanted);
        await flushPromises();

        expect(mockedNegotiationService.execute).toHaveBeenCalledWith({ max: employerMaxSalary, min: employeeMinWanted });
        expect((wrapper.emitted().negotiated as any)[0][0]).toEqual({
            status: expect.any(String),
            min: employeeMinWanted,
            max: employerMaxSalary,
        });
    });
});
