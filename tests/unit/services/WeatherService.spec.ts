import { CURRENT_WEATHER_API, WeatherService } from '@/services/WeatherService';
import axios from 'axios';
import Mock = jest.Mock;

jest.mock('axios');

describe('WeatherService', () => {
    const FAKE_APP_ID = 'myFakeAppId';
    let service: WeatherService;

    beforeEach(() => {
        service = new WeatherService({ appId: FAKE_APP_ID });
    });

    afterEach(() => jest.clearAllMocks());

    it('should get current weather in city calling right API with right payload', () => {
        const cityQuery = 'Lyon';

        service.getCurrentTemperatureInDegreeByCity(cityQuery);

        expect(axios).toHaveBeenCalledWith({
            method: 'GET',
            url: CURRENT_WEATHER_API,
            params: {
                APPID: FAKE_APP_ID,
                q: cityQuery,
                units: 'metric',
            },
        });
    });

    it('should return queried city temperature', async () => {
        const expectedTemperature = 20;
        ((axios as unknown) as Mock).mockResolvedValue({ data: { main: { temp: expectedTemperature } } });

        const res = await service.getCurrentTemperatureInDegreeByCity('Lyon');

        expect(res).toBe(expectedTemperature);
    });

    it('should return null if anything goes wrong with the API', async () => {
        ((axios as unknown) as Mock).mockRejectedValue(null);

        const res = await service.getCurrentTemperatureInDegreeByCity('Lyon');

        expect(res).toBe(null);
    });
});
