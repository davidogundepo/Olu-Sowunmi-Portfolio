import { motion, useMotionValue, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Building, Globe, Briefcase } from "lucide-react";

const metrics = [
  { value: 5000, suffix: "+", label: "Talents Trained", icon: Users },
  { value: 200, suffix: "+", label: "Global Placements", icon: Building },
  { value: 15, suffix: "", label: "Countries Reached", icon: Globe },
  { value: 6, suffix: "", label: "Active Ventures", icon: Briefcase },
];

const AnimatedCounter = ({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const unsubscribe = count.on("change", (latest) => {
        setDisplayValue(Math.round(latest));
      });
      
      const animation = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      
      return () => {
        unsubscribe();
        animation.stop();
      };
    }
  }, [isInView, value, count]);

  return (
    <span className="font-display gradient-text whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent-orange/10 blur-3xl float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent-teal/10 blur-3xl float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="label-text text-accent-orange mb-4 block">Real Impact</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Numbers That <span className="gradient-text">Matter</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            Quantifiable outcomes that demonstrate our commitment to creating lasting 
            change across communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="gradient-border bg-card p-4 sm:p-5 md:p-6 lg:p-8 text-center flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-accent-orange/20 flex items-center justify-center mb-3 md:mb-4">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent-orange" />
                </div>
                <div className="mb-2 overflow-hidden">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    isInView={isInView}
                  />
                </div>
                <p className="label-text text-foreground-muted uppercase tracking-wider text-[10px] sm:text-xs md:text-sm leading-tight">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;