---
title: "DAAG Charts"
excerpt: "A set of IFR and VFR navigation charts for ALGIERS, HOUARI BOUMEDIENE Airport"
toc: false
date: 2025-03-16T00:00:00+01:00
last_modified_at: 2025-03-16T00:00:00+01:00
coordinates: "[36.698286, 3.206823]"
classes: wide
icao: DAAG 
documents:
  - "https://drive.google.com/file/d/1JQtnGcg-hHs6ORBe5QFHtDJivDILkRdH/view"
  - "https://drive.google.com/file/d/1wu0MRYUViMnTgfenwiai_AqnZRgUATQj/view"
  #caption: "Photo credit: [**DZS**](https://deltazulusim.com)"
sidebar:
  - title: "Airport"
    text: "ALGIERS, HOUARI BOUMEDIENE"
  - title: "ICAO"
    text: "DAAG"

---

{% include map-single.html coordinates=page.coordinates military=false %}

## IFR Charts

<a href="https://deltazulusim.short.gy/charts/{{ page.icao | downcase }}" class="btn btn--success">
    <i class="fas fa-download"></i> Download
</a>

## VFR Charts

<button id="togglePdfButton" class="btn btn--success"><i class="fas fa-eye"></i> View</button>

<div id="pdfContainer" class="pdf-container" style="display: none;">
    <button id="prevDoc" class="prev-doc btn btn-secondary">Previous Document</button>
    <button id="nextDoc" class="next-doc btn btn-secondary">Next Document</button>
    <p class="loading-text">Loading PDF...</p>
    <div id="pdfViewer" class="pdf-scroll-container"></div>
</div>

<style>
    .pdf-container {
        margin-top: 10px;
        position: relative;
    }
    
    .pdf-scroll-container {
        overflow-y: auto;
        height: 600px;
        border: 1px solid #ddd;
        padding: 0;
        margin: 0;
        background-color: #f8f8f8;
        position: relative;
    }

    .open-external {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        color: #007bff;
        cursor: pointer;
        text-decoration: none;
        background: white;
        padding: 5px;
        border-radius: 5px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
    }
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

    // ✅ Extracting the URLs dynamically from Jekyll YAML data
    var pdfUrls = [
        {% for doc in page.documents %}
            "{{ doc }}"{% unless forloop.last %}, {% endunless %}
        {% endfor %}
    ];

    var currentIndex = 0;
    var toggleButton = document.getElementById("togglePdfButton");
    var pdfContainer = document.getElementById("pdfContainer");
    var pdfViewer = document.getElementById("pdfViewer");
    var loadingText = document.querySelector(".loading-text");
    var prevDocBtn = document.getElementById("prevDoc");
    var nextDocBtn = document.getElementById("nextDoc");

    let pdfLoadingTask = null;
    let renderTask = null;
    let isLoading = false;

    function disableButtonsForTwoSeconds() {
        toggleButton.disabled = true;
        prevDocBtn.disabled = true;
        nextDocBtn.disabled = true;

        setTimeout(() => {
            toggleButton.disabled = false;
            prevDocBtn.disabled = (currentIndex === 0);
            nextDocBtn.disabled = (currentIndex === pdfUrls.length - 1);
        }, 2000);
    }

    async function loadPDF(pdfUrl) {
        disableButtonsForTwoSeconds();
        pdfViewer.innerHTML = "";
        loadingText.style.display = "block";

        try {
            if (pdfUrl.includes("drive.google.com")) {
                let fileId = pdfUrl.match(/\/d\/(.*?)\//);
                if (fileId) {
                    pdfUrl = `https://drive.google.com/file/d/${fileId[1]}/preview`;
                }

                let iframe = document.createElement("iframe");
                iframe.src = pdfUrl;
                iframe.width = "100%";
                iframe.height = "600px";
                iframe.style.border = "none";

                pdfViewer.appendChild(iframe);
                loadingText.style.display = "none";
                return;
            }

            pdfLoadingTask = pdfjsLib.getDocument({ url: pdfUrl });
            let pdfDoc = await pdfLoadingTask.promise;
            loadingText.style.display = "none";

            let page = await pdfDoc.getPage(1);
            let scale = 1.5;
            let viewport = page.getViewport({ scale: scale });

            let canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            pdfViewer.appendChild(canvas);

            let ctx = canvas.getContext("2d");
            let renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            renderTask = page.render(renderContext);
            await renderTask.promise;

        } catch (error) {
            console.error("Error loading PDF:", error);
            loadingText.textContent = "Failed to load PDF. Click View again.";
        }
    }

    prevDocBtn.addEventListener("click", function () {
        if (!isLoading && currentIndex > 0) {
            currentIndex--;
            disableButtonsForTwoSeconds();
            loadPDF(pdfUrls[currentIndex]);
        }
    });

    nextDocBtn.addEventListener("click", function () {
        if (!isLoading && currentIndex < pdfUrls.length - 1) {
            currentIndex++;
            disableButtonsForTwoSeconds();
            loadPDF(pdfUrls[currentIndex]);
        }
    });

    toggleButton.addEventListener("click", function () {
        disableButtonsForTwoSeconds();
        let icon = this.querySelector("i");
        let textNode = this.querySelector("span"); // Target the span for text

        if (pdfContainer.style.display === "block") {
            pdfContainer.style.display = "none";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
            textNode.textContent = " View";
            toggleButton.classList.remove("btn-danger");
            toggleButton.classList.add("btn-success");
        } else {
            pdfContainer.style.display = "block";
            loadPDF(pdfUrls[currentIndex]);
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
            textNode.textContent = " Close";
            toggleButton.classList.remove("btn-success");
            toggleButton.classList.add("btn-danger");
        }
    });

    prevDocBtn.disabled = (currentIndex === 0);
    nextDocBtn.disabled = (currentIndex === pdfUrls.length - 1);
});
</script>


