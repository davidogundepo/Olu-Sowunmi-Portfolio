import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import oluImage2 from "@/assets/olu-2.jpg";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  // Mock available dates (in real implementation, this would come from a calendar API)
  const availableDates = [2, 4, 5, 9, 11, 12, 16, 18, 19, 23, 24, 26];
  
  const isDateAvailable = (date: Date) => {
    return availableDates.includes(date.getDate());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateStr = date ? date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No date selected';
    toast({
      title: "Meeting Request Sent!",
      description: `Thank you for reaching out. Olu will confirm your meeting for ${dateStr} soon.`,
    });
    setFormData({ name: "", email: "", organization: "", message: "" });
    setDate(undefined);
  };

  return (
    <section id="contact" className="section-padding bg-background-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-orange/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent-teal/5 blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-text text-accent-orange mb-4 block">Let's Connect</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            Ready to explore how we can work together? Book a time or send a message.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Calendar Section */}
          <div className="gradient-border bg-card p-6 md:p-8">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md w-full pointer-events-auto"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-lg font-display font-semibold text-foreground",
                nav: "space-x-1 flex items-center",
                nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 border border-border rounded-md flex items-center justify-center hover:bg-muted transition-colors",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex w-full",
                head_cell: "text-foreground-muted rounded-md w-full font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "h-10 w-full text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                day: "h-10 w-10 p-0 font-normal mx-auto rounded-md hover:bg-muted transition-colors flex items-center justify-center",
                day_range_end: "day-range-end",
                day_selected: "bg-accent-teal text-background hover:bg-accent-teal hover:text-background focus:bg-accent-teal focus:text-background",
                day_today: "bg-muted text-foreground",
                day_outside: "day-outside text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
              modifiers={{
                available: (date) => isDateAvailable(date),
              }}
              modifiersStyles={{
                available: {
                  backgroundColor: 'hsl(var(--accent-teal) / 0.2)',
                  borderRadius: '6px',
                },
              }}
              disabled={(date) => date < new Date() || !isDateAvailable(date)}
              components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
              }}
            />
            {date && (
              <p className="mt-4 text-sm text-accent-teal text-center">
                Selected: {date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
          </div>

          {/* Form Section */}
          <div className="gradient-border bg-card p-6 md:p-8">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
              <img
                src={oluImage2}
                alt="Olu Sowunmi"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-display font-semibold text-foreground">Olu Sowunmi</h3>
                <p className="text-sm text-foreground-muted">Usually responds within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-text text-foreground-muted mb-2 block text-xs uppercase tracking-wider">
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
                <label className="label-text text-foreground-muted mb-2 block text-xs uppercase tracking-wider">
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

              <div>
                <label className="label-text text-foreground-muted mb-2 block text-xs uppercase tracking-wider">
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
                <label className="label-text text-foreground-muted mb-2 block text-xs uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all resize-none"
                  placeholder="Tell me about your partnership idea or project..."
                />
              </div>

              <button type="submit" className="btn-gradient w-full flex items-center justify-center gap-3">
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
