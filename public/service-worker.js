// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', function fetcher (event) {

    //console.log('fetch');

    var request = event.request;
    // check if request
    if (request.url.indexOf('maptiler.com') > -1) {
        // contentful asset detected
        event.respondWith(
            caches.match(event.request).then(function(response) {
                // return from cache, otherwise fetch from network
                return response || fetch(request);
            })
        );
    }
    // otherwise: ignore event
});
