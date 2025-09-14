import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MDXFrontmatter {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  publishDate?: string;
  author?: string;
  schema?: string;
}

export interface MDXDocument {
  slug: string;
  frontmatter: MDXFrontmatter;
  content: string;
}

export function getMDXBySlug(category: string, slug: string): MDXDocument | null {
  try {
    const fullPath = path.join(contentDirectory, category, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as MDXFrontmatter,
      content
    };
  } catch (error) {
    console.error(`Error reading MDX file: ${category}/${slug}`, error);
    return null;
  }
}

export function getAllMDXDocuments(category: string): MDXDocument[] {
  try {
    const categoryPath = path.join(contentDirectory, category);

    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const files = fs.readdirSync(categoryPath);

    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const slug = file.replace(/\.mdx$/, '');
        const doc = getMDXBySlug(category, slug);
        return doc;
      })
      .filter((doc): doc is MDXDocument => doc !== null);
  } catch (error) {
    console.error(`Error reading MDX documents from category: ${category}`, error);
    return [];
  }
}

export function getCategories(): string[] {
  try {
    const entries = fs.readdirSync(contentDirectory, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  } catch (error) {
    console.error('Error reading content categories', error);
    return [];
  }
}