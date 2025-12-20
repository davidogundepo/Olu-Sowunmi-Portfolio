import oluPortrait from "@/assets/olu-portrait-1.jpg";

const BeliefSection = () => {
  return (
    <section 
      className="section-padding section-divider bg-background"
      aria-label="The Belief"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-spacing-3xl items-center">
          <div>
            <blockquote className="text-quote text-foreground">
              "People rarely lack talent. They usually lack systems, support and opportunity."
            </blockquote>
            
            <div className="mt-spacing-xl space-y-spacing-xl">
              <p className="text-body text-foreground">
                For over a decade, I've worked at the intersection of talent, technology, and transformation. 
                I've seen firsthand how the right systems can unlock human potential at scale.
              </p>
              
              <p className="text-body text-foreground">
                Whether building teams for global financial institutions, designing talent pipelines for 
                governments, or creating platforms that serve thousands of healthcare professionals—my 
                approach remains the same: start with people, build with purpose.
              </p>
              
              <p className="text-body text-foreground">
                Today, I focus on helping organizations create the infrastructure that enables their 
                people to thrive. Because when systems work, people flourish.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <img 
              src={oluPortrait}
              alt="Olu Sowunmi"
              className="w-full max-w-[400px] h-auto grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeliefSection;
