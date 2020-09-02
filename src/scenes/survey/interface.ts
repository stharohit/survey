export interface WeatherTypes{
    name: string;
    weather: [{ main: string, description: string, icon: string }];
    main: {temp: number, temp_max: number, temp_min: number};
    wind: {speed: number};
}