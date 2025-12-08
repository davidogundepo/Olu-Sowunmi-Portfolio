import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Heart, Users, ArrowRight } from "lucide-react";

const ventures = [
  {
    name: "REDtech Africa Consulting (RAC)",
    role: "Co-Founder and CEO",
    description: "RAC helps governments, donors, corporates and learning institutions turn trained talent into employed talent. The focus is on human capital development and last mile solutions such as skills assessments, hackathons, micro gigs and project-based work.",
    offerings: [
      "Large scale hackathons and innovation challenges",
      "Last mile talent programmes for graduates",
      "Advisory on skills-based hiring models"
    ],
    icon: Globe,
    color: "orange",
  },
  {
    name: "3PN",
    role: "Founder",
    description: "3PN exists to help emerging and mid-career professionals design careers that fit their values and goals. Through events, small group programmes and practical tools.",
    offerings: [
      "Gain clarity on direction and strengths",
      "Build personal brands and networks",
      "Navigate career transitions and entrepreneurship"
    ],
    icon: Users,
    color: "teal",
  },
  {
    name: "MOMMS",
    role: "Co-Founder",
    description: "MOMMS is a mission driven platform that supports healthcare professionals and organisations, with a focus on empowering health, transforming communities and mobilising talent.",
    offerings: [
      "Connect healthcare workers to international opportunities",
      "Support faith based and community providers",
      "Strengthen health systems sustainably"
    ],
    icon: Heart,
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

      <h3 className="text-display-sm font-display text-foreground mb-2">
        {venture.name}
      </h3>
      
      <p className="text-accent-teal text-sm font-medium mb-4">{venture.role}</p>

      <p className="text-body text-foreground-muted mb-6">
        {venture.description}
      </p>

      <ul className="space-y-2 mb-6">
        {venture.offerings.map((offering, i) => (
          <li key={i} className="text-sm text-foreground-muted flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-2 flex-shrink-0" />
            {offering}
          </li>
        ))}
      </ul>

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
            Impact <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            A diverse portfolio of ventures united by a common mission: creating sustainable 
            impact across Africa and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ventures.map((venture, index) => (
            <VentureCard key={venture.name} venture={venture} index={index} />
          ))}
        </div>

        {/* Additional note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-foreground-muted mt-12 max-w-3xl mx-auto"
        >
          Beyond these core platforms, Olu also advises and invests in ventures across education, 
          property, impact and consumer brands—always with an eye on sustainability and shared value.
        </motion.p>
      </div>
    </section>
  );
};

export default VenturesSection;
