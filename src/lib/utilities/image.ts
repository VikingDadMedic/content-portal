import { PUBLIC_DIRECTUS_PROJECT_URL } from '$env/static/public';

async function getBase64(src: string): Promise<string> {
    const response = await fetch(src);
    const image = await response.arrayBuffer();
    const base64 = Buffer.from(new Uint8Array(image)).toString('base64');
    return `data:image/jpeg;base64,${base64}`;
}

export async function getBase64Placeholder({ id }: { id: string }): Promise<string> {
    return getBase64(`${PUBLIC_DIRECTUS_PROJECT_URL}/assets/${id}?width=${10}`);
}

interface ImageSrcInput {
    id: string;
    slug: string;
    width: number;
}

export function getSrc({ id, slug, width }: ImageSrcInput) {
    return `${PUBLIC_DIRECTUS_PROJECT_URL}/assets/${id}/${slug}?width=${width}`;
}

interface ImageWidthsInput {
    densities: number[];
    sizes: number[];
}

function getSortedWidths({ densities, sizes }: ImageWidthsInput): number[] {
    const widths = new Set<number>();
    sizes.forEach((size) => {
        densities.forEach((density) => widths.add(Math.round(size * density)));
    });

    return [...widths].sort((a, b) => b - a);
}

type ImageSrcsetInput = ImageWidthsInput & Omit<ImageSrcInput, 'width'>;

export function getSrcset({ densities, id, sizes, slug }: ImageSrcsetInput): string {
    const sortedWidths = getSortedWidths({ densities, sizes });

    return sortedWidths
        .map(
            (element) =>
                `${PUBLIC_DIRECTUS_PROJECT_URL}/assets/${id}/${slug}?width=${element} ${element}w`
        )
        .join(',');
}

export function getWebpSrcset({ densities, id, sizes, slug }: ImageSrcsetInput): string {
    const sortedWidths = getSortedWidths({ densities, sizes });

    return sortedWidths
        .map(
            (element) =>
                `${PUBLIC_DIRECTUS_PROJECT_URL}/assets/${id}/${slug}?format=webp&width=${element} ${element}w`
        )
        .join(',');
}
