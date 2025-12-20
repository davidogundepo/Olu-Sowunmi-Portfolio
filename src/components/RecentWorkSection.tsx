const caseStudies = [
  {
    name: "National Talent Pipeline Initiative",
    description: "Designed and implemented a national workforce development program connecting graduates with employment opportunities.",
    metric: "10,000+",
    metricLabel: "graduates placed",
  },
  {
    name: "Healthcare Professional Support Platform",
    description: "Built a comprehensive support system for healthcare workers, covering career development, mental health, and professional networking.",
    metric: "500+",
    metricLabel: "professionals trained",
  },
  {
    name: "Financial Services Talent Transformation",
    description: "Led organizational redesign and talent acquisition strategy for a major financial institution entering new markets.",
    metric: "3x",
    metricLabel: "team growth in 18 months",
  },
  {
    name: "EdTech Platform Development",
    description: "Architected and launched a learning management system serving multiple institutions across Africa.",
    metric: "25+",
    metricLabel: "institutions onboarded",
  },
];

const RecentWorkSection = () => {
  return (
    <section 
      className="section-padding section-divider bg-background"
      aria-label="Recent Work"
    >
      <div className="section-container">
        <h2 className="text-h2 text-foreground mb-spacing-2xl">
          Recent Work
        </h2>
        
        <div className="space-y-spacing-3xl">
          {caseStudies.map((study, index) => (
            <article
              key={index}
              className="border-l-8 border-accent pl-spacing-xl py-spacing-sm"
            >
              <h3 className="text-venture text-foreground mb-spacing-xs">
                {study.name}
              </h3>
              <p className="text-body text-foreground mb-spacing-md">
                {study.description}
              </p>
              <div className="flex items-baseline gap-spacing-sm">
                <span className="text-metric text-accent">{study.metric}</span>
                <span className="text-body text-foreground">{study.metricLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWorkSection;
