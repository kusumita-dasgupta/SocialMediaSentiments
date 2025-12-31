# Social Media Sentiment Analysis Agent

A powerful AI agent built with OpenAI's Agents SDK and a custom MCP (Model Context Protocol) server that analyzes sentiment across multiple social media platforms. The agent can fetch posts from Reddit, X (Twitter), and YouTube comments, then perform comprehensive sentiment analysis and generate actionable improvement suggestions.

## Features

- **Multi-Platform Support**: Fetch and analyze content from:
  - Reddit posts and discussions
  - X (Twitter) tweets
  - YouTube video comments

- **Intelligent Sentiment Analysis**: 
  - Overall sentiment classification (Positive, Negative, Neutral, Mixed)
  - Theme identification and complaint extraction
  - Pattern recognition across multiple posts

- **Actionable Insights**:
  - Improvement suggestions based on user feedback
  - Prioritized recommendations (Quick Wins vs. Longer-Term Fixes)
  - Impact assessment for each suggestion

- **Interactive CLI**: Chat-based interface for natural language queries

## Architecture

The project consists of two main components:

1. **MCP Server** (`social-mcp/social-mcp.py`): A FastMCP server that provides tools for fetching social media content and analysis instructions
2. **Agent** (`main.py`): An OpenAI Agent that uses the MCP server to perform sentiment analysis tasks

## Requirements

- Python 3.13+
- OpenAI API key
- `uv` package manager (recommended) or pip
- Optional API keys for enhanced functionality:
  - YouTube API key (for YouTube comments)
  - X (Twitter) Bearer Token (for X posts)

## Installation

### Using uv (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SocialMediaSentiments
   ```

2. **Install dependencies**
   ```bash
   uv sync
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   echo "OPENAI_API_KEY=your_api_key_here" > .env
   ```
   
   For full functionality, also add:
   ```bash
   echo "YOUTUBE_API_KEY=your_youtube_api_key" >> .env
   echo "X_BEARER_TOKEN=your_x_bearer_token" >> .env
   ```

### Using pip

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SocialMediaSentiments
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -e .
   ```

4. **Set up environment variables** (same as above)

## Usage

### Running the Agent

```bash
# With uv
uv run main.py

# With pip
python main.py
```

### Example Queries

Once the agent is running, you can interact with it using natural language:

**Sentiment Analysis:**
- "Analyze sentiment for posts about 'product launch' on Reddit"
- "What's the sentiment on X about 'brand name'?"
- "Fetch and analyze comments from this YouTube video: https://youtube.com/watch?v=VIDEO_ID"

**Improvement Suggestions:**
- "What improvements should we make based on Reddit feedback about 'topic'?"
- "Generate improvement suggestions from YouTube comments for video VIDEO_ID"
- "Analyze X posts about 'keyword' and suggest improvements"

**Combined Analysis:**
- "Fetch Reddit posts about 'product', analyze sentiment, and suggest improvements"

## Project Structure

```
SocialMediaSentiments/
├── main.py                    # Main agent application
├── pyproject.toml            # Project dependencies
├── .env                      # Environment variables (create this)
└── social-mcp/
    ├── social-mcp.py         # MCP server implementation
    ├── fetchers/
    │   ├── reddit.py         # Reddit post fetcher
    │   ├── x.py              # X (Twitter) post fetcher
    │   └── youtube.py        # YouTube comments fetcher
    └── prompts/
        ├── system_instructions.md      # Agent system prompt
        ├── sentiment_analysis.md      # Sentiment analysis instructions
        └── improvement_suggestions.md  # Improvement suggestions template
```

## MCP Tools

The MCP server provides the following tools:

- **`fetch_social_posts`**: Fetch posts from Reddit or X
  - Parameters: `platform` (reddit|x), `query`, `limit`
  
- **`fetch_youtube_comments_tool`**: Fetch comments from a YouTube video
  - Parameters: `video_id`, `limit`
  
- **`fetch_instructions`**: Retrieve analysis instruction templates
  - Parameters: `prompt_name` (sentiment_analysis|improvement_suggestions)

## How It Works

1. **User Query**: You provide a natural language query about social media sentiment
2. **Content Fetching**: The agent uses MCP tools to fetch relevant posts/comments
3. **Analysis**: The agent performs sentiment analysis using specialized prompts
4. **Insights**: The agent generates structured insights and improvement suggestions
5. **Response**: Results are streamed back in real-time

## API Keys Setup

### OpenAI API Key (Required)
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `.env`: `OPENAI_API_KEY=sk-...`

### YouTube API Key (Optional)
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable YouTube Data API v3
3. Create credentials (API Key)
4. Add to `.env`: `YOUTUBE_API_KEY=...`

### X (Twitter) Bearer Token (Optional)
1. Apply for API access at [Twitter Developer Portal](https://developer.twitter.com/)
2. Create an app and generate Bearer Token
3. Add to `.env`: `X_BEARER_TOKEN=...`

## Notes

- Reddit fetching uses the Pushshift API (no authentication required)
- X and YouTube require API keys for full functionality
- The agent bases all analysis strictly on fetched content - it never invents sentiment or context
- All analysis is performed in real-time using OpenAI's models

## Troubleshooting

**Agent not responding:**
- Verify your `OPENAI_API_KEY` is set correctly in `.env`
- Check that you're in the correct directory

**Tool calls failing:**
- For YouTube: Ensure `YOUTUBE_API_KEY` is set and valid
- For X: Ensure `X_BEARER_TOKEN` is set and has proper permissions
- For Reddit: Pushshift API should work without authentication

**Import errors:**
- Run `uv sync` or `pip install -e .` to ensure all dependencies are installed
- Verify Python version is 3.13+

## License

[Add your license here]

## Contributing

[Add contribution guidelines if applicable]
