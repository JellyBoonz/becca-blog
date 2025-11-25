# Field Notes Blog

A beautiful, journal-inspired blog built with Next.js 14, featuring a Field Notes aesthetic with warm parchment backgrounds, botanical accents, and elegant typography.

## Features

- **Field Notes Design**: Soft, journal-like aesthetic with paper textures and botanical illustrations
- **Simple Publishing**: Upload .docx files from Google Docs through an easy admin interface
- **MDX Support**: Blog posts written in Markdown with frontmatter support
- **GitHub Integration**: Posts are automatically committed to your GitHub repository
- **Beautiful Typography**: EB Garamond for headers, Source Serif Pro for body text
- **Responsive Design**: Works beautifully on all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- A GitHub account and repository for storing posts

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd becca-blog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
GITHUB_TOKEN=your_github_token_here
GITHUB_REPO_OWNER=your_username_here
GITHUB_REPO_NAME=your_repo_name_here
```

To get a GitHub token:
- Go to https://github.com/settings/tokens
- Generate a new token with `repo` scope (for private repos) or `public_repo` scope (for public repos)

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

## Publishing Posts

1. Write your post in Google Docs
2. Download it as a .docx file (File → Download → Microsoft Word (.docx))
3. Visit `/admin` on your blog
4. Enter the post title and upload the .docx file
5. Click "Publish Post"

The post will be automatically:
- Converted from .docx to Markdown
- Added to your GitHub repository in the `posts/` directory
- Available on your blog immediately

## Project Structure

```
├── app/
│   ├── admin/          # Admin upload page
│   ├── api/
│   │   └── upload-docx/ # API route for processing uploads
│   ├── posts/
│   │   └── [slug]/     # Individual post pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # React components
├── lib/               # Utility functions
├── posts/             # MDX blog posts (committed to GitHub)
└── public/            # Static assets
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `GITHUB_TOKEN`
   - `GITHUB_REPO_OWNER`
   - `GITHUB_REPO_NAME`
4. Deploy!

The blog will automatically rebuild when new posts are committed to your GitHub repository.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **MDX** (next-mdx-remote)
- **Mammoth** (docx to Markdown conversion)
- **Octokit** (GitHub API)
- **Google Fonts** (EB Garamond, Source Serif Pro, Dancing Script)

## License

Private project - All rights reserved.
