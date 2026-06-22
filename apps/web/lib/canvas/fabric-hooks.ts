
/**
 * Fabric.js Canvas Hooks
 *
 * React hooks for managing Fabric.js canvas instances
 * Handles initialization, cleanup, and common operations
 */

import { useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';

/**
 * Initialize and manage a Fabric canvas instance
 */
export function useFabricCanvas(
  elementId: string,
  options?: fabric.ICanvasOptions
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    const element = document.getElementById(elementId) as HTMLCanvasElement;
    if (!element) return;

    canvasRef.current = element;

    // Initialize Fabric canvas
    fabricCanvasRef.current = new fabric.Canvas(elementId, {
      backgroundColor: '#FFFFFF',
      width: 400,
      height: 400,
      ...options,
    });

    return () => {
      // Cleanup
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [elementId, options]);

  return fabricCanvasRef.current;
}

/**
 * Add a text object to canvas
 */
export const addCanvasText = (
  canvas: fabric.Canvas | null,
  text: string,
  options?: fabric.ITextOptions
) => {
  if (!canvas) return;

  const textObj = new fabric.Text(text, {
    left: 100,
    top: 100,
    fontSize: 20,
    fill: '#333333',
    fontFamily: 'Arial',
    selectable: true,
    editable: true,
    ...options,
  });

  canvas.add(textObj);
  canvas.setActiveObject(textObj);
  canvas.renderAll();
};

/**
 * Add a rectangle to canvas
 */
export const addCanvasRect = (
  canvas: fabric.Canvas | null,
  options?: fabric.IRectOptions
) => {
  if (!canvas) return;

  const rect = new fabric.Rect({
    left: 50,
    top: 50,
    width: 200,
    height: 100,
    fill: '#0047FF',
    stroke: '#002FA7',
    strokeWidth: 2,
    selectable: true,
    ...options,
  });

  canvas.add(rect);
  canvas.renderAll();
};

/**
 * Add a circle to canvas
 */
export const addCanvasCircle = (
  canvas: fabric.Canvas | null,
  options?: fabric.ICircleOptions
) => {
  if (!canvas) return;

  const circle = new fabric.Circle({
    left: 100,
    top: 100,
    radius: 50,
    fill: '#00BFA6',
    stroke: '#00845C',
    strokeWidth: 2,
    selectable: true,
    ...options,
  });

  canvas.add(circle);
  canvas.renderAll();
};

/**
 * Load an image onto canvas
 */
export const addCanvasImage = async (
  canvas: fabric.Canvas | null,
  imageUrl: string,
  options?: fabric.IImageOptions
) => {
  if (!canvas) return;

  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        const fabricImage = img.set({
          left: 50,
          top: 50,
          width: 200,
          height: 200,
          selectable: true,
          ...options,
        });

        canvas.add(fabricImage);
        canvas.renderAll();
        resolve(fabricImage);
      },
      {},
      { crossOrigin: 'anonymous' }
    );
  });
};

/**
 * Export canvas as PNG
 */
export const exportCanvasPNG = (
  canvas: fabric.Canvas | null,
  filename: string = 'canvas.png'
): string | null => {
  if (!canvas) return null;

  const dataUrl = canvas.toDataURL({
    format: 'png',
    quality: 1,
    multiplier: 2,
  });

  // Create download link
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();

  return dataUrl;
};

/**
 * Export canvas as SVG
 */
export const exportCanvasSVG = (
  canvas: fabric.Canvas | null,
  filename: string = 'canvas.svg'
): string | null => {
  if (!canvas) return null;

  const svgData = canvas.toSVG();

  // Create download link
  const link = document.createElement('a');
  link.href = `data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`;
  link.download = filename;
  link.click();

  return svgData;
};

/**
 * Clear all objects from canvas
 */
export const clearCanvas = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;
  canvas.getObjects().forEach(obj => canvas.remove(obj));
  canvas.renderAll();
};

/**
 * Set canvas background color
 */
export const setCanvasBackground = (
  canvas: fabric.Canvas | null,
  color: string
) => {
  if (!canvas) return;
  canvas.setBackgroundColor(color, () => canvas.renderAll());
};

/**
 * Delete selected object from canvas
 */
export const deleteSelectedObject = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.renderAll();
  }
};

/**
 * Clone selected object
 */
export const cloneSelectedObject = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.clone((cloned: fabric.Object) => {
      cloned.set({ left: (cloned.left || 0) + 10, top: (cloned.top || 0) + 10 });
      canvas.add(cloned);
      canvas.renderAll();
    });
  }
};

/**
 * Bring object to front
 */
export const bringToFront = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.bringToFront(activeObject);
    canvas.renderAll();
  }
};

/**
 * Send object to back
 */
export const sendToBack = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.sendToBack(activeObject);
    canvas.renderAll();
  }
};

/**
 * Get canvas JSON (for saving state)
 */
export const getCanvasJSON = (canvas: fabric.Canvas | null): string | null => {
  if (!canvas) return null;
  return JSON.stringify(canvas.toJSON());
};

/**
 * Load canvas from JSON
 */
export const loadCanvasJSON = async (
  canvas: fabric.Canvas | null,
  jsonString: string
): Promise<void> => {
  if (!canvas) return;

  return new Promise((resolve) => {
    canvas.loadFromJSON(jsonString, () => {
      canvas.renderAll();
      resolve();
    });
  });
};
