import { WeatherService } from '@/services/WeatherService';

class MockedWeatherService extends WeatherService {
    constructor() {
        super({ appId: 'dummyAppId' });
    }

    getCurrentTemperatureInDegreeByCity = jest.fn<Promise<number>, []>().mockResolvedValue(20);
}

export const mockedWeatherService = new MockedWeatherService();
