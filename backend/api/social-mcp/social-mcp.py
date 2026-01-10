from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI


from dotenv import load_dotenv
load_dotenv()
from mcp.server.fastmcp import FastMCP
import os
import logging

from fetchers.reddit import fetch_reddit_posts
from fetchers.x import fetch_x_posts
from fetchers.youtube import fetch_youtube_comments

logging.getLogger("mcp").setLevel(logging.WARNING)

mcp = FastMCP("social-mcp")

# CORS so the frontend can talk to backend
mcp.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# ---------------- PROMPT ----------------
@mcp.prompt()
def system_prompt() -> str:
    """Instructions for Social Listening Agent"""
    script_dir = os.path.dirname(__file__)
    path = os.path.join(script_dir, "prompts", "system_instructions.md")
    return open(path).read()

# ---------------- TOOLS ----------------
@mcp.tool()
def fetch_social_posts(
    platform: str,
    query: str,
    limit: int = 10
) -> str:
    """
    Fetch recent social media posts for sentiment analysis.

    Args:
        platform: reddit | x
        query: keyword or search term
        limit: number of posts

    Returns:
        Aggregated plain text posts
    """
    if platform == "reddit":
        return fetch_reddit_posts(query, limit)
    elif platform == "x":
        return fetch_x_posts(query, limit)
    else:
        raise ValueError("Unsupported platform")

@mcp.tool()
def fetch_youtube_comments_tool(
    video_id: str,
    limit: int = 20
) -> str:
    """
    Fetch public YouTube comments for a video.
    """
    return fetch_youtube_comments(video_id, limit)

@mcp.tool()
def fetch_instructions(prompt_name: str) -> str:
    """
    Fetch analysis instructions.
    Available:
      - sentiment_analysis
      - improvement_suggestions
    """
    script_dir = os.path.dirname(__file__)
    path = os.path.join(script_dir, "prompts", f"{prompt_name}.md")
    return open(path).read()

if __name__ == "__main__":
    mcp.run(transport="stdio")
