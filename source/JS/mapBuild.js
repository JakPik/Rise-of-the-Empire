function buildMap(data) {
    const map = L.map('map', {
        crs: L.CRS.Simple, // Use simple Cartesian coordinates for custom maps
        minZoom: -4,
        maxZoom: 3
    });
    const test = data['setup']['image_size'];
    const bounds = [[0,0],data['setup']['image_size']]; // map bounds
    const image = L.imageOverlay(data['setup']['image'], bounds).addTo(map);
    map.fitBounds(bounds);

    // Add a marker
    const markers = data['markers'];
    for (const key in markers) {
        const mark = markers[key];
        L.marker(mark['position']).addTo(map).bindPopup(mark['link']);
    }
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
        "image": "Images/naoki.jpg",
        "image_size": [1000, 1000]
    },
    "markers": {
        "mark": {
            "position": [20, 50],
            "link": "link to note"
        },
        "marker name": {
            "position": [200, 500],
            "link": "Hi"
        }
    }
};

buildMap(data);