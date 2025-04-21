---
icao: "DAAD" 
title: "DAAD - BOU SAADA Charts"
excerpt: "A set of IFR and VFR navigation charts for BOU SAADA Airport"
date: 2025-03-16T00:00:00+01:00
modified: 2025-03-16T00:00:00+01:00
classes: wide
comments: true
header:
  teaser: /content/images/charts/thumbnail.webp
# sidebar:
#   title: "All charts"
#   nav: charts

svg_charts_off:
  gist_user: ""
  gist_id: "fd62cf3d5ee8460293f88ea50be16a28"
  commit_hash: "95763670e1b8d43924e9e2b08319cdc5a3d1cf54"
  files:
    - ref: "10-9"
      file: "DAAD-001-10-9"
      title: "AIRPORT INFO, TAKEOFF MNMS"
    - ref: "13-1"
      file: "DAAD-002-13-1"
      title: "VOR DME RWY22 (CAT C)"
    - ref: "13-2"
      file: "DAAD-003-13-2"
      title: "VOR DME RWY22 (CAT A & B)"
    - ref: "16-1"
      file: "DAAD-004-16-1"
      title: "NDB RWY22"



---

{% include chart-single.html %}

{% if page.svg_charts %}

<div style="display: flex; height: 100vh;">
  <!-- Sidebar for titles -->
  <div id="sidebar" style="width: 30%; overflow-y: auto; background: #f0f0f0; padding: 10px; border-right: 1px solid #ccc;">
    <!-- Titles will be added here dynamically -->
  </div>

  <!-- Viewer for charts -->
  <div id="viewer" style="width: 70%; padding: 10px; position: relative;">
    <div style="position: absolute; top: 10px; right: 10px; z-index: 10;">
      <button id="zoomIn" style="padding: 5px 10px; font-size: 12px;">➕</button>
      <button id="zoomOut" style="padding: 5px 10px; font-size: 12px;">➖</button>
      <button id="resetZoom" style="padding: 5px 10px; font-size: 12px;">🔄</button>
    </div>
    <div id="svgScrollContainer" style="width: 100%; height: 100%; overflow: auto; border: 1px solid #ccc; background: white;">
      <div id="svgContainer" style="transform-origin: top left;"></div>
    </div>
  </div>
</div>


<script>

  let activeButton = null;

const gistUser = "{{ page.svg_charts.gist_user }}";
const gistId = "{{ page.svg_charts.gist_id }}";
const commitHash = "{{ page.svg_charts.commit_hash }}";

const charts = [
  {% for item in page.svg_charts.files %}
    {
      title: "{{ item.ref }} {{ item.title }}",
      url: `https://gist.githubusercontent.com/${gistUser}/${gistId}/raw/${commitHash}/{{ item.file }}.xml`
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];


const sidebar = document.getElementById('sidebar');
const svgScrollContainer = document.getElementById('svgScrollContainer'); // ✅ Select the scrollable container
const svgContainer = document.getElementById('svgContainer');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const resetZoomBtn = document.getElementById('resetZoom');



let zoomLevel = 1;

// Create sidebar buttons dynamically
charts.forEach((chart) => {
  const button = document.createElement('button');
  button.textContent = chart.title;
  button.style.display = "block";
  button.style.width = "100%";
  button.style.marginBottom = "5px";
  button.style.padding = "10px";
  button.style.border = "none";
  button.style.textAlign = "left";
  button.style.cursor = "pointer";
  button.style.background = "#ffffff";
  button.style.borderBottom = "1px solid #ddd";
  button.style.fontSize = "10px";

  button.addEventListener('click', () => {
  loadSVG(chart.url);

  // Highlight active button
  if (activeButton) {
    activeButton.style.backgroundColor = '#ffffff'; // Reset previous
    activeButton.style.color = '#000000';
  }
  button.style.backgroundColor = '#007bff'; // Bootstrap blue or whatever you want
  button.style.color = '#ffffff'; // White text
  activeButton = button;
});

  sidebar.appendChild(button);
});

// ADD this after defining your constants:
const zoomLevelDisplay = document.createElement('div');
zoomLevelDisplay.style.position = 'absolute';
zoomLevelDisplay.style.top = '10px';
zoomLevelDisplay.style.left = '10px';
zoomLevelDisplay.style.backgroundColor = 'rgba(255,255,255,0.8)';
zoomLevelDisplay.style.padding = '5px 10px';
zoomLevelDisplay.style.borderRadius = '5px';
zoomLevelDisplay.style.fontSize = '12px';
zoomLevelDisplay.style.fontWeight = 'bold';
zoomLevelDisplay.style.zIndex = '10';
document.getElementById('viewer').appendChild(zoomLevelDisplay);



// Load SVG function
async function loadSVG(url) {
  svgContainer.innerHTML = "Loading chart...";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch SVG");
    const svgText = await response.text();
    svgContainer.innerHTML = svgText; // Insert SVG code into container

    // ⬇️ NEW: Adjust SVG properties
    const svgElement = svgContainer.querySelector('svg');
    if (svgElement) {
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', 'auto');
      svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }

    zoomLevel = 1; // Reset zoom to natural
    applyZoom();
  } catch (err) {
    svgContainer.innerHTML = "Error loading chart.";
    console.error(err);
  }
}




