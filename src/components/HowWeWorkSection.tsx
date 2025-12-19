import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const workAreas = [
  {
    number: "1",
    title: "Strategy & Design",
    items: [
      "Talent Strategy",
      "Learning and Programme Design",
      "Workforce Planning & DEI Frameworks"
    ],
    color: "orange",
  },
  {
    number: "2",
    title: "Delivery",
    items: [
      "Training Delivery",
      "Executive Search",
      "Assessment"
    ],
    color: "teal",
  },
  {
    number: "3",
    title: "Speaking",
    items: [
      "Keynotes and Panels",
      "Workshop Facilitation & Leadership Retreats",
      "Podcast Appearances"
    ],
    color: "gold",
  },
];

const HowWeWorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorClasses = {
    orange: "border-l-accent-orange text-accent-orange",
    teal: "border-l-accent-teal text-accent-teal",
    gold: "border-l-accent-gold text-accent-gold",
  };

  return (
    <section className="section-padding bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-display-lg font-display text-foreground">
            How We <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`border-l-4 ${colorClasses[area.color as keyof typeof colorClasses]} pl-6`}
            >
              <span className={`text-display-lg font-display ${colorClasses[area.color as keyof typeof colorClasses].split(' ')[1]}`}>
                {area.number}
              </span>
              
              <h3 className="text-display-sm font-display text-foreground mb-6 uppercase tracking-wide">
                {area.title}
              </h3>

              <ul className="space-y-3">
                {area.items.map((item, i) => (
                  <li key={i} className="text-body text-foreground-muted flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground-muted" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
