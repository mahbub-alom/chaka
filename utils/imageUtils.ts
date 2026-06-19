/**
 * High-performance client-side image optimization and WebP conversion utility
 * for Chaka BD. This is executed inside standard HTML5 Canvas sandbox.
 */
export function convertToWebP(file: File, maxDimension = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    // 1. Verify file is indeed an image
    if (!file.type.match(/image.*/)) {
      reject(new Error('Invalid file type: Selected file is not an image.'));
      return;
    }

    const reader = new FileReader();
    const isServer = typeof window === 'undefined';
    if (isServer) {
      reject(new Error('Cannot convert image on server side.'));
      return;
    }

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compute new size dimensions scaling down while preserving aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        // Initialize standard canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original read URL if canvas context fails
          resolve(event.target?.result as string);
          return;
        }

        // Draw and compress
        ctx.fillStyle = '#ffffff'; // White background placeholder
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert directly to modern .webp format
        const webpDataUrl = canvas.toDataURL('image/webp', quality);
        resolve(webpDataUrl);
      };
      img.onerror = (err) => reject(err);
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
