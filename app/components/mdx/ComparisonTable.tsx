import type { ReactNode } from "react";

interface ComparisonTableProps {
  headers: string[];
  rows: ReactNode[][];
  caption?: string;
}

/**
 * Styled comparison table for MDX content.
 *
 * Usage in MDX:
 *   <ComparisonTable
 *     headers={["Feature", "DIY", "Agency", "TrueNorth"]}
 *     rows={[
 *       ["Upfront cost", "$0", "$5,000+", "$500"],
 *       ["Timeline", "Months", "3+ months", "2–3 weeks"]
 *     ]}
 *     caption="How options compare for Kelowna businesses"
 *   />
 */
export default function ComparisonTable({
  headers,
  rows,
  caption,
}: ComparisonTableProps) {
  return (
    <figure className="not-prose my-6 md:my-8 overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[500px]">
        {caption && (
          <caption className="caption-bottom mt-3 text-slate-500 text-sm text-center">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b-2 border-brand-dark">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-3 px-4 text-brand-dark font-bold text-sm md:text-base"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-3 px-4 text-sm text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
