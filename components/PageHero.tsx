interface PageHeroProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function PageHero({ title, description, icon }: PageHeroProps) {
  return (
    <div className="bg-gradient-to-b from-zinc-900/50 to-transparent border-b border-zinc-800/50 py-8 mb-8">
      <div className="max-w-4xl mx-auto text-center px-6">
        {icon && (
          <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
            {icon}
          </div>
        )}
        <h1
          className="text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-xl text-zinc-400 mt-4">{description}</p>
        )}
      </div>
    </div>
  );
}
