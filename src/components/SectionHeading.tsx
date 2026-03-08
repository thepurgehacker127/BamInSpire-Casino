type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
          {description}
        </p>
      ) : null}
    </div>
  );
}