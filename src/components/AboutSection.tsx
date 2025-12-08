import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import oluImage from "@/assets/olu-2.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={oluImage}
                alt="Olu Sowunmi"
                className="w-full h-[500px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating Accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-orange/20 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-teal/20 rounded-lg -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="label-text text-accent-teal mb-4 block">Who is Olu</span>
            <h2 className="text-display-lg font-display text-foreground mb-6">
              A Life Committed to <span className="gradient-text">Building Others</span>
            </h2>

            <div className="space-y-5 text-body-lg text-foreground-muted">
              <p>
                Olugbenga "Olu" Sowunmi is a builder of people and platforms. For over a decade 
                he has helped organisations, professionals and communities move from good 
                intentions to real outcomes.
              </p>
              <p>
                Olu started his career in technology and consulting, working with organisations 
                such as IBM and later JPMorganChase. At JPMorganChase he led global recruiting 
                strategy, relationship management and inclusion focused initiatives. He was 
                instrumental in creating BOLD Connect, an internal community that brought together 
                Black professionals, allies and senior leaders for mentoring, sponsorship and 
                career progression.
              </p>
              <p className="text-accent-gold italic font-medium">
                "Impact isn't measured by what we build, but by who we build."
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="border-l-2 border-accent-orange pl-4">
                <span className="text-display-sm font-display gradient-text">10+</span>
                <p className="text-sm text-foreground-muted">Years Experience</p>
              </div>
              <div className="border-l-2 border-accent-teal pl-4">
                <span className="text-display-sm font-display gradient-text">6</span>
                <p className="text-sm text-foreground-muted">Ventures Founded</p>
              </div>
              <div className="border-l-2 border-accent-gold pl-4">
                <span className="text-display-sm font-display gradient-text">3</span>
                <p className="text-sm text-foreground-muted">Continents Impacted</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
