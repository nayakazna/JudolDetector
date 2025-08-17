import { json } from '@sveltejs/kit';
import { YOUTUBE_API_KEY } from '$env/static/private';

// GET
export async function GET({ url }) {
    try {
        const videoId = url.searchParams.get('videoId');

        if (!videoId) {
            return json({ error: 'ID video kosong!' }, { status: 400 });
        }
        

        const apiUrl = new URL('https://www.googleapis.com/youtube/v3/commentThreads');
        apiUrl.searchParams.set('key', YOUTUBE_API_KEY);
        apiUrl.searchParams.set('part', 'snippet,replies');
        apiUrl.searchParams.set('textFormat', 'plainText');
        apiUrl.searchParams.set('videoId', videoId);
        apiUrl.searchParams.set('maxResults', '100');
        // if (pageToken) apiUrl.searchParams.set('pageToken', pageToken);
    
        const response = await fetch(apiUrl.toString());
        const data = await response.json();
    
        if (!response.ok) {
            return json(
                { error: data.error?.message || 'Gagal fetch comments dari YouTube API.' },
                { status: response.status }
            );
        }

        const comments: { id: string; author: string; text: string }[] = [];

        for (const item of data.items) {
            const top = item.snippet.topLevelComment;
            comments.push({
                id: top.id,
                author: top.snippet.authorDisplayName,
                text: top.snippet.textOriginal
            });

            if (item.replies?.comments) {
                for (const reply of item.replies.comments) {
                    if (reply.snippet.parentId === top.id) {
                        comments.push({
                            id: reply.id,
                            author: reply.snippet.authorDisplayName,
                            text: reply.snippet.textOriginal.replace(/^@\S+\s/, "").trim()
                        });
                    }
                }
            }
        }

        return json(comments);
    } catch (err) {
        console.error('Server error:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST
export async function POST({ request }) {
    try {
        const { videoId, comments } = await request.json();

        if (!videoId || !Array.isArray(comments) || comments.length === 0) {
            return json({ error: 'VideoId atau comments tidak valid!' }, { status: 400 });
        }

        // TODO: Call YouTube API "commentThreads.insert"
        // Placeholder response:
        return json({
            message: `Inserted ${comments.length} comments into video ${videoId}`
        });
    } catch (err) {
        console.error('Insert error:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE
export async function DELETE({ request }) {
    try {
        const { videoId } = await request.json();

        if (!videoId) {
            return json({ error: 'VideoId kosong!' }, { status: 400 });
        }

        // TODO: Call YouTube API "comments.delete"
        // Placeholder response:
        return json({
            message: `Deleted all detected "judol" comments from video ${videoId}`
        });
    } catch (err) {
        console.error('Delete error:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
