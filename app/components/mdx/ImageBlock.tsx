interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

/**
 * Responsive image block with optional caption for MDX content.
 *
 * Usage in MDX:
 *   <ImageBlock
 *     src="/images/example.png"
 *     alt="Descriptive alt text"
 *     caption="A helpful caption"
 *     width={800}
 *     height={450}
 *   />
 */
export default function ImageBlock({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: ImageBlockProps) {
  return (
    <figure className="not-prose my-6 md:my-8">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="w-full rounded-2xl border border-slate-200/80 shadow-sm"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-slate-500 text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
