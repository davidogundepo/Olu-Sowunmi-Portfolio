import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, CheckCircle, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "People Before Projects",
    description: "Every initiative is ultimately about the people it serves. The best strategies fail if people are ignored.",
    color: "orange",
  },
  {
    icon: CheckCircle,
    title: "Proof Over Promises",
    description: "I believe in demonstrable results. Pilot quickly, learn honestly, then scale what works. My track record speaks louder than proposals.",
    color: "teal",
  },
  {
    icon: Users,
    title: "Partnership Over Ego",
    description: "True impact comes from collaboration. Real change in Africa and beyond will always require governments, private sector, faith and community leaders to work together.",
    color: "gold",
  },
];

const ValuesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorClasses = {
    orange: "bg-accent-orange/20 text-accent-orange",
    teal: "bg-accent-teal/20 text-accent-teal",
    gold: "bg-accent-gold/20 text-accent-gold",
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-accent-gold/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-orange/5 blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-text text-accent-gold mb-4 block">Core Values</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            What I <span className="gradient-text">Stand For</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            My work is anchored on a few core ideas that guide every decision and partnership.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center p-8"
              >
                <div className={`w-16 h-16 rounded-full ${colorClasses[value.color as keyof typeof colorClasses]} flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-display-sm font-display text-foreground mb-4">
                  {value.title}
                </h3>

                <p className="text-body text-foreground-muted">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
