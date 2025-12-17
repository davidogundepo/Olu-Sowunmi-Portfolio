import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, ChevronLeft, ChevronRight, Clock, Check, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import oluImage2 from "@/assets/olu-2.jpg";

const timeSlots = [
  { duration: 45, label: "45 min", description: "Discovery session" },
  { duration: 60, label: "1 hour", description: "Deep dive consultation" },
];

const availableTimes = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'date' | 'duration' | 'time' | 'form' | 'success'>('date');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  // Generate calendar data - start from current month
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Check if a day is Tuesday (2) or Thursday (4)
  const isTuesdayOrThursday = (day: number) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayOfWeek = checkDate.getDay();
    // Also ensure it's not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (dayOfWeek === 2 || dayOfWeek === 4) && checkDate >= today;
  };

  const handleDateSelect = (day: number) => {
    if (isTuesdayOrThursday(day)) {
      setDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
      setStep('duration');
    }
  };

  const handleDurationSelect = (duration: number) => {
    setSelectedDuration(duration);
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('form');
  };

  const handleBack = () => {
    if (step === 'duration') {
      setStep('date');
      setDate(undefined);
    } else if (step === 'time') {
      setStep('duration');
      setSelectedDuration(null);
    } else if (step === 'form') {
      setStep('time');
      setSelectedTime(null);
    }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const dateStr = date ? date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';
    const durationSlot = timeSlots.find(t => t.duration === selectedDuration);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Booking Request Sent!",
      description: `Thank you! Olu will confirm your ${durationSlot?.label} meeting on ${dateStr} at ${selectedTime}.`,
    });
    
    setStep('success');
    setIsSubmitting(false);
  };

  const resetBooking = () => {
    setFormData({ name: "", email: "", organization: "", message: "" });
    setDate(undefined);
    setSelectedDuration(null);
    setSelectedTime(null);
    setStep('date');
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-foreground-muted/30 text-lg">
          {prevMonthDays - i}
        </div>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const available = isTuesdayOrThursday(day);
      const isSelected = date?.getDate() === day && date?.getMonth() === currentMonth.getMonth();
      
      days.push(
        <motion.button
          key={day}
          type="button"
          whileHover={available ? { scale: 1.1 } : {}}
          whileTap={available ? { scale: 0.95 } : {}}
          onClick={() => handleDateSelect(day)}
          disabled={!available}
          className={`
            w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-lg font-semibold transition-all duration-200
            ${available 
              ? isSelected 
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                : 'bg-primary/20 text-foreground hover:bg-primary/40 cursor-pointer'
              : 'text-foreground-muted/40 cursor-not-allowed'}
          `}
        >
          {day}
        </motion.button>
      );
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div key={`next-${i}`} className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-foreground-muted/30 text-lg">
          {i}
        </div>
      );
    }

    return (
      <div className="w-full">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevMonth}
            className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth}
            className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>

        {/* Day Names - highlight Tu and Th */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {dayNames.map(day => (
            <div 
              key={day} 
              className={`w-12 h-10 sm:w-14 flex items-center justify-center font-semibold text-sm sm:text-base
                ${(day === 'Tu' || day === 'Th') ? 'text-primary' : 'text-foreground-muted'}
              `}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground-muted">
          <div className="w-4 h-4 rounded bg-primary/20" />
          <span>Available (Tuesdays & Thursdays only)</span>
        </div>
      </div>
    );
  };

  return (
    <section id="contact" className="section-padding bg-background-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-text text-primary mb-4 block">Let's Connect</span>
          <h2 className="text-display-lg font-display text-foreground mb-6">
            Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            Ready to explore how we can work together? Book a time or send a message.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              {/* Success Card */}
              <div className="relative rounded-2xl overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-br from-primary via-primary/80 to-secondary p-8 sm:p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
                  >
                    <CalendarIcon className="w-12 h-12 text-background" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-background flex items-center justify-center"
                    >
                      <Check className="w-6 h-6 text-primary" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl font-display font-bold text-background mb-4"
                  >
                    Your meeting is booked!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-background/90 text-lg"
                  >
                    You and Olu will be receiving an invitation email shortly.
                  </motion.p>
                </div>

                {/* Details Card */}
                <div className="bg-card p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="border-l-4 border-primary pl-4 mb-6"
                  >
                    <p className="text-foreground-muted text-sm mb-1">Meeting with</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={oluImage2}
                        alt="Olu Sowunmi"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-display font-semibold text-foreground text-lg">Olu Sowunmi</h4>
                        <p className="text-foreground-muted text-sm">{formData.organization || 'Consultant'}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4 mb-8"
                  >
                    <div className="flex items-center gap-4 text-foreground">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {date?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {selectedTime} - {selectedDuration} minutes
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <button
                      onClick={resetBooking}
                      className="flex-1 px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-lg transition-colors"
                    >
                      Book Another Meeting
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Calendar Section */}
              <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-primary via-primary/50 to-secondary">
                <div className="bg-card rounded-2xl p-6 sm:p-8 min-h-[500px]">
                  <AnimatePresence mode="wait">
                    {step === 'date' && (
                      <motion.div
                        key="calendar"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {renderCalendar()}
                      </motion.div>
                    )}

                    {step === 'duration' && (
                      <motion.div
                        key="duration"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <button
                          type="button"
                          onClick={handleBack}
                          className="flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Back to calendar</span>
                        </button>

                        <div className="text-center mb-8">
                          <CalendarIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                          <p className="text-lg text-foreground font-medium">
                            {date?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>

                        <h4 className="text-xl font-display font-semibold text-foreground mb-6 text-center">
                          Select Duration
                        </h4>

                        <div className="space-y-4">
                          {timeSlots.map((slot, index) => (
                            <motion.button
                              key={slot.duration}
                              type="button"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02, x: 8 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleDurationSelect(slot.duration)}
                              className={`
                                w-full p-5 rounded-xl border-2 border-border bg-muted/50 hover:border-primary hover:bg-primary/10
                                flex items-center gap-4 transition-all duration-200 group
                              `}
                            >
                              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                <Clock className="w-6 h-6 text-primary" />
                              </div>
                              <div className="text-left flex-1">
                                <p className="text-lg font-semibold text-foreground">{slot.label}</p>
                                <p className="text-sm text-foreground-muted">{slot.description}</p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-foreground-muted group-hover:text-primary transition-colors" />
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 'time' && (
                      <motion.div
                        key="time"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <button
                          type="button"
                          onClick={handleBack}
                          className="flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Back to duration</span>
                        </button>

                        <div className="text-center mb-8">
                          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4">
                            <CalendarIcon className="w-5 h-5 text-primary" />
                            <span className="text-foreground font-medium">
                              {date?.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                            </span>
                            <span className="text-foreground-muted">•</span>
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="text-foreground font-medium">{selectedDuration} min</span>
                          </div>
                        </div>

                        <h4 className="text-xl font-display font-semibold text-foreground mb-6 text-center">
                          Select Time
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                          {availableTimes.map((time, index) => (
                            <motion.button
                              key={time}
                              type="button"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleTimeSelect(time)}
                              className="p-4 rounded-xl border-2 border-border bg-muted/50 hover:border-primary hover:bg-primary/10 transition-all duration-200"
                            >
                              <span className="text-lg font-semibold text-foreground">{time}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 'form' && (
                      <motion.div
                        key="confirmed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <button
                          type="button"
                          onClick={handleBack}
                          className="flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Back to time</span>
                        </button>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6"
                        >
                          <Check className="w-10 h-10 text-background" />
                        </motion.div>

                        <h4 className="text-2xl font-display font-semibold text-foreground mb-4">
                          Meeting Selected!
                        </h4>

                        <div className="bg-muted/50 rounded-xl p-6 mb-6 space-y-3">
                          <div className="flex items-center justify-center gap-3">
                            <CalendarIcon className="w-5 h-5 text-primary" />
                            <span className="text-foreground font-medium">
                              {date?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex items-center justify-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="text-foreground font-medium">
                              {selectedTime} • {selectedDuration} minutes
                            </span>
                          </div>
                        </div>

                        <p className="text-foreground-muted text-sm">
                          Complete the form to confirm your booking →
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Form Section */}
              <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-secondary via-secondary/50 to-primary">
                <div className="bg-card rounded-2xl p-6 sm:p-8 h-full">
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
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                        placeholder="Tell me about your partnership idea or project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-gradient w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? 'Sending...' : step === 'form' ? 'Confirm Booking' : 'Send Message'}</span>
                      {!isSubmitting && <Send className="w-5 h-5" />}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactSection;
