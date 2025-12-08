import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const metrics = [
  { value: 5000, suffix: "+", label: "Talents Trained" },
  { value: 200, suffix: "", label: "Global Placements" },
  { value: 15, suffix: "", label: "Countries Reached" },
  { value: 6, suffix: "", label: "Active Ventures" },
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
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return animation.stop;
    }
  }, [isInView, value, count]);

  return (
    <motion.span className="text-display-xl font-display gradient-text">
      {rounded.get()}
      {suffix}
    </motion.span>
  );
};

const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
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
          className="text-center mb-20"
        >
          <span className="label-text text-accent-gold mb-4 block">Real Impact</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Numbers That <span className="gradient-text">Matter</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            Quantifiable outcomes that demonstrate our commitment to creating lasting 
            change across communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-4">
                <span className="text-display-xl font-display gradient-text">
                  {isInView && (
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      isInView={isInView}
                    />
                  )}
                </span>
              </div>
              <p className="label-text text-foreground-muted">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
