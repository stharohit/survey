export const geoLocation = (callback: PositionCallback) => {
    return navigator.geolocation.getCurrentPosition(callback);
}