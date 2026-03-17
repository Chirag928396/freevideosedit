interface PageHeroProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function PageHero({ title, description, icon }: PageHeroProps) {
  return (
    <div className="bg-gradient-to-b from-gray-100/80 dark:from-zinc-900/50 to-transparent border-b border-gray-200 dark:border-zinc-800/50 py-8 mb-8">
      <div className="max-w-4xl mx-auto text-center px-6">
        {icon && (
          <div className="mx-auto mb-4 w-12 h-12 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center shadow-md">
            {icon}
          </div>
        )}
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-xl text-gray-600 dark:text-zinc-400 mt-4">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
