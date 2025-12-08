import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Landmark, Building2, GraduationCap, ArrowRight } from "lucide-react";

const pathways = [
  {
    icon: Landmark,
    title: "Government Partners",
    description: "Collaborate on policy initiatives and public-private partnerships that accelerate economic development and talent mobility.",
    steps: ["Discovery Call", "Partnership Framework", "Implementation"],
  },
  {
    icon: Building2,
    title: "Corporates",
    description: "Access African talent pipelines and expand your organization's presence in emerging markets through strategic collaboration.",
    steps: ["Needs Assessment", "Talent Mapping", "Integration Support"],
  },
  {
    icon: GraduationCap,
    title: "Universities",
    description: "Build bridges between academic institutions and industry, creating pathways for students to global opportunities.",
    steps: ["Program Design", "Student Engagement", "Career Placement"],
  },
];

const PathwayCard = ({
  pathway,
  index,
}: {
  pathway: (typeof pathways)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = pathway.icon;

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
        <div className="w-14 h-14 rounded-full bg-accent-orange/20 flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-accent-orange" />
        </div>

        <h3 className="text-display-sm font-display text-foreground mb-4">
          {pathway.title}
        </h3>

        <p className="text-body text-foreground-muted mb-8">
          {pathway.description}
        </p>

        {/* Steps */}
        <div className="flex flex-wrap items-center gap-3">
          {pathway.steps.map((step, stepIndex) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent-teal/20 text-accent-teal text-sm font-display font-semibold flex items-center justify-center">
                  {stepIndex + 1}
                </span>
                <span className="text-sm text-foreground-muted font-medium">{step}</span>
              </div>
              {stepIndex < pathway.steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
              )}
            </div>
          ))}
        </div>
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
          <span className="label-text text-accent-orange mb-4 block">Collaboration Pathways</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Partner for <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            Whether you're a government body, corporation, or academic institution, 
            there's a pathway to collaborate and create lasting change together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pathways.map((pathway, index) => (
            <PathwayCard key={pathway.title} pathway={pathway} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
