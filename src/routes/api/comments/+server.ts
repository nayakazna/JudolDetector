import { json } from '@sveltejs/kit';
import { YOUTUBE_API_KEY } from '$env/static/private';
import { google, youtube_v3 } from "googleapis";

function getYouTubeClient(accessToken: string): youtube_v3.Youtube {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    google.options({ auth: oauth2Client });
    return google.youtube("v3");
}

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
        return json({
            message: `Inserted ${comments.length} comments into video ${videoId}`
        });
    } catch (err) {
        console.error('Insert error:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}


// DELETE
export async function DELETE({ request, locals }) {
    const session = await locals.auth();

    if (!session?.user?.accessToken) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { commentIds } = await request.json();
    if (!commentIds?.length) {
        return new Response("No comments to delete", { status: 400 });
    }

    const youtube = getYouTubeClient(session.user.accessToken);

    let deleted = 0;
    for (const ids of commentIds) {
        try {
            youtube.comments.delete({ id: ids });
            deleted++;
        } catch (e) {
            console.error("Failed to delete comment", ids, e);
        }
    }

    return json({ deleted });
}
