interface Experience {
  period: string;
  position: string;
  company: string;
  location: string;
}

interface ProfessionalJourneyProps {
  title?: string;
  experiences?: Experience[];
}

export default function ProfessionalJourney({
  title = "Professional Journey",
  experiences = [],
}: ProfessionalJourneyProps) {
  return (
    <section className="mb-32">
      <div className="border-t border-outline-variant/20 pt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h3 className="font-serif text-3xl italic">{title}</h3>
        </div>
        <div className="md:col-span-8 space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-outline-variant/10 pb-8"
            >
              <div>
                <p className="font-label text-[10px] uppercase tracking-tighter text-tertiary">
                  {exp.period}
                </p>
                <h4 className="font-body text-xl font-bold">{exp.position}</h4>
                <p className="text-on-surface-variant italic">{exp.company}</p>
              </div>
              <span className="text-sm text-on-surface-variant hidden md:block">
                {exp.location}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
