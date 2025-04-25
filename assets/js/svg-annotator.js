
function initSvgViewer(charts, githubUser, githubRepo, branch, icao) {


const sidebar = document.getElementById('sidebar');
const svgScrollContainer = document.getElementById('svgScrollContainer'); // ✅ Select the scrollable container
const svgContainer = document.getElementById('svgContainer');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const resetZoomBtn = document.getElementById('resetZoom');
const popoutBtn = document.getElementById('popoutViewer');
const fullscreen = document.getElementById('fullscreenViewer');
const fullscreenContent = document.getElementById('fullscreenContent');
const viewerControls = document.getElementById('viewerControls');
const backdrop = document.getElementById('fullscreenBackdrop');

let zoomLevel = 1;
let currentWorker = null;
let firstButton = null;

charts.forEach((chart, index) => {
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

    if (activeButton) {
      activeButton.style.backgroundColor = '#ffffff';
      activeButton.style.color = '#000000';
    }
    button.style.backgroundColor = '#007bff';
    button.style.color = '#ffffff';
    activeButton = button;
  });

  sidebar.appendChild(button);

  if (index === 0) {
    firstButton = button;
  }
});

if (firstButton) {
  window.addEventListener('DOMContentLoaded', () => {
    firstButton.click();
  });
}

async function loadSVG(url) {
  svgContainer.innerHTML = "Loading chart...";

  try {
    // Cancel the previous worker if still running
    if (currentWorker) {
      currentWorker.terminate();
      currentWorker = null;
    }

    // Create a new worker
    const worker = new Worker(svgWorkerPath);

    currentWorker = worker; // track the current one

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch SVG");

    const reversedBase64 = await response.text();
    worker.postMessage(reversedBase64);

    worker.onmessage = function (e) {
      if (e.data.success) {
        svgContainer.innerHTML = e.data.svg;
        const svgElement = svgContainer.querySelector('svg');
        if (svgElement) {
          svgElement.setAttribute('width', '100%');
          svgElement.setAttribute('height', 'auto');
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }
        zoomLevel = 1;
        applyZoom();
      } else {
        svgContainer.innerHTML = `<div style="color:red;">❌ Worker error: ${e.data.error}</div>`;
      }

      // Cleanup: clear the reference
      worker.terminate();
      currentWorker = null;
    };
  } catch (error) {
    svgContainer.innerHTML = `<div style="color:red;">❌ Error: ${error.message}</div>`;
  }
}



function applyZoom() {
  svgContainer.style.transform = `scale(${zoomLevel})`;

  const zoomDisplay = document.getElementById('zoomDisplay');
  if (zoomDisplay) {
    zoomDisplay.textContent = `${Math.round(zoomLevel * 100)}%`;
  }

  svgScrollContainer.style.overflow = 'hidden';
  setTimeout(() => {
    svgScrollContainer.style.overflow = 'auto';
  }, 10);
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
  zoomLevel += 0.5; 
  applyZoom();
});


if (charts.length > 0) {
  loadSVG(charts[0].url);
}

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



  const closeFullscreenBtn = document.getElementById('closeFullscreenBtn');
  const originalViewerContainer = document.getElementById('viewer');

  popoutBtn.addEventListener('click', () => {
  fullscreenContent.appendChild(svgScrollContainer);
  fullscreen.style.display = 'block';
  backdrop.style.display = 'block';
  setTimeout(() => {
  svgScrollContainer.style.overflow = 'hidden';
  setTimeout(() => {
    svgScrollContainer.style.overflow = 'auto';
  }, 10);
}, 50);
popoutBtn.style.display = 'none';
svgScrollContainer.scrollLeft = 0;
svgScrollContainer.scrollTop = 0;

});

closeFullscreenBtn.addEventListener('click', () => {
  originalViewerContainer.appendChild(svgScrollContainer);
  fullscreen.style.display = 'none';
  backdrop.style.display = 'none';
  popoutBtn.style.display = 'inline-block';
});

