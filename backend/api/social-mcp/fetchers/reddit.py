import praw
import os

def fetch_reddit_posts(query: str, limit: int) -> str:
   reddit = praw.Reddit(
       client_id=os.getenv("REDDIT_CLIENT_ID"),
       client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
       user_agent="social-mcp-agent"
   )

   posts = reddit.subreddit("all").search(query, limit=limit)
    
   output = []
   for post in posts:
       output.append(
           f"[r/{post.subreddit}] {post.title}\n{post.selftext}"
       )

   return "\n\n---\n\n".join(output)


# import requests

# def fetch_reddit_posts(query: str, limit: int) -> str:
#     url = "https://api.pushshift.io/reddit/search/submission/"
#     params = {
#         "q": query,
#         "size": limit,
#         "sort": "desc",
#         "sort_type": "created_utc"
#     }

#     resp = requests.get(url, params=params, timeout=10)
#     resp.raise_for_status()

#     data = resp.json().get("data", [])

#     output = []
#     for post in data:
#         title = post.get("title", "")
#         body = post.get("selftext", "")
#         subreddit = post.get("subreddit", "unknown")
#         output.append(f"[r/{subreddit}] {title}\n{body}")

#     print(f"Pushshift returned {len(data)} posts")


#     return "\n\n---\n\n".join(output)



