navigator.geolocation.getCurrentPosition(success, error, options);


var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
}

function handleError(error) {
  // Display error based on the error code.
  const { code } = error;
  switch (code) {
    case GeolocationPositionError.TIMEOUT:
      // Handle timeout.
      break;
    case GeolocationPositionError.PERMISSION_DENIED:
      // User denied the request.
      break;
    case POSITION_UNAVAILABLE:
      // Position not available.
      break;
    default:
      // Anything else...
  }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}
