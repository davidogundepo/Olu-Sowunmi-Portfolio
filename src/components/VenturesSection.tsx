import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import racLogo from "@/assets/rac-logo.png";
import mommsLogo from "@/assets/momms-logo.png";
import threePnLogo from "@/assets/3pn-logo.png";

const ventures = [
  {
    name: "REDtech Africa Consulting (RAC)",
    role: "Co-Founder and CEO",
    description: "RAC helps governments, donors, corporates and learning institutions turn trained talent into employed talent. The focus is on human capital development and last mile solutions such as skills assessments, hackathons, micro gigs and project-based work that give emerging talent real experience and give employers trusted pipelines.",
    offerings: [
      "Large scale hackathons and innovation challenges",
      "Last mile talent programmes for graduates",
      "Advisory on skills-based hiring models"
    ],
    logo: racLogo,
    color: "orange",
    url: "https://redtechafrica.com",
  },
  {
    name: "MOMMS (Ministry of Medical Missions)",
    role: "Co-Founder",
    description: "MOMMS is a mission driven platform that supports healthcare professionals and organisations, with a focus on empowering health, transforming communities and mobilising talent. Through MOMMS, Olu and his co-founder Dr Anne connect healthcare workers to international opportunities.",
    offerings: [
      "Connect healthcare workers to international opportunities",
      "Support faith based and community providers",
      "Strengthen health systems sustainably"
    ],
    logo: mommsLogo,
    color: "gold",
    url: "https://momms.co.uk",
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
    logo: threePnLogo,
    color: "teal",
    url: null,
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

  const CardWrapper = venture.url ? 'a' : 'div';
  const cardProps = venture.url ? { href: venture.url, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <CardWrapper
        {...cardProps}
        className="gradient-border card-hover p-8 bg-card group cursor-pointer block h-full"
      >
        <div className="w-16 h-16 rounded-full bg-background-secondary flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 overflow-hidden">
          <img src={venture.logo} alt={venture.name} className="w-12 h-12 object-contain" />
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
          <span>{venture.url ? "Visit Website" : "Explore"}</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </CardWrapper>
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

        {/* Additional ventures */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          <a 
            href="https://chandossignatures.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="gradient-border p-6 bg-card group cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-display font-semibold text-foreground text-lg">Chandos</h4>
                <p className="text-sm text-accent-teal">Luxury Fragrance</p>
              </div>
              <ArrowRight className="w-5 h-5 text-accent-orange group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm text-foreground-muted">
              Opulence by Chandos is the epitome of refined sophistication. A fragrance that speaks to your strength, elegance, and individuality, this Eau De Parfum combines the warmth of saffron and cedarwood with the deep richness of oud and rose. Its complex layers unfold from bold top notes to a lingering smoky base, creating an unforgettable scent experience. Whether you wear it day or night, Opulence is more than just a perfume; it's a statement of luxury and quiet strength.
            </p>
          </a>
          <a 
            href="https://stratumgp.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="gradient-border p-6 bg-card group cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-display font-semibold text-foreground text-lg">Stratum Growth Partners</h4>
                <p className="text-sm text-accent-teal">Strategic Investment</p>
              </div>
              <ArrowRight className="w-5 h-5 text-accent-orange group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm text-foreground-muted">
              Empowering Growth Through Strategic Investment. Stratum Growth Partners specialises in discovering, investing in, and empowering high-potential ventures to drive sustainable growth and exceptional returns. A Financial Advisory Investment company of West African origin that provides growth capital and strategic support to high-potential businesses. Our name "Stratum" represents the geological term for layered rock formations, symbolising how we build value incrementally, provide structural stability, and foster collaborative partnerships.
            </p>
          </a>
        </motion.div>

        {/* Additional note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-foreground-muted mt-12 max-w-3xl mx-auto"
        >
          Beyond these core platforms, Olu also advises and invests in ventures across education, 
          property, impact and consumer brands, always with an eye on sustainability and shared value.
        </motion.p>
      </div>
    </section>
  );
};

export default VenturesSection;
