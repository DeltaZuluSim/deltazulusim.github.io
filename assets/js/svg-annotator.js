function initSvgViewer(charts, githubUser, githubRepo, branch, icao, svgWorkerPath) {
  const svgScrollContainer = document.getElementById('svgScrollContainer');
  const svgContainer = document.getElementById('svgContainer');
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const resetZoomBtn = document.getElementById('resetZoom');
  const popoutBtn = document.getElementById('popoutViewer');
  const fullscreen = document.getElementById('fullscreenViewer');
  const fullscreenContent = document.getElementById('fullscreenContent');
  const backdrop = document.getElementById('fullscreenBackdrop');

  let zoomLevel = 1;
  let currentWorker = null;

  window.loadSvgChart = async function(url) {
    svgContainer.innerHTML = "Loading chart...";
    try {
      if (currentWorker) {
        currentWorker.terminate();
        currentWorker = null;
      }

      const worker = new Worker(svgWorkerPath);
      currentWorker = worker;

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
            svgElement.setAttribute('height', '100%');
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          }
          zoomLevel = 1;
          applyZoom();
        } else {
          svgContainer.innerHTML = `<div style="color:red;">\u274C Worker error: ${e.data.error}</div>`;
        }

        worker.terminate();
        currentWorker = null;
      };
    } catch (error) {
      svgContainer.innerHTML = `<div style="color:red;">\u274C Error: ${error.message}</div>`;
    }
  };

  function applyZoom() {
    svgContainer.style.transform = `scale(${zoomLevel})`;
    const zoomDisplay = document.getElementById('zoomDisplay');
    if (zoomDisplay) {
      zoomDisplay.textContent = `${Math.round(zoomLevel * 100)}%`;
    }
    svgScrollContainer.style.overflow = 'hidden';
    setTimeout(() => { svgScrollContainer.style.overflow = 'auto'; }, 10);
  }

  zoomInBtn.addEventListener('click', () => { zoomLevel += 0.2; applyZoom(); });
  zoomOutBtn.addEventListener('click', () => { zoomLevel = Math.max(0.2, zoomLevel - 0.2); applyZoom(); });
  resetZoomBtn.addEventListener('click', () => {
    zoomLevel = 1;
    applyZoom();
    svgScrollContainer.scrollLeft = 0;
    svgScrollContainer.scrollTop = 0;
    svgScrollContainer.style.overflow = 'hidden';
    setTimeout(() => { svgScrollContainer.style.overflow = 'auto'; }, 50);
  });

  svgScrollContainer.addEventListener('dblclick', () => { zoomLevel += 0.5; applyZoom(); });

  if (charts.length > 0) { loadSvgChart(charts[0].url); }

  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  svgScrollContainer.addEventListener('mousedown', (e) => {
    if (drawMode && drawMode !== 'select') return; // ➔ Disable dragging when a drawing tool is active
    isDragging = true;
    startX = e.pageX - svgScrollContainer.offsetLeft;
    startY = e.pageY - svgScrollContainer.offsetTop;
    scrollLeft = svgScrollContainer.scrollLeft;
    scrollTop = svgScrollContainer.scrollTop;
    svgScrollContainer.style.cursor = "grabbing";
  });
  

  svgScrollContainer.addEventListener('mouseleave', () => { isDragging = false; svgScrollContainer.style.cursor = "default"; });
  svgScrollContainer.addEventListener('mouseup', () => { isDragging = false; svgScrollContainer.style.cursor = "default"; });

  svgScrollContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - svgScrollContainer.offsetLeft;
    const y = e.pageY - svgScrollContainer.offsetTop;
    svgScrollContainer.scrollLeft = scrollLeft - (x - startX);
    svgScrollContainer.scrollTop = scrollTop - (y - startY);
  });

  svgScrollContainer.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      zoomLevel += (e.deltaY < 0) ? 0.1 : -0.1;
      zoomLevel = Math.max(0.2, zoomLevel);
      applyZoom();
    }
  }, { passive: false });

  svgScrollContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const [touch1, touch2] = e.touches;
      const dist = Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
      if (window.lastTouchDistance) {
        if (dist > window.lastTouchDistance + 5) zoomLevel += 0.02;
        if (dist < window.lastTouchDistance - 5) zoomLevel = Math.max(0.2, zoomLevel - 0.02);
        applyZoom();
      }
      window.lastTouchDistance = dist;
    }
  }, { passive: false });

  svgScrollContainer.addEventListener('touchend', () => { window.lastTouchDistance = null; });

  const closeFullscreenBtn = document.getElementById('closeFullscreenBtn');
  const originalViewerContainer = document.getElementById('viewer');

  popoutBtn.addEventListener('click', () => {
    fullscreenContent.appendChild(svgScrollContainer);
    fullscreen.style.display = 'block';
    backdrop.style.display = 'block';
    setTimeout(() => {
      svgScrollContainer.style.overflow = 'hidden';
      setTimeout(() => { svgScrollContainer.style.overflow = 'auto'; }, 10);
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

  backdrop.addEventListener('click', () => { closeFullscreenBtn.click(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && fullscreen.style.display === 'block') { closeFullscreenBtn.click(); } });

  console.log("Viewer initialized for:", icao);
}

// ✍️ Full Corrected Drawing System for your Toolbar

let drawMode = null;
let tempShape = null;
let drawStart = null;
let freehandPoints = [];
let selectedElement = null;
let isMoving = false;
let moveOffset = { x: 0, y: 0 };

const undoStack = [];
const redoStack = [];

// Activate drawing mode when clicking toolbar buttons
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const mode = btn.getAttribute('data-mode');
    if (drawMode === mode) {
      drawMode = null;
      btn.classList.remove('active');
    } else {
      drawMode = mode;
      document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  });
});

