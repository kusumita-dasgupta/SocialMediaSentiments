import requests
import os

def fetch_x_posts(query: str, limit: int) -> str:
    url = "https://api.twitter.com/2/tweets/search/recent"
    headers = {
        "Authorization": f"Bearer {os.getenv('X_BEARER_TOKEN')}"
    }
    params = {
        "query": query,
        "max_results": min(limit, 10)
    }

    resp = requests.get(url, headers=headers, params=params)
    resp.raise_for_status()

    tweets = resp.json().get("data", [])
    return "\n\n".join(t["text"] for t in tweets)
