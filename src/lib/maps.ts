export function createGoogleMapsDirectionsUrl(
  destinationLatitude: number,
  destinationLongitude: number,
  originLatitude?: number | null,
  originLongitude?: number | null
) {
  const destination = `${destinationLatitude},${destinationLongitude}`;

  if (originLatitude && originLongitude) {
    const origin = `${originLatitude},${originLongitude}`;

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
}
export function createGoogleMapsPlaceUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}
