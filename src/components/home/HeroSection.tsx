import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export default function HeroSection() {
  const { author } = SITE_CONFIG;

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left: Text Content */}
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Frontend Developer
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">{author.name}</span>의<br />
              개발 이야기
            </h1>

            <p className="hero-description">
              Next.js, React, TypeScript를 중심으로
              <br />
              SEO와 SSR·CSR, AI 기반 업무 자동화를 함께 고민합니다.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">{author.stats.posts}+</span>
                <span className="stat-label">포스트</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{author.stats.years}</span>
                <span className="stat-label">경력</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{author.stats.mainStack}</span>
                <span className="stat-label">주력 스택</span>
              </div>
            </div>

            <div className="hero-cta">
              <Link href="#posts" className="btn btn-primary">
                <i className="fa fa-book-open" />
                포스트 보기
              </Link>
              <Link href="#about" className="btn btn-secondary">
                <i className="fa fa-user" />
                About Me
              </Link>
            </div>
          </div>

          {/* Right: Profile Card */}
          <div>
            <div className="profile-card">
              <img
                src="/images/profile.png"
                alt={author.name}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  marginBottom: "1rem",
                  objectFit: "cover",
                }}
              />
              <h3 className="profile-name">{author.name}</h3>
              <p className="profile-role">{author.role}</p>
              <div className="tech-tags">
                {author.techStack.map((tech) => {
                  const cls =
                    tech === "React"
                      ? "react"
                      : tech === "TypeScript"
                        ? "typescript"
                        : tech === "Next.js"
                          ? "nextjs"
                          : tech === "Tailwind CSS"
                            ? "cssdesign"
                            : "ai";
                  return (
                    <span key={tech} className={`tech-tag ${cls}`}>
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
