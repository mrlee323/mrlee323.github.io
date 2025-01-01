import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            © 2025–2026 {SITE_CONFIG.author.name}. Built with React & Next.js
          </p>
          <div className="footer-links">
            <Link href="/categories/" className="footer-link">Categories</Link>
            <Link href="/archives/" className="footer-link">Archives</Link>
            <a
              href={`https://github.com/${SITE_CONFIG.author.github}`}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
