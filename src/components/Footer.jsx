// src/components/Footer.jsx
import EmexLogo from "../assets/emex-logo.svg"
import { Linkedin, Twitter, Youtube } from "lucide-react" // Using Lucide icons for better looking social icons

const socialLinks = [
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com/company/emexcapital',
    icon: <Linkedin className="h-5 w-5" />
  },
  { 
    name: 'Twitter', 
    href: 'https://twitter.com/emexcapital',
    icon: <Twitter className="h-5 w-5" />
  },
  { 
    name: 'YouTube', 
    href: 'https://youtube.com/emexcapital',
    icon: <Youtube className="h-5 w-5" />
  }
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Use', href: '/terms' },
  { name: 'Disclosures', href: '/disclosures' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'SEC Filings', href: '/sec-filings' }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-800/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Logo & About */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src={EmexLogo} 
                alt="Emex Capital" 
                className="h-8 w-auto mr-3" 
                loading="lazy" // Lazy load logo
              />
              <span className="text-xl font-bold text-white">
                EMEX <span className="text-amber-400">CAPITAL</span>
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed">
              Quantitative investment strategies for institutional investors and qualified clients.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-200 inline-block py-1"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-200 inline-block py-1"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <address className="not-italic text-slate-400 space-y-3">
              <p className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Uyo, Akwa Ibom</span>
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+2348164149553" className="hover:text-amber-400 transition-colors duration-200">
                  +234 816 414 9553
                </a>
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:investors@emexcapital.com" className="hover:text-amber-400 transition-colors duration-200">
                  investors@emexcapital.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {currentYear} Emex Capital LLC. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-center">
            <p className="text-slate-500 text-sm">
              CAC Registered Investment Advisor
            </p>
            <p className="text-slate-500 text-sm">
              Member FINRA/SIPC
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}