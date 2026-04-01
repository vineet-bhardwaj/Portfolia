/**
 * TechnicalStack Component
 * Displays a bento-style grid of skill categories with chips
 */

export interface SkillCategory {
  icon: string;
  title: string;
  skills: string[]; // Changed from Skill[] to string[]
  bgStyle?: string; // Accept any string from Sanity
}

interface TechnicalStackProps {
  title?: string;
  subtitle?: string;
  categories: SkillCategory[];
}

const getBgClass = (style?: string) => {
  switch (style) {
    case 'medium':
      return 'bg-surface-container-highest';
    case 'high':
      return 'bg-surface-container-high';
    case 'light':
    default:
      return 'bg-surface-container-low';
  }
};

const getChipClass = (style?: string) => {
  switch (style) {
    case 'medium':
      return 'bg-tertiary-container px-4 py-2 rounded-lg text-xs font-semibold tracking-wide text-on-tertiary-container uppercase';
    default:
      return 'bg-surface-container-lowest px-4 py-2 rounded-lg text-xs font-semibold tracking-wide text-on-tertiary-container uppercase border border-outline-variant/10';
  }
};

export default function TechnicalStack({ 
  title = "The Technical Stack",
  subtitle,
  categories 
}: TechnicalStackProps) {
  return (
    <section className="mb-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="font-label text-xs uppercase tracking-widest font-semibold text-tertiary mb-4 block">
            Capabilities
          </span>
          <h2 className="font-serif text-4xl text-on-surface">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="font-body text-on-surface-variant max-w-md text-sm md:text-base italic">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${getBgClass(category.bgStyle)} p-8 rounded-xl flex flex-col h-full`}
          >
            <div className="flex items-center gap-3 mb-10">
              <span className="material-symbols-outlined text-tertiary">
                {category.icon}
              </span>
              <h3 className="font-serif text-2xl italic">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className={getChipClass(category.bgStyle)}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
