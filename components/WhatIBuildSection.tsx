interface WhatIBuildSectionProps {
  id?: string;
}

const ventures = [
  {
    name: "REDtech Africa Consulting",
    description: "Strategic resourcing & edtech",
    link: "#",
  },
  {
    name: "MOMMS",
    description: "Healthcare professional support",
    link: "#",
  },
  {
    name: "Advisory",
    description: "PE, finance, impact ventures",
    link: "#",
  },
];

const WhatIBuildSection = ({ id }: WhatIBuildSectionProps) => {
  return (
    <section 
      id={id}
      className="section-padding section-divider bg-background"
      aria-label="What I Build"
    >
      <div className="section-container">
        <h2 className="text-h2 text-foreground mb-spacing-2xl">
          What I Build
        </h2>
        
        <div className="space-y-spacing-lg">
          {ventures.map((venture, index) => (
            <a
              key={index}
              href={venture.link}
              className="flex items-baseline gap-spacing-sm py-spacing-sm px-spacing-sm -mx-spacing-sm hover:bg-secondary transition-colors duration-fast focus-ring group"
              aria-label={`${venture.name} - ${venture.description}`}
            >
              <span className="text-h4 text-foreground shrink-0">→</span>
              <span className="text-venture text-foreground">{venture.name}</span>
              <span className="text-body text-foreground">— {venture.description}</span>
              <span className="text-body text-accent link-underline ml-spacing-sm">[Link]</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIBuildSection;
