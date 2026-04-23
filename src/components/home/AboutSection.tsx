import { SITE_CONFIG } from "@/lib/config";

export default function AboutSection() {
  const { author } = SITE_CONFIG;

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Avatar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/images/profile.png"
              alt={author.name}
              style={{
                width: 300,
                height: 300,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Content */}
          <div className="about-content">
            <h2 className="about-name">{author.name}</h2>
            <p className="about-role">{author.role}</p>
            <p className="about-bio">{author.bio}</p>

            <div className="skills-section">
              <h3>Tech Stack</h3>
              <div className="skills-grid">
                {author.skills.map((skill) => (
                  <div key={skill.category} className="skill-category">
                    <div className="skill-category-name">
                      {skill.icon === "▲" ? (
                        <span style={{ color: skill.color }}>▲</span>
                      ) : (
                        <i
                          className={skill.icon}
                          style={{ color: skill.color }}
                        />
                      )}
                      <span style={{ color: skill.color }}>
                        {skill.category}
                      </span>
                    </div>
                    <div className="skill-list">
                      {skill.items.map((item) => (
                        <span key={item} className="skill-item">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
