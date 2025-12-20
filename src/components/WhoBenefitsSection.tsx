const beneficiaries = [
  {
    title: "Governments & Development Partners",
    description: "Build talent ecosystems that drive national development. From workforce planning to implementation.",
  },
  {
    title: "Corporates & Financial Institutions",
    description: "Scale your teams with precision. Strategic hiring, leadership development, and organizational design.",
  },
  {
    title: "Universities & Training Providers",
    description: "Bridge the gap between education and employment. Curriculum design, career services, and placement systems.",
  },
  {
    title: "Healthcare Organizations",
    description: "Support your professionals through every career stage. Recruitment, retention, and professional development.",
  },
];

const WhoBenefitsSection = () => {
  return (
    <section 
      className="section-padding section-divider bg-background"
      aria-label="Who This Is For"
    >
      <div className="section-container">
        <h2 className="text-h2 text-foreground mb-spacing-2xl">
          Who This Is For
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-spacing-xl">
          {beneficiaries.map((beneficiary, index) => (
            <a
              key={index}
              href="#contact"
              className="block border-2 border-foreground p-spacing-xl bg-background card-hover focus-ring"
              aria-label={`${beneficiary.title} - Get Started`}
            >
              <h3 className="text-h4 text-foreground mb-spacing-sm">
                {beneficiary.title}
              </h3>
              <p className="text-body-sm text-foreground leading-relaxed mb-spacing-lg">
                {beneficiary.description}
              </p>
              <span className="text-body text-accent link-underline float-right">
                Get Started →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoBenefitsSection;
