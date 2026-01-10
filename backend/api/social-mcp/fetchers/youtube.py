import requests
import os

def fetch_youtube_comments(video_id: str, limit: int = 20) -> str:
    api_key = os.getenv("YOUTUBE_API_KEY")
    url = "https://www.googleapis.com/youtube/v3/commentThreads"

    params = {
        "part": "snippet",
        "videoId": video_id,
        "maxResults": min(limit, 100),
        "textFormat": "plainText",
        "key": api_key,
    }

    resp = requests.get(url, params=params, timeout=10)
    resp.raise_for_status()

    items = resp.json().get("items", [])

    output = []
    for item in items:
        snippet = item["snippet"]["topLevelComment"]["snippet"]
        output.append(snippet["textDisplay"])

    return "\n\n---\n\n".join(output)
