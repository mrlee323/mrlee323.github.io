'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/config';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/categories/', label: 'Categories' },
    { href: '/archives/', label: 'Archives' },
    { href: '/#about', label: 'About' },
  ];

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <span className="logo-mark">{SITE_CONFIG.shortName}</span>
            <span className="logo-dot" aria-hidden="true" />
          </Link>

          <nav>
            <ul className={`nav-menu${menuOpen ? ' open' : ''}`} id="navMenu">
              {navLinks.map(({ href, label }) => {
                // '/#about'은 홈 안의 앵커라 활성 상태를 갖지 않는다
                const isActive = href.includes('#')
                  ? false
                  : href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(href);

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`nav-link${isActive ? ' active' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            className="mobile-menu-btn"
            id="mobileMenuBtn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <i className={`fa fa-${menuOpen ? 'times' : 'bars'}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