backdrop.addEventListener('click', () => {
  closeFullscreenBtn.click(); // Reuse the close logic
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && fullscreen.style.display === 'block') {
    closeFullscreenBtn.click();
  }
});

// ANNONATIONS 

const undoStack = [];
const redoStack = [];

let drawMode = null;
let selectedElement = null;
let tempShape = null;
let drawStart = null;
let isMoving = false;
let moveOffset = { x: 0, y: 0 };

let freehandPoints = [];

const toggleButtons = document.querySelectorAll('.toggle-btn');
toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.getAttribute('data-mode');
    if (drawMode === mode) {
      drawMode = null;
      btn.classList.remove('active');
      svgScrollContainer.style.cursor = 'default';
    } else {
      drawMode = mode;
      toggleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      svgScrollContainer.style.cursor = (drawMode === 'select') ? 'default' : 'crosshair';
    }
    if (selectedElement) {
      selectedElement.classList.remove('selected');
      selectedElement = null;
    }
  });
});

function deleteSelected() {
  if (selectedElement) {
    selectedElement.remove();
    selectedElement = null;
  }
}
function clearAnnotations() {
  const svg = svgScrollContainer.querySelector('svg');
  if (svg) {
    svg.querySelectorAll('.annotation').forEach(el => el.remove());
  }
  selectedElement = null;
}

function undoAnnotation() {
  const svg = svgScrollContainer.querySelector('svg');
  if (!svg || !undoStack.length) return;

  const last = undoStack.pop();
  if (last && svg.contains(last)) {
    svg.removeChild(last);
    redoStack.push(last);
  }
}

function redoAnnotation() {
  const svg = svgScrollContainer.querySelector('svg');
  if (!svg || !redoStack.length) return;

  const toRestore = redoStack.pop();
  svg.appendChild(toRestore);
  undoStack.push(toRestore);
}


