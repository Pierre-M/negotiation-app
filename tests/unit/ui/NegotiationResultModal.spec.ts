import NegotiationResultModal from '@/ui/NegotiationResultModal.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { WEATHER_SERVICE_KEY } from '@/services/WeatherService';
import { mockedWeatherService } from '../_mocks/MockedWeatherService';
import flushPromises from 'flush-promises';
import Btn from '@/ui/Btn.vue';

describe('NegotiationResultModal', () => {
    let wrapper: Wrapper<any>;

    beforeEach(async () => {
        mockedWeatherService.getCurrentTemperatureInDegreeByCity.mockResolvedValueOnce(25);
        wrapper = shallowMount(NegotiationResultModal, {
            provide: {
                [WEATHER_SERVICE_KEY]: mockedWeatherService,
            },
        });

        await flushPromises();
    });

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.destroy();
    });

    it('should call for current temperature in London once mounted', () => {
        expect(mockedWeatherService.getCurrentTemperatureInDegreeByCity).toHaveBeenCalledWith('London');
    });

    it("should display current temperature if it's returned by WeatherService", async () => {
        expect(wrapper.html()).toContain('25°');
    });

    it('should emit closed event upon click on main CTA', () => {
        wrapper.findComponent(Btn).vm.$emit('click');

        expect(wrapper.emitted().closed).toBeTruthy();
    });
});
