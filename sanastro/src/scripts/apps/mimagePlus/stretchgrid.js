const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

let originalImage = null;
let rotation = 0;
let effectMap = []; 

// DOM Elements
const elements = {
  upload: document.getElementById('upload'),
  rotate: document.getElementById('rotate'),
  zoom: document.getElementById('zoom'),
  zoomVal: document.getElementById('zoom-val'),
  labels: document.getElementById('labels'),
  textProb: document.getElementById('text-prob'),
  textProbVal: document.getElementById('text-prob-val'),
  complexity: document.getElementById('complexity'),
  coverage: document.getElementById('coverage'),
  intensity: document.getElementById('intensity'),
  intensityVal: document.getElementById('intensity-val'),
  balance: document.getElementById('balance'),
  balanceVal: document.getElementById('balance-val'),
  wireframe: document.getElementById('wireframe'),
  showText: document.getElementById('show-text'),
  exportPng: document.getElementById('export-png')
};

// Event Listeners
elements.upload.addEventListener('change', handleUpload);
elements.rotate.addEventListener('click', () => { rotation = (rotation + 90) % 360; generateEffectMap(); render(); });
elements.zoom.addEventListener('input', (e) => { elements.zoomVal.textContent = e.target.value; render(); });

// seed regenerating triggers
['complexity', 'coverage', 'intensity', 'balance', 'labels', 'textProb'].forEach(id => {
  elements[id].addEventListener('input', (e) => {
    if(id === 'intensity') elements.intensityVal.textContent = e.target.value;
    if(id === 'textProb') elements.textProbVal.textContent = e.target.value;
    if(id === 'balance') {
      const h = e.target.value;
      const v = 100 - h;
      elements.balanceVal.textContent = `${h}H / ${v}V`;
    }
    generateEffectMap();
    render();
  });
});

// non seed regenerating triggers
['wireframe', 'showText'].forEach(id => {
  elements[id].addEventListener('change', render);
});

elements.exportPng.addEventListener('click', exportCanvas);

// image paste
document.addEventListener('paste', (e) => {
  const items = (e.clipboardData || e.originalEvent.clipboardData).items;
  for (let index in items) {
    const item = items[index];
    if (item.kind === 'file' && item.type.startsWith('image/')) {
      const blob = item.getAsFile();
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          originalImage = img;
          rotation = 0;
          generateEffectMap();
          render();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(blob);
    }
  }
});

function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      rotation = 0;
      generateEffectMap();
      render();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function getLabels() {
  const text = elements.labels.value;
  if (!text.trim()) return [];
  return text.split(',').map(s => s.trim()).filter(s => s);
}

// check if a specific normalized rectangle is purely transparent
function isRectEmpty(rectX, rectY, rectW, rectH, imgW, imgH, pixelData) {
  const px = Math.floor(rectX * imgW);
  const py = Math.floor(rectY * imgH);
  const pw = Math.max(1, Math.floor(rectW * imgW));
  const ph = Math.max(1, Math.floor(rectH * imgH));
  
  const startX = Math.max(0, px);
  const startY = Math.max(0, py);
  const endX = Math.min(imgW, px + pw);
  const endY = Math.min(imgH, py + ph);
  
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      // alpha channel is index 3 in RGBA
      const alpha = pixelData[(y * imgW + x) * 4 + 3];
      if (alpha > 10) return false;
    }
  }
  return true; // fully transparent
}

