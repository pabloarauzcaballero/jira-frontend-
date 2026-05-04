import ProjectIssueFields from "./ProjectIssueFields";
import SummaryField from "./SummaryField";
import DescriptionEditor from "./DescriptionEditor";
import IssueMetadataFields from "./IssueMetadataFields";
import { useCreateIssueContext } from "../../context/CreateIssueContext";

export default function IssueFormCard() {
  const { formData, projects, users, priorities, statuses, handleChange } = useCreateIssueContext();

  return (
    <article className="create-issue-card">
      <ProjectIssueFields
        idProyecto={formData.id_proyecto}
        idUsuario={formData.id_usuario}
        projects={projects}
        users={users}
        onChange={handleChange}
      />

      <div className="create-issue-divider" />

      <SummaryField value={formData.nombre} onChange={(value) => handleChange("nombre", value)} />

      <DescriptionEditor
        value={formData.descripcion}
        onChange={(value) => handleChange("descripcion", value)}
      />

      <div className="create-issue-divider" />

      <IssueMetadataFields
        status={formData.status}
        prioridad={formData.prioridad}
        acciones={formData.acciones}
        criteriosAceptacion={formData.criterios_aceptacion}
        statuses={statuses}
        priorities={priorities}
        onChange={handleChange}
      />
    </article>
  );
}
