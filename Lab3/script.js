// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = "pk.eyJ1IjoieXlyYWJiaXQiLCJhIjoiY201d2o2cXFtMDJ2YTJsc2Iyd2xpZW85ZSJ9.GA-F4Xr7nBcpG2jY7yZg9A";

const map = new mapboxgl.Map({
 container: 'map', // container element id
 style: 'mapbox://styles/mapbox/light-v10',
 center: [-0.089932, 51.514442],
 zoom: 14
});

const data_url = 
"https://api.mapbox.com/datasets/v1/yyrabbit/cm6gnnozc1ki01ms2gq4jnb6y/features?access_token=pk.eyJ1IjoieXlyYWJiaXQiLCJhIjoiY201d2o2cXFtMDJ2YTJsc2Iyd2xpZW85ZSJ9.GA-F4Xr7nBcpG2jY7yZg9A";
map.on('load', () => {
 map.addLayer({
 id: 'crimes',
 type: 'circle',
 source: {
 type: 'geojson',
 data: data_url 
 },
 paint: {
 'circle-radius': 10,
 'circle-color': '#eb4d4b',
 'circle-opacity': 0.9
 }
 });
 
 //Slider interaction code goes below
  filterType = ["!=", ["get","Crime type"],"placeholder"];
  filterMonth = ["!=", ["get","Month"], "2023-01"];
document.getElementById('slider').addEventListener('input', (event) => {
//Get the month value from the slider
 const month = parseInt(event.target.value);
 // get the correct format for the data
 formatted_month = '2023-' + ("0" + month).slice(-2)
 //Create a filter
 filterMonth = ['==', ['get', 'Month'], formatted_month]
11
 //set the map filter
map.setFilter('crimes', ['all', filterMonth, filterType]);
 // update text in the UI
 document.getElementById('active-month').innerText = month;
});
 //Radio button interaction code goes below
 document.getElementById('filters').addEventListener('change', (event) => {
 const type = event.target.value;
 console.log(type);
 // update the map filter
 if (type == 'all') {
 filterType = ['!=', ['get', 'Crime type'], 'placeholder'];
 } else if (type == 'shoplifting') {
 filterType = ['==', ['get', 'Crime type'], 'Robbery'];
 } else if (type == 'drugs') {
 filterType = ['==', ['get', 'Crime type'], 'Drugs'];
 } else {
 console.log('error');
 }
map.setFilter('crimes', ['all', filterMonth, filterType]);
});
 });