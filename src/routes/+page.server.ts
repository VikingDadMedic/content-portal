// import { PUBLIC_DIRECTUS_PROJECT_URL } from '$env/static/public';
import query from '$lib/graphql/query/pages.graphql?raw';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
    try {
        const response = await fetch(`${PUBLIC_DIRECTUS_PROJECT_URL}/graphql`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
                // 'Authorization': `Bearer ${PUBLIC_SNIPCART_API_KEY}`
            },
            body: JSON.stringify({ query, variables: {} })
        });

        const { headers } = response;
        if (!headers.get('content-type')?.includes('application/json')) {
            const message =
                'No JSON response from Directus. If running in community mode, this pauses automatically after three days. Log into your main account and unpause this project if necessary.';
            console.error(message);
            throw error(503, message);
        }

        const {
            data: { pages }
        } = await response.json();
        const [page] = pages;
        const {
            hero_link: heroLink,
            hero_message: heroMessage,
            hero_title: heroTitle,
            page_title: pageTitle,
            page_description: pageDescription,
            featured_image: featuredImage
        } = page;

        return { heroLink, heroMessage, heroTitle, pageTitle, pageDescription, featuredImage };
    } catch (err: unknown) {
        const httpError = err as { status: number; message: string };
        if (httpError.message) {
            throw error(httpError.status ?? 500, httpError.message);
        }
        throw error(500, err as string);
    }
};