svgScrollContainer.addEventListener('mousedown', (e) => {
  const svg = svgScrollContainer.querySelector('svg');
  if (!svg || !drawMode || e.target.closest('#annotationToolbar')) return;

  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const loc = pt.matrixTransform(svg.getScreenCTM().inverse());

  drawStart = loc;
  const color = document.getElementById('colorPicker').value;

  if (drawMode === 'line' || drawMode === 'arrow') {
    tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tempShape.setAttribute('x1', loc.x);
    tempShape.setAttribute('y1', loc.y);
    tempShape.setAttribute('x2', loc.x);
    tempShape.setAttribute('y2', loc.y);
    tempShape.setAttribute('stroke', color);
    tempShape.setAttribute('stroke-width', '2');
    if (drawMode === 'arrow') {
      tempShape.setAttribute('marker-end', 'url(#arrowhead)');
    tempShape.setAttribute('color', color);
    }
  } else if (drawMode === 'circle') {
    tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    tempShape.setAttribute('cx', loc.x);
    tempShape.setAttribute('cy', loc.y);
    tempShape.setAttribute('r', 0);
    tempShape.setAttribute('stroke', color);
    tempShape.setAttribute('stroke-width', '2');
    tempShape.setAttribute('fill', 'rgba(0,0,0,0)');
  } else if (drawMode === 'freehand') {
    tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    freehandPoints = [`M${loc.x},${loc.y}`];
    tempShape.setAttribute('d', freehandPoints.join(' '));
    tempShape.setAttribute('stroke', color);
    tempShape.setAttribute('stroke-width', '2');
    tempShape.setAttribute('fill', 'none');
  } else if (drawMode === 'text') {
    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textEl.setAttribute('x', loc.x);
    textEl.setAttribute('y', loc.y);
    textEl.setAttribute('fill', color);
    textEl.setAttribute('font-size', '16');
    textEl.textContent = prompt("Enter text:", "Hold here") || "";
    textEl.classList.add('annotation');
    svg.appendChild(textEl);
  } else if (drawMode === 'select') {
  if (e.target.classList.contains('annotation')) {
    if (selectedElement) selectedElement.classList.remove('selected');
    selectedElement = e.target;
    selectedElement.classList.add('selected');

    const svg = svgScrollContainer.querySelector('svg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const loc = pt.matrixTransform(svg.getScreenCTM().inverse());

    // Save offset for drag
    if (selectedElement.tagName === 'text') {
      moveOffset.x = loc.x - parseFloat(selectedElement.getAttribute('x'));
      moveOffset.y = loc.y - parseFloat(selectedElement.getAttribute('y'));
    } else if (selectedElement.tagName === 'circle') {
      moveOffset.x = loc.x - parseFloat(selectedElement.getAttribute('cx'));
      moveOffset.y = loc.y - parseFloat(selectedElement.getAttribute('cy'));
    } else if (selectedElement.tagName === 'line') {
      moveOffset.x = loc.x - parseFloat(selectedElement.getAttribute('x1'));
      moveOffset.y = loc.y - parseFloat(selectedElement.getAttribute('y1'));
    } else if (selectedElement.tagName === 'path') {
      moveOffset.x = 0; // We'll skip freehand for now
      moveOffset.y = 0;
    }

    isMoving = true;
  } else {
    if (selectedElement) selectedElement.classList.remove('selected');
    selectedElement = null;
  }
}


  if (tempShape) {
    tempShape.classList.add('annotation');
    svg.appendChild(tempShape);
    undoStack.push(tempShape);
    redoStack.length = 0; // Clear redo stack on new action

  }
});

svgScrollContainer.addEventListener('mousemove', (e) => {
  if (!drawMode || !tempShape || !drawStart) return;
  const svg = svgScrollContainer.querySelector('svg');
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const loc = pt.matrixTransform(svg.getScreenCTM().inverse());

  if (drawMode === 'line' || drawMode === 'arrow') {
    tempShape.setAttribute('x2', loc.x);
    tempShape.setAttribute('y2', loc.y);
  } else if (drawMode === 'circle') {
    const dx = loc.x - drawStart.x;
    const dy = loc.y - drawStart.y;
    const r = Math.sqrt(dx * dx + dy * dy);
    tempShape.setAttribute('r', r);
  } else if (drawMode === 'freehand') {
    freehandPoints.push(`L${loc.x},${loc.y}`);
    tempShape.setAttribute('d', freehandPoints.join(' '));
  }
});

svgScrollContainer.addEventListener('mouseup', () => {
  isMoving = false;
  tempShape = null;
  drawStart = null;
});

const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgDefs.innerHTML = `
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
      <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
    </marker>
  </defs>
`;

document.body.appendChild(svgDefs);

const toggleToolbarBtn = document.getElementById('toggleToolbarBtn');
const annotationToolbar = document.getElementById('annotationToolbar');

toggleToolbarBtn.addEventListener('click', () => {
  if (annotationToolbar.style.display === 'none') {
    annotationToolbar.style.display = 'flex';
  } else {
    annotationToolbar.style.display = 'none';
  }
});


document.addEventListener('keydown', function (e) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const ctrl = isMac ? e.metaKey : e.ctrlKey;

  // Undo: Ctrl+Z / Cmd+Z
  if (ctrl && e.key === 'z' && !e.shiftKey) {
    e.preventDefault();
    undoAnnotation();
  }

  // Redo: Ctrl+Y or Cmd+Shift+Z
  if ((ctrl && e.key === 'y') || (isMac && ctrl && e.key === 'Z' && e.shiftKey)) {
    e.preventDefault();
    redoAnnotation();
  }
});

// Optional: Hide toolbar by default when entering fullscreen
annotationToolbar.style.display = 'none';

console.log("Viewer initialized for:", icao);
}