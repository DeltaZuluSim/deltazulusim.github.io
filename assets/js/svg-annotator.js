function initSvgViewer(charts, githubUser, githubRepo, branch, icao) {
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
          svgContainer.innerHTML = `<div style="color:red;">❌ Worker error: ${e.data.error}</div>`;
        }

        worker.terminate();
        currentWorker = null;
      };
    } catch (error) {
      svgContainer.innerHTML = `<div style="color:red;">❌ Error: ${error.message}</div>`;
    }
  };

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

  svgScrollContainer.addEventListener('dblclick', () => {
    zoomLevel += 0.5;
    applyZoom();
  });

  if (charts.length > 0) {
    loadSvgChart(charts[0].url);
  }

  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  svgScrollContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - svgScrollContainer.offsetLeft;
    startY = e.pageY - svgScrollContainer.offsetTop;
    scrollLeft = svgScrollContainer.scrollLeft;
    scrollTop = svgScrollContainer.scrollTop;
    svgScrollContainer.style.cursor = "grabbing";
  });

  svgScrollContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    svgScrollContainer.style.cursor = "default";
  });

  svgScrollContainer.addEventListener('mouseup', () => {
    isDragging = false;
    svgScrollContainer.style.cursor = "default";
  });

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

  svgScrollContainer.addEventListener('touchend', () => {
    window.lastTouchDistance = null;
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
    closeFullscreenBtn.click();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullscreen.style.display === 'block') {
      closeFullscreenBtn.click();
    }
  });

  // ↓ Your annotation system stays untouched ↓
  // ✅ Keep everything below this line exactly as it is from your current file
  // (drawing, selecting, undo/redo, freehand, etc.)

  // ... [Annotation logic remains unchanged]
  // (Just keep it under this section as in your current code)

  console.log("Viewer initialized for:", icao);
}
