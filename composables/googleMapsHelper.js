let isGoogleMapsLoaded=false;


export const loadGoogleMapsApi = (apiKey) => {
    return new Promise((resolve, reject) => {
      if (isGoogleMapsLoaded) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        isGoogleMapsLoaded = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Google Maps'));
      document.head.appendChild(script);
    });
  };




export const reverseGeocode = (location) => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            resolve(results[0]); // Return only the first, most specific result
          } else {
            reject(new Error('No results found'));
          }
        } else {
          reject(new Error('Geocoder failed due to: ' + status));
        }
      });
    });
  };
