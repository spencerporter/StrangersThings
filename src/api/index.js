/**
 * API Calls
 */
export const BASE_URL = 'https://strangers-things.herokuapp.com/api/2107-web/';

export async function fetchPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts`)
        const data = await response.json();
        const posts = data.data.posts;
        console.log(posts);
        return posts;
    } catch (error) {
        console.error("Error retriving Posts", error);
    }
}
