import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { Octokit } from "@octokit/rest";
import { format } from "date-fns";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateSummary(content: string, maxLength: number = 150): string {
  const plainText = content
    .replace(/[#*\[\]()]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "...";
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;

    if (!file || !title) {
      return NextResponse.json(
        { error: "File and title are required" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.name.endsWith(".docx")) {
      return NextResponse.json(
        { error: "File must be a .docx file" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert .docx to Markdown using mammoth
    const result = await mammoth.convertToMarkdown({ buffer });
    const markdownContent = result.value;

    // Generate slug from title
    const slug = slugify(title);

    // Generate summary from content
    const summary = generateSummary(markdownContent);

    // Create frontmatter
    const date = new Date().toISOString().split("T")[0];
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
summary: "${summary.replace(/"/g, '\\"')}"
---

`;

    // Combine frontmatter and content
    const fullContent = frontmatter + markdownContent;

    // Get GitHub credentials from environment
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER;
    const repoName = process.env.GITHUB_REPO_NAME;

    if (!githubToken || !repoOwner || !repoName) {
      return NextResponse.json(
        {
          error:
            "GitHub credentials not configured. Please set GITHUB_TOKEN, GITHUB_REPO_OWNER, and GITHUB_REPO_NAME environment variables.",
        },
        { status: 500 }
      );
    }

    // Initialize Octokit
    const octokit = new Octokit({
      auth: githubToken,
    });

    // File path in repository
    const filePath = `posts/${slug}.mdx`;

    // Get file content as base64
    const contentBase64 = Buffer.from(fullContent, "utf-8").toString("base64");

    // Check if file already exists
    let sha: string | undefined;
    try {
      const { data } = await octokit.repos.getContent({
        owner: repoOwner,
        repo: repoName,
        path: filePath,
      });
      if ("sha" in data) {
        sha = data.sha;
      }
    } catch (error: any) {
      // File doesn't exist, which is fine for new posts
      if (error.status !== 404) {
        throw error;
      }
    }

    // Commit file to GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: repoOwner,
      repo: repoName,
      path: filePath,
      message: `Add post: ${title}`,
      content: contentBase64,
      sha: sha,
    });

    return NextResponse.json({ success: true, slug });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error:
          error.message || "An error occurred while processing your upload",
      },
      { status: 500 }
    );
  }
}

