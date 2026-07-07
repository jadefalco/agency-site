import type { MDXComponents } from "mdx/types";
import {
  Callout,
  Cta,
  ImageBlock,
  ComparisonTable,
  Faq,
  ProsCons,
} from "./app/components/mdx";

/**
 * Global MDX component provider.
 *
 * Any component exported here becomes available as a JSX shortcode inside
 * MDX files in the /content directory. For example, an MDX file can write:
 *
 *   <Callout type="tip">
 *     This is a helpful tip.
 *   </Callout>
 *
 * This file is automatically picked up by Next.js when using @next/mdx.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom shortcodes available in every MDX file.
    Callout,
    Cta,
    ImageBlock,
    ComparisonTable,
    Faq,
    ProsCons,
    // Preserve any default components passed by Next.js / MDX.
    ...components,
  };
}