// Modify your applyZoom function:
function applyZoom() {
  svgContainer.style.transform = `scale(${zoomLevel})`;
  zoomLevelDisplay.textContent = `${Math.round(zoomLevel * 100)}%`;
}

zoomInBtn.addEventListener('click', () => {
  zoomLevel += 0.2;
  applyZoom();
});

zoomOutBtn.addEventListener('click', () => {
  zoomLevel = Math.max(0.2, zoomLevel - 0.2);
  applyZoom();
});

resetZoomBtn.addEventListener('click', () => {
  zoomLevel = 1;
  applyZoom();
  svgScrollContainer.scrollLeft = 0; 
  svgScrollContainer.scrollTop = 0;  

  svgScrollContainer.style.overflow = 'hidden';
setTimeout(() => {
  svgScrollContainer.style.overflow = 'auto';
}, 50);
});

svgScrollContainer.addEventListener('dblclick', (e) => {
  zoomLevel += 0.5; // Zoom in faster with double-click
  applyZoom();
});


// Load the first chart by default
loadSVG(charts[0].url);

// 🖐️ Add Dragging functionality
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

svgScrollContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - svgScrollContainer.offsetLeft;
  startY = e.pageY - svgScrollContainer.offsetTop;
  scrollLeft = svgScrollContainer.scrollLeft;
  scrollTop = svgScrollContainer.scrollTop;
  svgScrollContainer.style.cursor = "grabbing"; // Change cursor
});

svgScrollContainer.addEventListener('mouseleave', () => {
  isDragging = false;
  svgScrollContainer.style.cursor = "default";
});

svgScrollContainer.addEventListener('mouseup', () => {
  isDragging = false;
  svgScrollContainer.style.cursor = "default";
});

svgScrollContainer.addEventListener('wheel', (e) => {
  if (e.ctrlKey) { // Only if Ctrl is pressed
    e.preventDefault(); // Stop the browser zoom
    if (e.deltaY < 0) {
      zoomLevel += 0.1; // Zoom In
    } else {
      zoomLevel = Math.max(0.2, zoomLevel - 0.1); // Zoom Out
    }
    applyZoom();
  }
}, { passive: false });


svgScrollContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - svgScrollContainer.offsetLeft;
  const y = e.pageY - svgScrollContainer.offsetTop;
  const walkX = (x - startX) * 1; // Sensitivity
  const walkY = (y - startY) * 1; // Sensitivity
  svgScrollContainer.scrollLeft = scrollLeft - walkX;
  svgScrollContainer.scrollTop = scrollTop - walkY;
});

let lastTouchDistance = null;

svgScrollContainer.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) { // 2 fingers
    e.preventDefault(); // Prevent scrolling page
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const currentTouchDistance = Math.hypot(
      touch2.pageX - touch1.pageX,
      touch2.pageY - touch1.pageY
    );

    if (lastTouchDistance) {
      if (currentTouchDistance > lastTouchDistance + 5) {
        zoomLevel += 0.02;
        applyZoom();
      } else if (currentTouchDistance < lastTouchDistance - 5) {
        zoomLevel = Math.max(0.2, zoomLevel - 0.02);
        applyZoom();
      }
    }
    lastTouchDistance = currentTouchDistance;
  }
}, { passive: false });

svgScrollContainer.addEventListener('touchend', () => {
  lastTouchDistance = null;
});

</script>

{% endif %}

