// utils/cloudinaryLoader.ts
const cloudName = "ddexoguuq"; // Replace with your Cloudinary cloud name

// Handles both the secure url or the public id for loading the images
export function cloudinaryLoader({
    src,
    width,
    quality
}: {
    src: string;
    width: number;
    quality?: number;
}): string {
    const q = quality || 'auto';

    // Check if `src` is a full Cloudinary URL
    const isFullUrl = src.startsWith('http');

    if (isFullUrl) {
        try {
            const url = new URL(src);
            const parts = url.pathname.split('/');

            const uploadIndex = parts.findIndex(p => p === 'upload');
            if (uploadIndex === -1) return src; // fallback: not a Cloudinary URL

            // Inject transformation params after 'upload'
            parts.splice(uploadIndex + 1, 0, `f_auto,q_${q},w_${width}`);

            const finalUrl = `${url.origin}${parts.join('/')}`;

            return finalUrl;
        } catch (err) {
            console.warn("Invalid Cloudinary URL passed to loader:", src);
            return src;
        }
    } else {
        // Treat it as a public_id (e.g. "roaster_logos/clifton-coffee-roasters.png")
        const finalUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${q},w_${width}/${src}`;

        return finalUrl;
    }
}

export function getBlurURL(src: string): string {
    const publicId = src.startsWith('http')
        ? new URL(src).pathname.split('/upload/')[1]
        : src;

    return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_1,w_20,e_blur:1000/${publicId}`;
};