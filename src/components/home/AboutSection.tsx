import { SITE_CONFIG } from "@/lib/config";

export default function AboutSection() {
  const { author } = SITE_CONFIG;

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">소개</h2>
          <p className="section-subtitle">{author.role}</p>
        </div>

        <div className="about-grid">
          <div>
            <img
              src="/images/profile.png"
              alt={author.name}
              className="about-portrait"
            />
          </div>

          <div className="about-content">
            <h3 className="about-name">{author.name}</h3>
            <p className="about-role">{author.role}</p>
            <p className="about-bio">{author.bio}</p>

            <div className="skills-section">
              <div className="skills-head">
                <span className="label">Tech Stack</span>
              </div>
              {author.skills.map((skill) => (
                <div key={skill.category} className="skill-row">
                  <span
                    className="skill-name"
                    style={{ color: skill.color }}
                  >
                    {skill.category}
                  </span>
                  <span className="skill-items">
                    {skill.items.join(' · ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
