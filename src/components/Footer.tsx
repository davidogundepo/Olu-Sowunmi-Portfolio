import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";
import { Mail, Linkedin, ArrowUp } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? logoWhite : logoBlack;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="Olu Sowunmi" className="h-20 w-auto mb-6" />
            <p className="text-foreground-muted text-body max-w-md mb-6">
              Builder of people and platforms. Helping organisations, professionals 
              and communities move from good intentions to real outcomes.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:hello@olusowunmi.com"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:text-accent-orange hover:border-accent-orange transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/olu-sowunmi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:text-accent-teal hover:border-accent-teal transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-6">Explore</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-foreground-muted hover:text-accent-orange transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#ventures" className="text-foreground-muted hover:text-accent-orange transition-colors">
                  Ventures
                </a>
              </li>
              <li>
                <a href="#values" className="text-foreground-muted hover:text-accent-orange transition-colors">
                  Core Values
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground-muted hover:text-accent-orange transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Ventures */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-6">Ventures</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://redtechafrica.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent-teal transition-colors"
                >
                  REDtech Africa
                </a>
              </li>
              <li>
                <a 
                  href="https://momms.co.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent-teal transition-colors"
                >
                  MOMMS
                </a>
              </li>
              <li>
                <a 
                  href="https://chandossignatures.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent-teal transition-colors"
                >
                  Chandos
                </a>
              </li>
              <li>
                <a 
                  href="https://stratumgp.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent-teal transition-colors"
                >
                  Stratum GP
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-muted">
            © {new Date().getFullYear()} Olu Sowunmi. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-foreground-muted hover:text-accent-orange transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
