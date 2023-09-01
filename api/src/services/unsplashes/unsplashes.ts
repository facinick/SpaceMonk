import { generateRandomUUID } from "src/lib/utils";
import { QueryResolvers } from "types/graphql";

const DEFAULT_HEADER_IMG_URL = "https://images.unsplash.com/photo-1688870550853-f5956b4c010d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"

export const randomImageResolver: QueryResolvers['randomImage'] = async () => {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const topic = 'iUIsnVtjB0Y';
    const count = 1;
    const orientation = "landscape"
    const apiUrl = `https://api.unsplash.com/photos/random?topics=${topic}&orientation=${orientation}&count=${count}&client_id=${accessKey}`;

    let imageUrl = ""
    let id = ""

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.length > 0) {
            id = data[0].id;
            imageUrl = data[0].urls.full;
            console.log('Random HD Image URL:', imageUrl);
        } else {
            console.error('No images found.');
        }
    } catch (error) {
        console.error('Error fetching random image:', error);
        id = generateRandomUUID()
        imageUrl = DEFAULT_HEADER_IMG_URL
    }

    console.log({
        id,
        imageUrl,
    })

    return {
        id,
        imageUrl,
    }
}
