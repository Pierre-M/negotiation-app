import { inject, onMounted, ref } from '@vue/composition-api';
import { WEATHER_SERVICE_KEY, WeatherService } from '@/services/WeatherService';

export const useCurrentWeather = (city: string) => {
    const currentTemperature = ref<number | null>(null);
    const weatherService = inject<WeatherService>(WEATHER_SERVICE_KEY);

    onMounted(async () => {
        if (!weatherService) {
            return;
        }

        const response = await weatherService.getCurrentTemperatureInDegreeByCity(city);

        currentTemperature.value = response ? Math.round(response) : null;
    });

    return {
        currentTemperature,
    };
};
