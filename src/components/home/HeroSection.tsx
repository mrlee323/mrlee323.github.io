import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export default function HeroSection({ postCount }: { postCount: number }) {
  const { author } = SITE_CONFIG;

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <p className="hero-eyebrow label">{author.role} · Seoul</p>

            <h1 className="hero-title">
              쓰는 사람보다
              <br />
              <em>판단하는</em> 사람으로
            </h1>

            <p className="hero-lede">
              Next.js와 React로 서비스를 만들고, AI를 붙여 운영합니다.
              구현보다 그 앞의 선택을 기록합니다.
            </p>
          </div>

          <div>
            <img
              src="/images/profile.png"
              alt={author.name}
              className="hero-portrait"
            />
          </div>
        </div>

        <div className="hero-meta">
          <div className="meta-cell">
            <span className="meta-value">{postCount}</span>
            <span className="label">포스트</span>
          </div>
          <div className="meta-cell">
            <span className="meta-value">{author.stats.years}</span>
            <span className="label">경력</span>
          </div>
          <div className="meta-cell">
            <span className="meta-value">{author.stats.mainStack}</span>
            <span className="label">주력 스택</span>
          </div>
          <div className="hero-links">
            <Link href="#posts" className="link-underline">
              포스트
            </Link>
            <Link href="#about" className="link-underline">
              소개
            </Link>
            <a
              href={`https://github.com/${author.github}`}
              className="link-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
