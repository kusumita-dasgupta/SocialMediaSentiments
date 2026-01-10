# Social Media Sentiment Analysis Agent

A full-stack AI-powered social media sentiment analysis platform built with OpenAI's Agents SDK, a custom MCP (Model Context Protocol) server, FastAPI backend, and Next.js frontend. Analyze sentiment across multiple social media platforms with an intuitive web interface or command-line tool.

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

- **Dual Interface Options**:
  - **Web UI**: Modern Next.js chat interface with real-time streaming
  - **CLI**: Command-line tool for direct terminal interaction

## Architecture

The project consists of three main components:

1. **Backend** (`backend/api/`): FastAPI server with MCP server integration
   - `app.py`: FastAPI web server with REST API endpoints
   - `main.py`: CLI application for terminal interaction
   - `social-mcp/`: MCP server with tools for fetching social media content

2. **Frontend** (`frontend/`): Next.js 16 application with TypeScript
   - Real-time chat interface
   - Streaming responses
   - Modern UI components

3. **MCP Server** (`backend/api/social-mcp/`): Custom tools for social media data fetching
   - Reddit post fetcher
   - X (Twitter) post fetcher
   - YouTube comments fetcher
   - Analysis instruction templates

## Requirements

- Python 3.13+
- Node.js 18+ (for frontend)
- OpenAI API key (required)
- `uv` package manager (recommended) or pip
- Optional API keys for enhanced functionality:
  - YouTube API key (for YouTube comments)
  - X (Twitter) Bearer Token (for X posts)

## Installation

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SocialMediaSentiments
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Install dependencies with uv (recommended)**
   ```bash
   uv sync
   ```

   Or with pip:
   ```bash
   pip install -e .
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `backend/` directory:
   ```bash
   echo "OPENAI_API_KEY=your_api_key_here" > .env
   ```
   
   For full functionality, also add:
   ```bash
   echo "YOUTUBE_API_KEY=your_youtube_api_key" >> .env
   echo "X_BEARER_TOKEN=your_x_bearer_token" >> .env
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure backend URL** (if needed)
   
   Update `frontend/app/api/chat/route.ts` to point to your backend URL if running separately.

## Usage

### Option 1: Web Interface (Full-Stack)

**Start the Backend Server:**

From the `backend/` directory:
```bash
# Using uv (recommended)
uv run uvicorn api.app:app --reload --host 0.0.0.0 --port 8000

# Using pip
uvicorn api.app:app --reload --host 0.0.0.0 --port 8000
```

**Start the Frontend Development Server:**

From the `frontend/` directory:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` (or the next available port).

**Using the Web Interface:**
- Open your browser to `http://localhost:3000`
- Type queries in the chat interface
- Get real-time streaming responses from the agent

### Option 2: CLI Interface

From the `backend/` directory:
```bash
# Using uv (recommended)
uv run python api/main.py

# Using pip
python api/main.py
```

Type `exit` to end the conversation.

### Example Queries

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
├── backend/
│   ├── api/
│   │   ├── app.py              # FastAPI web server
│   │   ├── main.py             # CLI application
│   │   └── social-mcp/
│   │       ├── social-mcp.py   # MCP server implementation
│   │       ├── fetchers/
│   │       │   ├── reddit.py   # Reddit post fetcher
│   │       │   ├── x.py        # X (Twitter) post fetcher
│   │       │   └── youtube.py  # YouTube comments fetcher
│   │       └── prompts/
│   │           ├── system_instructions.md
│   │           ├── sentiment_analysis.md
│   │           └── improvement_suggestions.md
│   ├── pyproject.toml          # Python dependencies
│   ├── requirements.txt        # Alternative pip dependencies
│   ├── vercel.json             # Vercel deployment config
│   └── .env                    # Environment variables (create this)
│
└── frontend/
    ├── app/
    │   ├── api/
    │   │   └── chat/
    │   │       └── route.ts    # Next.js API route for chat
    │   ├── page.tsx            # Main page component
    │   └── layout.tsx          # App layout
    ├── components/
    │   ├── chat/               # Chat UI components
    │   └── ui/                 # Reusable UI components
    ├── package.json            # Node.js dependencies
    └── next.config.ts          # Next.js configuration
