'use client';

type SplitTitleProps = {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
};

export function SplitTitle({ children, className = 'head__title', as = 'h1' }: SplitTitleProps) {
  const Tag = as;
  const lines = children.split('\n');

  return (
    <Tag className={className} aria-label={children.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li}>
          {line.split(' ').filter(Boolean).map((word, wi) => (
            <span className="word" aria-hidden="true" key={`${li}-${wi}`}>
              {[...word].map((ch, ci) => (
                <span className="ch" key={ci}>{ch}</span>
              ))}
            </span>
          ))}
          {li < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </Tag>
  );
}
