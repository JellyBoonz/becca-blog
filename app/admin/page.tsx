"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;

    if (!file || !title) {
      setError("Please provide both a file and a title.");
      setIsUploading(false);
      return;
    }

    if (!file.name.endsWith(".docx")) {
      setError("Please upload a .docx file.");
      setIsUploading(false);
      return;
    }

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("title", title);

      const response = await fetch("/api/upload-docx", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      router.push("/admin?success=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsUploading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="journal-card rounded-lg p-8">
        <h1 className="text-3xl font-serif text-dark-ink font-bold mb-2">
          Publish New Post
        </h1>
        <p className="text-dark-ink/70 font-body mb-8">
          Upload your .docx file from Google Docs and add a title to publish.
        </p>

        {success && (
          <div className="mb-6 p-4 bg-botanical-green/10 border border-botanical-green/30 rounded-lg">
            <p className="text-botanical-green font-body">
              ✓ Post published successfully!
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-700 font-body">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-body text-dark-ink font-semibold mb-2"
            >
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 border border-sepia/30 rounded-lg bg-parchment text-dark-ink font-body focus:outline-none focus:ring-2 focus:ring-sepia/50"
              placeholder="Enter the title of your post"
            />
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-body text-dark-ink font-semibold mb-2"
            >
              Upload .docx File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".docx"
              required
              className="w-full px-4 py-2 border border-sepia/30 rounded-lg bg-parchment text-dark-ink font-body focus:outline-none focus:ring-2 focus:ring-sepia/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-body file:bg-sepia/20 file:text-dark-ink file:cursor-pointer hover:file:bg-sepia/30"
            />
            <p className="mt-2 text-xs text-dark-ink/60 font-body">
              Select the .docx file you downloaded from Google Docs
            </p>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-3 px-6 bg-botanical-green text-white font-body font-semibold rounded-lg hover:bg-botanical-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