```

## MCP Tools

The MCP server provides the following tools:

- **`fetch_social_posts`**: Fetch posts from Reddit or X
  - Parameters: `platform` (reddit|x), `query`, `limit`
  
- **`fetch_youtube_comments_tool`**: Fetch comments from a YouTube video
  - Parameters: `video_id`, `limit`
  
- **`fetch_instructions`**: Retrieve analysis instruction templates
  - Parameters: `prompt_name` (sentiment_analysis|improvement_suggestions)

## API Keys Setup

### OpenAI API Key (Required)
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `backend/.env`: `OPENAI_API_KEY=sk-...`

### YouTube API Key (Optional)
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable YouTube Data API v3
3. Create credentials (API Key)
4. Add to `backend/.env`: `YOUTUBE_API_KEY=...`

### X (Twitter) Bearer Token (Optional)
1. Apply for API access at [Twitter Developer Portal](https://developer.twitter.com/)
2. Create an app and generate Bearer Token
3. Add to `backend/.env`: `X_BEARER_TOKEN=...`

## Deployment

### Vercel Deployment

The backend is configured for Vercel deployment. Current deployment:

🔗 **Linked to**: `kusumitas-projects-c1cf1ca0/backend`

🔍 **Inspect**: https://vercel.com/kusumitas-projects-c1cf1ca0/backend/rZ8Sd6WwF9JUiba6wFuJJLp4zjwL

✅ **Production**: https://backend-5wopvor8n-kusumitas-projects-c1cf1ca0.vercel.app

**Common Vercel commands:**
```bash
vercel inspect backend-5wopvor8n-kusumitas-projects-c1cf1ca0.vercel.app --logs
vercel redeploy backend-5wopvor8n-kusumitas-projects-c1cf1ca0.vercel.app
```

## Development

### Running Backend Development Server
```bash
cd backend
uv run uvicorn api.app:app --reload --host 0.0.0.0 --port 8000
```

### Running Frontend Development Server
```bash
cd frontend
npm run dev
```

### Running CLI Version
```bash
cd backend
uv run python api/main.py
```

## Troubleshooting

**Backend not responding:**
- Verify your `OPENAI_API_KEY` is set correctly in `backend/.env`
- Check that the backend is running on port 8000
- Ensure all dependencies are installed with `uv sync` or `pip install -e .`

**Frontend connection issues:**
- Verify the backend URL in `frontend/app/api/chat/route.ts`
- Check CORS settings in `backend/api/social-mcp/social-mcp.py`
- Ensure the backend server is running before starting the frontend

**Tool calls failing:**
- For YouTube: Ensure `YOUTUBE_API_KEY` is set and valid in `backend/.env`
- For X: Ensure `X_BEARER_TOKEN` is set and has proper permissions
- For Reddit: Pushshift API should work without authentication

**Import errors:**
- Run `uv sync` in the backend directory
- Run `npm install` in the frontend directory
- Verify Python version is 3.13+
- Verify Node.js version is 18+

**Port conflicts:**
- Backend defaults to port 8000, change with `--port` flag
- Frontend defaults to port 3000, Next.js will auto-select next available port
- Kill existing processes: `pkill -f "next dev"` or `pkill -f "uvicorn"`

## Notes

- Reddit fetching uses the Pushshift API (no authentication required)
- X and YouTube require API keys for full functionality
- The agent bases all analysis strictly on fetched content - it never invents sentiment or context
- All analysis is performed in real-time using OpenAI's models
- The `.vercel` directory is in `.gitignore` (contains deployment configuration)

## License

[Add your license here]

## Contributing

[Add contribution guidelines if applicable]
