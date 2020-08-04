import axios from 'axios';

export const WEATHER_BASE_API = 'https://api.openweathermap.org/data/2.5';
export const CURRENT_WEATHER_API = `${WEATHER_BASE_API}/weather`;
export const WEATHER_SERVICE_KEY = Symbol();

export class WeatherService {
    private readonly appId: string;

    constructor({ appId }: { appId: string }) {
        this.appId = appId;
    }

    async getCurrentTemperatureInDegreeByCity(city: string): Promise<number | null> {
        try {
            const res = await axios({
                method: 'GET',
                url: CURRENT_WEATHER_API,
                params: {
                    APPID: this.appId,
                    q: city,
                    units: 'metric',
                },
            });

            return res.data.main.temp;
        } catch {
            return null;
        }
    }
}
