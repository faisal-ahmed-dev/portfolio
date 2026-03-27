import { GitFork, Link, Mail } from "lucide-react";
import { PORTFOLIO } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-bold gradient-text">{PORTFOLIO.name}</p>
            <p className="text-sm text-[#555] mt-1">{PORTFOLIO.title}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-[#00F0FF] transition-colors"
              aria-label="GitHub"
            >
              <GitFork size={20} />
            </a>
            <a
              href={PORTFOLIO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-[#00F0FF] transition-colors"
              aria-label="LinkedIn"
            >
              <Link size={20} />
            </a>
            <a
              href={`mailto:${PORTFOLIO.email}`}
              className="text-[#555] hover:text-[#00F0FF] transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          <p className="text-xs text-[#444]">
            © {new Date().getFullYear()} {PORTFOLIO.name}. Built with Next.js + Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
