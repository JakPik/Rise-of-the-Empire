var layers = [];

function buildMap(data) {
    const map = L.map('map', {
        crs: L.CRS.Simple, // Use simple Cartesian coordinates for custom maps
        zoom: -3,
        minZoom: -3,
        maxZoom: 1,
        zoomSnap: 0.5,
        zoomDelta: 0.5,
    });
    const test = data['setup']['image_size'];
    const bounds = [[0,0],data['setup']['image_size']]; // map bounds
    const image = L.imageOverlay(data['setup']['image'], bounds).addTo(map);
    map.fitBounds(bounds);

    map.on('zoomend', () => {
        adjustMarkerVisibility(map);
});
    for(var i=-3; i<=1; i++)  {
        layers.push(L.layerGroup());
    }
    // Add a marker
    const markers = data['markers'];
    for (const key in markers) {
        const mark = markers[key];
        const z = mark['position'][0];
        const y = mark['position'][1];
        const x = mark['position'][2];
        const fileName = mark['link'].split('/').pop().replace('.md','');
        const marker = L.marker([y,x]).bindTooltip(fileName, {
  direction: 'top',  // 👈 position above
  offset: [-15, -15],   // 👈 shift it upward slightly (optional)
  className: 'my-tooltip'
});
        marker.on('click', () => loadMarkdownPage(mark['link']));
        layers[3+z].addLayer(marker);
    }
    adjustMarkerVisibility(map);
}

function adjustMarkerVisibility(map) {
    const currentZoom = map.getZoom();
    for(var i=0; i<5; i++) {
        map.removeLayer(layers[i]);
    }
    map.addLayer(layers[Math.round(3+currentZoom-0.1)]);
}

async function startMapBuild(pageId) {
    try {
        const data = await fetch(pageId)
    .then(res => res.json());
        buildMap(data);

    }
    catch(err) {
        contentEl.innerHTML = '<p>Error loading file: ' + err.message + '</p>';
    }
}

const data = {
    "setup": {
        "image": "Images/svet.jpg",
        "image_size": [5504, 8192]
    },
    "markers": {
        "mark1": {
            "position": [-3, 20, 50],
            "link": "link/to/note.md"
        },
        "mark2": {
            "position": [-3, 200, 500],
            "link": "Hi"
        }
    }
};

buildMap(data);