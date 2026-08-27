import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello World | Gatherwise",
  description: "A simple hello world page.",
  // Scratch page — excluded from the sitemap, and told outright not to index
  // in case it is ever discovered another way.
  robots: { index: false, follow: false },
};

export default function HelloWorldPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-24">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-source-serif)] text-4xl font-800 sm:text-6xl text-foreground">
          Hello, world
        </h1>
        <p className="mt-4 text-lg text-foreground/70">
          Welcome to Gatherwise.
        </p>
      </div>
    </main>
  );
}
