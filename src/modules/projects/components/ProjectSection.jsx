import ProjectCard from "./ProjectCard";

export default function ProjectSection({
  title,
  icon,
  projects = [],
  muted = false,
}) {
  return (
    <section className="project-section">
      <h2 className="project-section-title">
        <span className="material-symbols-outlined">{icon}</span>
        {title}
      </h2>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            muted={muted}
          />
        ))}
      </div>
    </section>
  );
}