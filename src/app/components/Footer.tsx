import Link from 'next/link';

const footerLinks = [
  {
    heading: 'Product',
    links: [
      { text: 'Windsurf Editor', href: '#' },
      { text: 'Windsurf Plugins', href: '#' },
      { text: 'Windsurf Reviews', href: '#' },
      { text: 'Pricing', href: '#' },
      { text: 'Windsurf for Enterprise', href: '#' },
    ],
  },
  {
    heading: 'Capabilities',
    links: [
      { text: 'Cascade', href: '#' },
      { text: 'Tab', href: '#' },
      { text: 'Chat', href: '#' },
      { text: 'Command', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { text: 'About Us', href: '#' },
      { text: 'Blog', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Compare', href: '#' },
      { text: 'Contact', href: '#' },
      { text: 'Partnerships', href: '#' },
      { text: 'Terms of Service', href: '#' },
      { text: 'Privacy Policy', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { text: 'Docs', href: '#' },
      { text: 'Changelog', href: '#' },
      { text: 'Releases', href: '#' },
      { text: 'FAQ', href: '#' },
      { text: 'Support', href: '#' },
    
    ],
  },

];

const Footer = () => {
  return (
    <footer className="bg-black text-white overflow-x-hidden">
      <div className="container mx-auto px-8 md:px-12 lg:px-24 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Left Section - Logo & Socials */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-start">
            <div className="flex items-center mb-4">
              {/* Placeholder for 'W' icon */}
              <span className="text-4xl font-bold mr-2">W</span> 
              <span className="text-2xl font-bold">Windsurf</span>
            </div>
            <p className="text-gray-400 text-base mb-6">Built to keep you in flow state.</p>
            {/* Social Icons - Placeholders */}
          </div>

          {/* Right Sections - Link Columns */}
          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="font-bold text-lg mb-4">{section.heading}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-gray-400 hover:text-white text-base transition-colors">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="border-t border-neutral-800 pt-8 pb-4">
        <p className="text-gray-400 text-sm text-left px-8 md:px-12 lg:px-24">
          &copy; {new Date().getFullYear()} Exafunction, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 