// Start drawing or selecting
const scrollContainer = document.getElementById('svgScrollContainer');
scrollContainer.addEventListener('mousedown', (e) => {
  const svg = document.querySelector('#svgScrollContainer svg');
  if (!svg || !drawMode || e.target.closest('#annotationToolbar')) return;

  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const loc = pt.matrixTransform(svg.getScreenCTM().inverse());

  drawStart = loc;
  const color = document.getElementById('colorPicker').value || '#ff0000';

  if (drawMode === 'line' || drawMode === 'arrow') {
    tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tempShape.setAttribute('x1', loc.x);
    tempShape.setAttribute('y1', loc.y);
    tempShape.setAttribute('x2', loc.x);
    tempShape.setAttribute('y2', loc.y);
    tempShape.setAttribute('stroke', color);
    tempShape.setAttribute('stroke-width', '2');
    tempShape.classList.add('annotation');
    if (drawMode === 'arrow') {
      tempShape.setAttribute('marker-end', 'url(#arrowhead)');
      tempShape.setAttribute('color', color);
    }
    svg.appendChild(tempShape);
  } else if (drawMode === 'circle') {
    tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    tempShape.setAttribute('cx', loc.x);
    tempShape.setAttribute('cy', loc.y);
    tempShape.setAttribute('r', 0);
    tempShape.setAttribute('stroke', color);
    tempShape.setAttribute('stroke-width', '2');
    tempShape.setAttribute('fill', 'none');
    tempShape.classList.add('annotation');
    svg.appendChild(tempShape);
  } else if (drawMode === 'freehand') {
    tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    freehandPoints = [`M${loc.x},${loc.y}`];
    tempShape.setAttribute('d', freehandPoints.join(' '));
    tempShape.setAttribute('stroke', color);
    tempShape.setAttribute('stroke-width', '2');
    tempShape.setAttribute('fill', 'none');
    tempShape.classList.add('annotation');
    svg.appendChild(tempShape);
  } else if (drawMode === 'text') {
    const text = prompt('Enter text:', 'Note');
    if (text) {
      const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textEl.setAttribute('x', loc.x);
      textEl.setAttribute('y', loc.y);
      textEl.setAttribute('fill', color);
      textEl.setAttribute('font-size', '16');
      textEl.textContent = text;
      textEl.classList.add('annotation');
      svg.appendChild(textEl);
      undoStack.push(textEl);
      redoStack.length = 0;
    }
    drawStart = null;
  } else if (drawMode === 'select') {
    const target = e.target.closest('.annotation');
    if (target) {
      if (selectedElement) selectedElement.classList.remove('selected');
      selectedElement = target;
      selectedElement.classList.add('selected');

      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const loc = pt.matrixTransform(svg.getScreenCTM().inverse());

      if (selectedElement.tagName === 'text') {
        moveOffset.x = loc.x - parseFloat(selectedElement.getAttribute('x'));
        moveOffset.y = loc.y - parseFloat(selectedElement.getAttribute('y'));
      } else {
        moveOffset.x = 0;
        moveOffset.y = 0;
      }

      isMoving = true;
    } else {
      if (selectedElement) selectedElement.classList.remove('selected');
      selectedElement = null;
    }
  }
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (!drawStart || !tempShape) return;
  const svg = document.querySelector('#svgScrollContainer svg');
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
    tempShape.setAttribute('r', Math.sqrt(dx * dx + dy * dy));
  } else if (drawMode === 'freehand') {
    freehandPoints.push(`L${loc.x},${loc.y}`);
    tempShape.setAttribute('d', freehandPoints.join(' '));
  }

  if (isMoving && selectedElement && drawMode === 'select') {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
    if (selectedElement.tagName === 'text') {
      selectedElement.setAttribute('x', loc.x - moveOffset.x);
      selectedElement.setAttribute('y', loc.y - moveOffset.y);
    }
  }
});

scrollContainer.addEventListener('mouseup', () => {
  if (tempShape) {
    undoStack.push(tempShape);
    redoStack.length = 0;
  }
  tempShape = null;
  drawStart = null;
  isMoving = false;
});

function undoAnnotation() {
  const svg = document.querySelector('#svgScrollContainer svg');
  if (!svg || !undoStack.length) return;
  const last = undoStack.pop();
  if (svg.contains(last)) {
    svg.removeChild(last);
    redoStack.push(last);
  }
}

function redoAnnotation() {
  const svg = document.querySelector('#svgScrollContainer svg');
  if (!svg || !redoStack.length) return;
  const redoEl = redoStack.pop();
  svg.appendChild(redoEl);
  undoStack.push(redoEl);
}

function deleteSelected() {
  if (selectedElement) {
    selectedElement.remove();
    selectedElement = null;
  }
}

function clearAnnotations() {
  const svg = document.querySelector('#svgScrollContainer svg');
  if (svg) svg.querySelectorAll('.annotation').forEach(el => el.remove());
  selectedElement = null;
}

// Create the SVG defs for the arrow marker once
if (!document.getElementById('arrowhead')) {
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defs.innerHTML = `
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
      </marker>
    </defs>
  `;
  document.body.appendChild(defs);
}

document.addEventListener('DOMContentLoaded', function () {
  const toggleToolbarBtn = document.getElementById('toggleToolbarBtn');
  const annotationToolbar = document.getElementById('annotationToolbar');

  if (toggleToolbarBtn && annotationToolbar) {
    toggleToolbarBtn.addEventListener('click', function () {
      if (annotationToolbar.style.display === 'none' || annotationToolbar.style.display === '') {
        annotationToolbar.style.display = 'flex';
      } else {
        annotationToolbar.style.display = 'none';
      }
    });
  }
});