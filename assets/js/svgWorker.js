// svgWorker.js
self.addEventListener('message', function (e) {
    try {
      const reversedBase64 = e.data.trim().replace(/\s+/g, '');
      const base64 = reversedBase64.split('').reverse().join('');
      const svgText = atob(base64);
      self.postMessage({ success: true, svg: svgText });
    } catch (error) {
      self.postMessage({ success: false, error: error.message });
    }
  });
  