function generateEffectMap() {
  if (!originalImage) return;

  // 1. set up temporary canvas to read image alpha data
  let w = originalImage.width;
  let h = originalImage.height;
  if (rotation === 90 || rotation === 270) {
    w = originalImage.height;
    h = originalImage.width;
  }

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = w;
  tempCanvas.height = h;
  const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
  
  tempCtx.save();
  tempCtx.translate(w / 2, h / 2);
  tempCtx.rotate(rotation * Math.PI / 180);
  tempCtx.drawImage(originalImage, -originalImage.width / 2, -originalImage.height / 2);
  tempCtx.restore();

  const imgData = tempCtx.getImageData(0, 0, w, h).data;

  // 2. perform subdivision KD-Tree
  let rects = [];
  
  // apparently i should only start subdividing if the whole image isn't purely empty
  if (!isRectEmpty(0, 0, 1, 1, w, h, imgData)) {
    rects.push({ x: 0, y: 0, w: 1, h: 1 });
  }

  const numSplits = parseInt(elements.complexity.value);

  for (let i = 0; i < numSplits; i++) {
    if (rects.length === 0) break;

    // weight probability towards larger rectangles
    let rIndex = 0;
    let maxArea = 0;
    for (let j = 0; j < rects.length; j++) {
      const area = rects[j].w * rects[j].h;
      if (area * Math.random() > maxArea) {
        maxArea = area * Math.random();
        rIndex = j;
      }
    }

    const toSplit = rects.splice(rIndex, 1)[0];
    
    let splitH = toSplit.w > toSplit.h;
    if (Math.random() < 0.25) splitH = !splitH; 
    
    const splitRatio = 0.3 + (Math.random() * 0.4);

    let r1, r2;
    if (splitH) {
      const w1 = toSplit.w * splitRatio;
      r1 = { x: toSplit.x, y: toSplit.y, w: w1, h: toSplit.h };
      r2 = { x: toSplit.x + w1, y: toSplit.y, w: toSplit.w - w1, h: toSplit.h };
    } else {
      const h1 = toSplit.h * splitRatio;
      r1 = { x: toSplit.x, y: toSplit.y, w: toSplit.w, h: h1 };
      r2 = { x: toSplit.x, y: toSplit.y + h1, w: toSplit.w, h: toSplit.h - h1 };
    }

    // ONLY push the new rectangles if they contain part of the subject
    if (!isRectEmpty(r1.x, r1.y, r1.w, r1.h, w, h, imgData)) rects.push(r1);
    if (!isRectEmpty(r2.x, r2.y, r2.w, r2.h, w, h, imgData)) rects.push(r2);
  }

  // 3. assign stretches and tags to valid rectangles
  const coverageProb = parseInt(elements.coverage.value) / 100;
  const balanceH = parseInt(elements.balance.value) / 100;
  const textProb = parseInt(elements.textProb.value) / 100;
  const labelsList = getLabels();

  effectMap = rects.map(r => {
    const isCovered = Math.random() < coverageProb;
    const isHorizontal = Math.random() < balanceH;
    const sliceOrigin = Math.random(); 
    const label = labelsList.length > 0 ? labelsList[Math.floor(Math.random() * labelsList.length)] : '';
    const hasText = isCovered && Math.random() < textProb && label !== '';

    return {
      ...r,
      active: isCovered,
      dir: isHorizontal ? 'H' : 'V',
      slice: sliceOrigin,
      text: hasText ? label.toUpperCase() : null
    };
  });
}

// render function
function render() {
  if (!originalImage) return;

  const zoom = parseInt(elements.zoom.value) / 100;
  
  let w = originalImage.width;
  let h = originalImage.height;
  if (rotation === 90 || rotation === 270) {
    w = originalImage.height;
    h = originalImage.width;
  }

  canvas.width = w * zoom;
  canvas.height = h * zoom;

  ctx.save();
  ctx.scale(zoom, zoom);
  ctx.translate(w / 2, h / 2);
  ctx.rotate(rotation * Math.PI / 180);
  ctx.drawImage(originalImage, -originalImage.width / 2, -originalImage.height / 2);
  ctx.restore();

  const intensity = parseInt(elements.intensity.value) / 100;

  for (let i = 0; i < effectMap.length; i++) {
    const cellData = effectMap[i];
    
    const ix = Math.floor(cellData.x * canvas.width);
    const iy = Math.floor(cellData.y * canvas.height);
    const iw = Math.max(1, Math.floor(cellData.w * canvas.width));
    const ih = Math.max(1, Math.floor(cellData.h * canvas.height));

    if (cellData.active && intensity > 0) {
      if (cellData.dir === 'H') {
        const sliceY = Math.floor(iy + (cellData.slice * (ih - 1)));
        const stretchHeight = Math.max(1, Math.floor(ih * intensity));
        const startY = Math.floor(iy + (ih - stretchHeight) / 2);
        
        try {
          const sliceData = ctx.getImageData(ix, sliceY, iw, 1);
          for(let j = 0; j < stretchHeight; j++) {
            ctx.putImageData(sliceData, ix, startY + j);
          }
        } catch(e) {}
      } else {
        const sliceX = Math.floor(ix + (cellData.slice * (iw - 1)));
        const stretchWidth = Math.max(1, Math.floor(iw * intensity));
        const startX = Math.floor(ix + (iw - stretchWidth) / 2);
        
        try {
          const sliceData = ctx.getImageData(sliceX, iy, 1, ih);
          for(let j = 0; j < stretchWidth; j++) {
             ctx.putImageData(sliceData, startX + j, iy);
          }
        } catch(e) { }
      }
    }

    if (elements.wireframe.checked) {
      ctx.strokeStyle = '#000000'; 
      ctx.lineWidth = 0.8;
      ctx.strokeRect(ix, iy, iw, ih);
    }

    if (elements.showText.checked && cellData.text) {
      ctx.fillStyle = '#000';
      ctx.font = 'bold 10px Helvetica, sans-serif';
      
      // const textMetrics = ctx.measureText(cellData.text);
      // ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      // ctx.fillRect(ix + 2, iy + 2, textMetrics.width + 4, 16);

      ctx.fillStyle = '#000';
      ctx.fillText(cellData.text, ix + 4, iy + 14);
    }
  }
}

function exportCanvas() {
  if (!originalImage) return alert("Please upload or paste an image first.");
  
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'pixelstretch-export.png';
  link.click();
}