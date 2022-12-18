import { PUBLIC_DIRECTUS_PROJECT_URL } from '$env/static/public';
// import type { ProductsQuery, ProductsSearchQuery } from '$lib/generated/graphql';
import productsQuery from '$lib/graphql/query/products.graphql?raw';
import productsSearchQuery from '$lib/graphql/query/productsSearch.graphql?raw';
import { getBase64Placeholder } from '$lib/utilities/image';
import { error } from '@sveltejs/kit';
import invariant from 'tiny-invariant';
import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
    default: async ({ request }) => {
        try {
            const form = await request.formData();
            const searchTerm = form.get('query');
            if (typeof searchTerm === 'string') {
                const response = await fetch(`${PUBLIC_DIRECTUS_PROJECT_URL}/graphql`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ query: productsSearchQuery, variables: { query: searchTerm } })
                });
                const {
                    data: { products: rawProducts }
                }: { data: ProductsSearchQuery } = await response.json();

                const categoriesMap = new Map<string, string>();

                rawProducts
                    .map(({ categories, description, id, image, name, price, slug }) => {
                        invariant(
                            description && name && price && slug && image,
                            `${slug} product categories, description, name, price, slug and image are required`
                        );
                        const { id: imageId, description: alt } = image;
                        invariant(imageId && alt, `${slug} id and description are required for prodcut image`);
                        return { alt, categories, description, id, name, price, slug, imageId };
                    })
                    .forEach(({ categories = [] }) => {
                        categories
                            ?.map((element) => {
                                invariant(element, `Product has empty categories element`);
                                const { categories_id } = element;
                                invariant(categories_id, `Product categories element missing categoryID`);
                                const { name, slug } = categories_id;
                                invariant(name && slug, `CategoryID: ${categories_id} name  and slug are required`);
                                return { name, slug };
                            })
                            .forEach(({ name, slug }) => {
                                if (!categoriesMap.has(slug)) {
                                    categoriesMap.set(slug, name);
                                }
                            });
                    });

                const products = await Promise.all(
                    rawProducts.map(async ({ description, id, image, name, price, slug }) => {
                        invariant(
                            description && name && price && slug && image,
                            `${slug} product description, name, price, slug and image are required`
                        );
                        const { id: imageId, description: alt } = image;
                        invariant(imageId && alt, `${slug} id and description are required for prodcut image`);
                        return {
                            id,
                            imageId,
                            alt,
                            name,
                            price,
                            slug,
                            description,
                            placeholder: await getBase64Placeholder({ id: imageId })
                        };
                    })
                );

                const categories = [...categoriesMap.entries()].map(([slug, name]) => ({ slug, name }));

                return { products, categories };
            }
        } catch (err: unknown) {
            const httpError = err as { status: number; message: string };
            if (httpError.message) {
                throw error(httpError.status ?? 500, httpError.message);
            }
            throw error(500, err as string);
        }
    }
};

export const load: PageServerLoad = async function load() {
    try {
        const response = await fetch(`${PUBLIC_DIRECTUS_PROJECT_URL}/graphql`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ query: productsQuery, variables: {} })
        });

        const {
            data: { products: rawProducts }
        }: { data: ProductsQuery } = await response.json();

        const categoriesMap = new Map<string, string>();

        rawProducts
            .map(({ categories, description, id, image, name, price, slug }) => {
                invariant(
                    description && name && price && slug && image,
                    `${slug} product categories, description, name, price, slug and image are required`
                );
                const { id: imageId, description: alt } = image;
                invariant(imageId && alt, `${slug} id and description are required for prodcut image`);
                return { alt, categories, description, id, name, price, slug, imageId };
            })
            .forEach(({ categories = [] }) => {
                categories
                    ?.map((element) => {
                        invariant(element, `Product has empty categories element`);
                        const { categories_id } = element;
                        invariant(categories_id, `Product categories element missing categoryID`);
                        const { name, slug } = categories_id;
                        invariant(name && slug, `CategoryID: ${categories_id} name  and slug are required`);
                        return { name, slug };
                    })
                    .forEach(({ name, slug }) => {
                        if (!categoriesMap.has(slug)) {
                            categoriesMap.set(slug, name);
                        }
                    });
            });

        const products = await Promise.all(
            rawProducts.map(async ({ description, id, image, name, price, slug }) => {
                invariant(
                    description && name && price && slug && image,
                    `${slug} product description, name, price, slug and image are required`
                );
                const { id: imageId, description: alt } = image;
                invariant(imageId && alt, `${slug} id and description are required for prodcut image`);
                return {
                    id,
                    imageId,
                    alt,
                    name,
                    price,
                    slug,
                    description,
                    placeholder: await getBase64Placeholder({ id: imageId })
                };
            })
        );

        const categories = [...categoriesMap.entries()].map(([slug, name]) => ({ slug, name }));

        return {
            products,
            categories
        };
    } catch (err: unknown) {
        const httpError = err as { status: number; message: string };
        if (httpError.message) {
            throw error(httpError.status ?? 500, httpError.message);
        }
        throw error(500, err as string);
    }
};
