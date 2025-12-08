import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Building2, Rocket, Users, Star } from "lucide-react";

const milestones = [
  {
    year: "2015",
    title: "IBM",
    description: "Began career at IBM, developing expertise in enterprise technology and global operations.",
    icon: Building2,
  },
  {
    year: "2017",
    title: "JPMorgan BOLD",
    description: "Selected for JPMorgan's prestigious BOLD program, gaining insights into global finance.",
    icon: Briefcase,
  },
  {
    year: "2019",
    title: "REDtech Africa",
    description: "Founded REDtech Africa to bridge the gap between African talent and global tech opportunities.",
    icon: Rocket,
  },
  {
    year: "2021",
    title: "MOMMS",
    description: "Launched MOMMS to address critical supply chain challenges across the continent.",
    icon: Users,
  },
  {
    year: "Present",
    title: "Building Bridges",
    description: "Expanding ventures portfolio and deepening impact across Africa and beyond.",
    icon: Star,
  },
];

const TimelineItem = ({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = milestone.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12"
    >
      {/* Timeline Dot */}
      <div className="relative z-10 flex-shrink-0">
        <div className="timeline-dot flex items-center justify-center bg-accent-orange">
          <Icon className="w-3 h-3 text-background" />
        </div>
      </div>

      {/* Content Card */}
      <div className="gradient-border card-hover p-6 md:p-8 w-full max-w-lg bg-card">
        <span className="label-text text-accent-teal">{milestone.year}</span>
        <h3 className="text-display-sm font-display text-foreground mt-2 mb-3">
          {milestone.title}
        </h3>
        <p className="text-body text-foreground-muted">{milestone.description}</p>
      </div>
    </motion.div>
  );
};

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent-orange via-accent-teal to-accent-orange opacity-30 hidden md:block" />

      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="label-text text-accent-orange mb-4 block">The Journey</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            A Path of <span className="gradient-text">Purpose</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            From corporate corridors to entrepreneurial frontiers, every step has been 
            guided by a singular vision: unlocking Africa's potential.
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-16 relative">
          {milestones.map((milestone, index) => (
            <TimelineItem key={milestone.year} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
