import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Linkedin, Twitter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. Olu will get back to you soon.",
    });
    setFormData({ name: "", email: "", organization: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-orange/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent-teal/5 blur-3xl" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-text text-accent-gold mb-4 block">Let's Connect</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            Ready to explore how we can work together? Whether it's a partnership opportunity, 
            speaking engagement, or just a conversation about Africa's potential—reach out.
          </p>
          <p className="text-foreground-muted mt-4 text-sm">
            Usually responds within 24 hours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="gradient-border bg-card p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-text text-foreground-muted mb-2 block">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="label-text text-foreground-muted mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="label-text text-foreground-muted mb-2 block">
                Organization
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all"
                placeholder="Your Company or Institution"
              />
            </div>

            <div>
              <label className="label-text text-foreground-muted mb-2 block">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all resize-none"
                placeholder="Tell me about your partnership idea, speaking request, or just say hello..."
              />
            </div>

            <button type="submit" className="btn-gradient w-full md:w-auto flex items-center justify-center gap-3">
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* Social Links */}
          <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-foreground-muted">Or connect via social media:</p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:text-accent-orange hover:border-accent-orange transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:text-accent-teal hover:border-accent-teal transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:text-accent-gold hover:border-accent-gold transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
