import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Rocket, Mic } from "lucide-react";

const workAreas = [
  {
    icon: Compass,
    title: "Strategy & Design",
    services: [
      "Talent strategy audits",
      "Workforce planning",
      "Learning program design",
      "Employer branding",
      "DEI frameworks"
    ],
  },
  {
    icon: Rocket,
    title: "Delivery",
    services: [
      "Executive search",
      "Recruitment process outsourcing",
      "Training delivery",
      "Assessment centers",
      "Onboarding systems"
    ],
  },
  {
    icon: Mic,
    title: "Speaking",
    services: [
      "Keynotes & panels",
      "Workshop facilitation",
      "Leadership retreats",
      "Podcast appearances",
      "Conference hosting"
    ],
  },
];

const WorkAreaCard = ({
  area,
  index,
}: {
  area: (typeof workAreas)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = area.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-card p-8 rounded-lg border-l-[5px] border-accent-teal relative overflow-hidden group"
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-accent-orange/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent-orange" />
          </div>
          <div className="w-8 h-8 rounded-full bg-accent-teal/30 flex items-center justify-center text-foreground font-display font-bold text-sm">
            {index + 1}
          </div>
        </div>

        <h3 className="text-display-sm font-display text-foreground mb-6">
          {area.title}
        </h3>

        <ul className="space-y-3">
          {area.services.map((service, i) => (
            <li key={i} className="text-body text-foreground-muted flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal" />
              {service}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const CollaborationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="collaborate" className="section-padding bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="label-text text-accent-orange mb-4 block">How We Work</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Partner for <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            With clients and partners, Olu typically helps in three main ways—whether you're a 
            government, corporate, university, or healthcare organisation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {workAreas.map((area, index) => (
            <WorkAreaCard key={area.title} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
