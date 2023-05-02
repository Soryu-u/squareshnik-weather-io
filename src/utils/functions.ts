export function convertTemperature(temperature: number, temperatureUnit: string): string {
    if (temperatureUnit === 'C') {
        return (temperature - 273.15).toFixed(0)
    } else {
        return (((temperature - 273.15) * 9) / 5 + 32).toFixed(0)
    }
}
