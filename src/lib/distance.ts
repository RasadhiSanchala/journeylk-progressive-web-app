export function calculateDistanceInKm(
  startLatitude: number,
  startLongitude: number,
  endLatitude: number,
  endLongitude: number,
): number {
  const earthRadiusKm = 6371;
  const latitudeDifference = toRadians(endLatitude - startLatitude);
  const longitudeDifference = toRadians(endLongitude - startLongitude);

  const startLatitudeRadians = toRadians(startLatitude);
  const endLatitudeRadians = toRadians(endLatitude);

  const haversineValue =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(startLatitudeRadians) *
      Math.cos(endLatitudeRadians) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const centralAngle = 2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));
  return earthRadiusKm * centralAngle;
}

export function formatDistance(distanceInKm: number): string {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`;
  }

  return `${distanceInKm.toFixed(1)} km`;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
