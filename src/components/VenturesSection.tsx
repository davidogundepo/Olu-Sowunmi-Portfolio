import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Package, Building, TrendingUp, Users, Recycle, ArrowRight } from "lucide-react";

const ventures = [
  {
    name: "REDtech Africa",
    description: "Connecting African tech talent to global opportunities through training, placement, and community building.",
    icon: Globe,
    color: "orange",
  },
  {
    name: "MOMMS",
    description: "Revolutionary supply chain solutions addressing Africa's logistics challenges with technology-driven approaches.",
    icon: Package,
    color: "teal",
  },
  {
    name: "Chandos",
    description: "Strategic advisory and investment firm focused on high-growth opportunities across emerging markets.",
    icon: Building,
    color: "gold",
  },
  {
    name: "Stratum GP",
    description: "General partnership vehicle driving investments in transformative African businesses and infrastructure.",
    icon: TrendingUp,
    color: "orange",
  },
  {
    name: "3PN",
    description: "Pan-African professional network fostering collaboration and knowledge exchange across borders.",
    icon: Users,
    color: "teal",
  },
  {
    name: "Tucyclers",
    description: "Sustainable waste management and recycling initiative promoting circular economy principles.",
    icon: Recycle,
    color: "gold",
  },
];

const VentureCard = ({
  venture,
  index,
}: {
  venture: (typeof ventures)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = venture.icon;

  const iconColorClass = {
    orange: "bg-accent-orange",
    teal: "bg-accent-teal",
    gold: "bg-accent-gold",
  }[venture.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="gradient-border card-hover p-8 bg-card group cursor-pointer"
    >
      <div className={`w-16 h-16 rounded-full ${iconColorClass} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
        <Icon className="w-8 h-8 text-background" />
      </div>

      <h3 className="text-display-sm font-display text-foreground mb-4">
        {venture.name}
      </h3>

      <p className="text-body text-foreground-muted mb-6 line-clamp-3">
        {venture.description}
      </p>

      <div className="flex items-center gap-2 text-accent-orange font-display font-medium transition-all duration-300 group-hover:gap-4">
        <span>Explore</span>
        <ArrowRight className="w-5 h-5" />
      </div>
    </motion.div>
  );
};

const VenturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ventures" className="section-padding bg-background-secondary relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="label-text text-accent-teal mb-4 block">Ventures Hub</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Building the <span className="gradient-text">Future</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            A portfolio of ventures united by a common mission: creating sustainable 
            pathways for African talent and enterprise to thrive globally.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ventures.map((venture, index) => (
            <VentureCard key={venture.name} venture={venture} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenturesSection;
