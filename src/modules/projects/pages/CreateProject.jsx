import "../styles/createProject.css";

import CreateProjectHeader from "../components/CreateProjectHeader";
import ProjectFormCard from "../components/ProjectFormCard";
import { CreateProjectProvider } from "../context/CreateProjectContext";
import LoadingState from "../../../shared/components/loading/LoadingState";

function CreateProjectContent() {
  return (
    <section className="create-project-page">
      <CreateProjectHeader />
      <ProjectFormCard />
    </section>
  );
}

export default function CreateProjectPage(props) {
  if (props.isLoading) {
    return <LoadingState title="Preparando formulario" message="Cargando usuarios y datos necesarios para crear el proyecto..." />;
  }

  return (
    <CreateProjectProvider {...props}>
      <CreateProjectContent />
    </CreateProjectProvider>
  );
}
