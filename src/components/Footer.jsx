// src/components/Footer.jsx
import EmexLogo from "../assets/emex-logo.svg"


export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Logo & About */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src={EmexLogo} 
                alt="Emex Capital" 
                className="h-8 w-auto mr-3" 
              />
              <span className="text-xl font-bold text-white">
                EMEX <span className="text-amber-400">CAPITAL</span>
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              Quantitative investment strategies for institutional investors and qualified clients.
            </p>
            <div className="flex space-x-4">
              {['linkedin', 'twitter', 'youtube'].map((social) => (
                <a 
                  key={social} 
                  href={`https://${social}.com/emexcapital`} 
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Social icons would go here */}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: 'Strategies', href: '/strategies' },
                { name: 'Performance', href: '/performance' },
                { name: 'Research', href: '/insights' },
                { name: 'Team', href: '/team' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Use', href: '/terms' },
                { name: 'Disclosures', href: '/disclosures' },
                { name: 'Compliance', href: '/compliance' },
                { name: 'SEC Filings', href: '/sec-filings' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <address className="not-italic text-slate-400 space-y-3">
              <p>200 Park Avenue<br />New York, NY 10166</p>
              <p>
                <a href="tel:+12125551234" className="hover:text-amber-400 transition-colors">
                  +1 (212) 555-1234
                </a>
              </p>
              <p>
                <a href="mailto:investors@emexcapital.com" className="hover:text-amber-400 transition-colors">
                  investors@emexcapital.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Emex Capital LLC. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <p className="text-slate-500 text-sm">
              SEC Registered Investment Advisor
            </p>
            <p className="text-slate-500 text-sm">
              Member FINRA/SIPC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}