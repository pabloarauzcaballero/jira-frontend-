import ProjectAvatarStack from "./ProjectAvatarStack";
import ProjectStatusBadge from "./ProjectStatusBadge";

export default function ProjectCard({ project, muted = false }) {
  return (
    <article className={`project-card ${muted ? "project-card-muted" : ""}`}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="d-flex align-items-center gap-2">
          <div className={`project-key-box ${project.tone ?? "primary"}`}>
            {project.initials}
          </div>

          <div>
            <h3 className="project-card-title">{project.name}</h3>
            <span className="project-card-key">KEY: {project.key}</span>
          </div>
        </div>

        <ProjectStatusBadge status={project.status} />
      </div>

      <p className="project-card-description">
        {project.description}
      </p>

      <div className="project-card-footer">
        <ProjectAvatarStack members={project.members} />

        <div className="project-updated">
          <span className="material-symbols-outlined">update</span>
          {project.updatedAt}
        </div>
      </div>
    </article>
  );
}