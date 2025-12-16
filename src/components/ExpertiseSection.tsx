import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, GraduationCap, Handshake } from "lucide-react";
import oluImage4 from "@/assets/olu-4.jpg";

const expertiseAreas = [
  {
    icon: Target,
    title: "Talent Leader",
    description: "Olu's core craft is talent strategy. Finding it, growing it, and putting it to work on real problems. From his days in VIPCG, Tribal, G4S, RSG, IBM and JPMorganChase to his work through REDtech Africa Consulting, MOMMS and 3PN, he has consistently sat at the intersection of business strategy and human potential.",
    offerings: [
      "Design talent and inclusion strategies that reflect reality on the ground",
      "Executive Search and build pipelines of emerging talent that are skills based rather than CV based",
      "Create environments where diverse teams can perform and stay for the long term"
    ],
    color: "orange",
  },
  {
    icon: GraduationCap,
    title: "Trainer",
    description: "In recent years, Olu has become a sought-after trainer and facilitator for organisations that want more than motivational talks. They want mindsets to shift and behaviours to change. His training style is interactive and grounded in real life. Less theory, more tools that participants can use the next day with their teams.",
    offerings: [
      "Human capital development and human capacity building",
      "Talent management and succession for modern organisations",
      "Building team excellence for supervisors, managers and emerging leaders",
      "Strategy execution and accountability for mission critical teams"
    ],
    color: "teal",
  },
  {
    icon: Handshake,
    title: "Bridge Builder",
    description: "Olu splits his time across mission aligned platforms, each one focused on turning potential into visible results. He brings a mix of corporate discipline, entrepreneurial creativity and community heart. He is comfortable in the boardroom, on campus, in a government office or at a community event.",
    offerings: [
      "Strategy and programme design for talent, inclusion and youth programmes",
      "Delivery and facilitation of hackathons, bootcamps and workshops",
      "Speaking and thought partnership on African talent and the future of work"
    ],
    color: "gold",
  },
];

const ExpertiseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorClasses = {
    orange: "border-accent-orange text-accent-orange",
    teal: "border-accent-teal text-accent-teal",
    gold: "border-accent-gold text-accent-gold",
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-text text-accent-orange mb-4 block">What I Do</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Areas of <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            Senior leaders value his mix of data, common sense and sensitivity to culture.
          </p>
        </motion.div>

        <div className="space-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >
                <div className={isEven ? '' : 'lg:order-2'}>
                  <div className={`w-16 h-16 rounded-full border-2 ${colorClasses[area.color as keyof typeof colorClasses]} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-display-md font-display text-foreground mb-4">
                    {area.title}
                  </h3>

                  <p className="text-body text-foreground-muted mb-6">
                    {area.description}
                  </p>

                  <ul className="space-y-3">
                    {area.offerings.map((offering, i) => (
                      <li key={i} className="text-body text-foreground-muted flex items-start gap-3">
                        <span className={`w-2 h-2 rounded-full bg-accent-${area.color} mt-2 flex-shrink-0`} />
                        {offering}
                      </li>
                    ))}
                  </ul>
                </div>

                {index === 0 && (
                  <div className={isEven ? '' : 'lg:order-1'}>
                    <img
                      src={oluImage4}
                      alt="Olu Sowunmi in professional setting"
                      className="rounded-lg w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}

                {index !== 0 && (
                  <div className={`gradient-border p-8 bg-card ${isEven ? '' : 'lg:order-1'}`}>
                    <h4 className="font-display font-semibold text-foreground mb-4">
                      {area.title === "Trainer" ? "Training Topics" : "How Olu Helps"}
                    </h4>
                    <ul className="space-y-2 text-sm text-foreground-muted">
                      {area.offerings.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent-orange">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
