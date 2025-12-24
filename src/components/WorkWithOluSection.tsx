import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, GraduationCap, Heart, Landmark } from "lucide-react";

const audiences = [
  {
    icon: Landmark,
    title: "Government & Development Organisations",
    color: "orange",
  },
  {
    icon: Building2,
    title: "Corporate Organisations",
    color: "teal",
  },
  {
    icon: GraduationCap,
    title: "Learning Institutions",
    color: "gold",
  },
  {
    icon: Heart,
    title: "Healthcare Providers",
    color: "orange",
  },
];

const WorkWithOluSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorClasses = {
    orange: "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
    teal: "bg-accent-teal/10 text-accent-teal border-accent-teal/20",
    gold: "bg-accent-gold/10 text-accent-gold border-accent-gold/20",
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
          <span className="label-text text-accent-teal mb-4 block">Collaboration</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Ways to Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-3xl mx-auto">
            Olu can partner with you through REDtech Africa Consulting, MOMMS, training 
            and facilitation offerings, or bespoke advisory and speaking engagements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="gradient-border p-6 bg-card flex gap-5 items-center"
              >
                <div className={`w-14 h-14 rounded-lg ${colorClasses[audience.color as keyof typeof colorClasses]} border flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">
                    {audience.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-foreground-muted mt-12 max-w-3xl mx-auto text-body-lg"
        >
          If you share a vision for training, talent, technology and impact that truly changes lives, 
          Olu would be happy to explore what is possible together.
        </motion.p>
      </div>
    </section>
  );
};

export default WorkWithOluSection;
