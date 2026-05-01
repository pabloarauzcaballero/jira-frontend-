import "../styles/createProject.css";

import CreateProjectHeader from "../components/CreateProjectHeader";
import ProjectFormCard from "../components/ProjectFormCard";
import { CreateProjectProvider } from "../context/CreateProjectContext";

function CreateProjectContent() {
  return (
    <section className="create-project-page">
      <CreateProjectHeader />
      <ProjectFormCard />
    </section>
  );
}

export default function CreateProjectPage(props) {
  return (
    <CreateProjectProvider {...props}>
      <CreateProjectContent />
    </CreateProjectProvider>
  );
}
