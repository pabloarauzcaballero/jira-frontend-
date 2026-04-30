import NavBar from "./shared/components/navBar";
import HamburguerNav from "./shared/components/hamburguerNav";

/*
import NavBar from "./shared/components/navBar";
import HamburguerNav from "./shared/components/hamburguerNav";
import BoardComponent from "./modules/boards/pages/boardComponent";

const teamProfiles = [
  {
    id: 1,
    profileHeader: "https://i.pravatar.cc/80?img=1",
  },
  {
    id: 2,
    profileHeader: "https://i.pravatar.cc/80?img=3",
  },
  {
    id: 3,
    profileHeader: "https://i.pravatar.cc/80?img=5",
  },
  {
    id: 4,
    profileHeader: "https://i.pravatar.cc/80?img=7",
  },
  {
    id: 5,
    profileHeader: "https://i.pravatar.cc/80?img=9",
  },
];

const toDoIssues = [
  {
    id: 1,
    title: "Implementar login con OAuth2",
    description: "Agregar autenticación para usuarios externos.",
    issueKey: "MIT-23",
    priority: "high",
    assigneeUrl: "https://i.pravatar.cc/80?img=1",
  },
  {
    id: 2,
    title: "Actualizar esquema de base de datos",
    description: "Soportar múltiples roles por usuario.",
    issueKey: "MIT-34",
    priority: "medium",
    assigneeUrl: "https://i.pravatar.cc/80?img=3",
  },
  {
    id: 3,
    title: "Documentar nuevos endpoints",
    description: "Crear documentación técnica del API.",
    issueKey: "MIT-41",
    priority: "low",
    assigneeUrl: "https://i.pravatar.cc/80?img=5",
  },
];

const inProgressIssues = [
  {
    id: 4,
    title: "Refactorizar dashboard principal",
    description: "Separar componentes y mejorar estructura.",
    issueKey: "MIT-12",
    priority: "high",
    assigneeUrl: "https://i.pravatar.cc/80?img=7",
  },
  {
    id: 5,
    title: "Diseñar pantalla de perfil",
    description: "Crear mockups para configuración de usuario.",
    issueKey: "MIT-28",
    priority: "medium",
    assigneeUrl: "https://i.pravatar.cc/80?img=9",
  },
];

const doneIssues = [
  {
    id: 6,
    title: "Corregir fuga de memoria",
    description: "Solucionar problema en worker de notificaciones.",
    issueKey: "MIT-05",
    priority: "high",
    assigneeUrl: "https://i.pravatar.cc/80?img=11",
  },
  {
    id: 7,
    title: "Actualizar dependencias",
    description: "Parchear vulnerabilidades del proyecto.",
    issueKey: "MIT-08",
    priority: "medium",
    assigneeUrl: "https://i.pravatar.cc/80?img=12",
  },
];

export default function App() {
  return (
    <>
      <NavBar />
      <HamburguerNav />

      <main className="app-main">
        <BoardComponent
          teamProfiles={teamProfiles}
          toDoIssues={toDoIssues}
          inProgressIssues={inProgressIssues}
          doneIssues={doneIssues}
        />
      </main>
    </>
  );
}

import ProjectMembersPage from "./modules/projects/pages/ProjectMembersPage";

const project = {
  name: "Project Apollo",
  description:
    "Sistema interno diseñado para centralizar la gestión de miembros, permisos, roles y colaboración dentro del equipo de desarrollo. La plataforma permite organizar a los integrantes del proyecto según sus responsabilidades, controlar los niveles de acceso a las diferentes secciones del sistema, asignar roles específicos como administradores, editores, revisores o visualizadores, y facilitar una comunicación más ordenada entre las áreas técnicas. Además, busca mejorar la trazabilidad de las acciones realizadas por cada miembro, fortalecer la seguridad interna mediante permisos personalizados y optimizar la coordinación del equipo durante el desarrollo, mantenimiento y evolución del proyecto.",
};

const members = [
  {
    id: 1,
    nombre: "Sarah Jenkins",
    rol: "Admin",
    email: "sarah.j@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    nombre: "Michael Chen",
    rol: "Editor",
    email: "m.chen@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 3,
    nombre: "Emily Wong",
    rol: "Viewer",
    email: "emily.w@example.com",
    urlProfile: "",
  },
  {
    id: 4,
    nombre: "David Miller",
    rol: "Editor",
    email: "d.miller@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=7",
  },
  {
    id: 5,
    nombre: "Laura Martínez",
    rol: "Project Manager",
    email: "laura.martinez@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 6,
    nombre: "Andrés López",
    rol: "Backend Developer",
    email: "andres.lopez@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=8",
  },
  {
    id: 7,
    nombre: "Camila Torres",
    rol: "Frontend Developer",
    email: "camila.torres@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=9",
  },
  {
    id: 8,
    nombre: "Daniel Rodríguez",
    rol: "DevOps Engineer",
    email: "daniel.rodriguez@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 9,
    nombre: "Sofía Herrera",
    rol: "QA Tester",
    email: "sofia.herrera@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 10,
    nombre: "James Carter",
    rol: "Security Analyst",
    email: "james.carter@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=14",
  },
  {
    id: 11,
    nombre: "Valeria Gómez",
    rol: "UX/UI Designer",
    email: "valeria.gomez@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=16",
  },
  {
    id: 12,
    nombre: "Robert Kim",
    rol: "Database Administrator",
    email: "robert.kim@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=18",
  },
  {
    id: 13,
    nombre: "Natalia Vargas",
    rol: "Viewer",
    email: "natalia.vargas@example.com",
    urlProfile: "",
  },
  {
    id: 14,
    nombre: "Kevin Brown",
    rol: "Editor",
    email: "kevin.brown@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=22",
  },
  {
    id: 15,
    nombre: "Mariana Castro",
    rol: "Scrum Master",
    email: "mariana.castro@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=24",
  },
];

export default function App() {
  return (
  <>
    <NavBar />
    <HamburguerNav />

    <main className="app-main">
      <ProjectMembersPage
        projectName={project.name}
        projectDescription={project.description}
        members={members}
      />
    </main>
  </>
  );
}


import CreateProjectPage from "./modules/projects/pages/CreateProject";

const initialMembers = [
  {
    id: 1,
    nombre: "Sarah Jenkins",
    email: "sarah.j@company.com",
    rol: "Admin",
    urlProfile: "https://i.pravatar.cc/80?img=47",
  },
  {
    id: 2,
    nombre: "Marcus Rodriguez",
    email: "m.rodriguez@company.com",
    rol: "Editor",
    urlProfile: "",
  },
];

export default function App() {
  function handleCreateProject(payload) {
    console.log("Proyecto creado:", payload);
  }

  function handleCancel() {
    console.log("Creación cancelada");
  }

  return (
    <>
      <NavBar />
      <HamburguerNav />

      <main className="app-main">
        <CreateProjectPage
          initialMembers={initialMembers}
          roles={["Viewer", "Editor", "Admin"]}
          onSubmit={handleCreateProject}
          onCancel={handleCancel}
        />
      </main>
    </>
  );
}

import CreateIssuePage from "./modules/issues/pages/CreateIssue/CreateIssuePage";

const projects = [
  {
    value: "proj-x",
    label: "PROJ-X (E-commerce Platform)",
  },
  {
    value: "proj-y",
    label: "PROJ-Y (Internal Tools)",
  },
];

const issueTypes = [
  {
    value: "task",
    label: "Task",
  },
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "story",
    label: "Story",
  },
  {
    value: "epic",
    label: "Epic",
  },
];

const priorities = [
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "highest",
    label: "Highest",
  },
  {
    value: "low",
    label: "Low",
  },
  {
    value: "lowest",
    label: "Lowest",
  },
];

const statuses = [
  {
    value: "todo",
    label: "To Do",
  },
  {
    value: "in-progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
];


export default function App() {
  function handleCreateIssue(payload) {
    console.log("Issue creado:", payload);
  }

  function handleCancel() {
    console.log("Creación cancelada");
  }

  return (
    <>
      <NavBar />
      <HamburguerNav />

      <main className="app-main">
        <CreateIssuePage
          projects={projects}
          issueTypes={issueTypes}
          priorities={priorities}
          statuses={statuses}
          onSubmit={handleCreateIssue}
          onCancel={handleCancel}
        />
      </main>
    </>
  );
}


import { useState } from "react";
import ProjectMembersPage from "./modules/projects/pages/ProjectMembersPage";

const project = {
  name: "Project Apollo",
  description:
    "Sistema interno diseñado para centralizar la gestión de miembros, permisos, roles y colaboración dentro del equipo de desarrollo. La plataforma permite organizar a los integrantes del proyecto según sus responsabilidades, controlar los niveles de acceso a las diferentes secciones del sistema, asignar roles específicos como administradores, editores, revisores o visualizadores, y facilitar una comunicación más ordenada entre las áreas técnicas. Además, busca mejorar la trazabilidad de las acciones realizadas por cada miembro, fortalecer la seguridad interna mediante permisos personalizados y optimizar la coordinación del equipo durante el desarrollo, mantenimiento y evolución del proyecto.",
};

const ticketPool = [
  { id: 101, nombre: "REQ-101", url: "https://example.com/tickets/101" },
  { id: 102, nombre: "REQ-102", url: "https://example.com/tickets/102" },
  { id: 103, nombre: "BUG-103", url: "https://example.com/tickets/103" },
  { id: 104, nombre: "TASK-104", url: "https://example.com/tickets/104" },
  { id: 105, nombre: "REQ-105", url: "https://example.com/tickets/105" },
  { id: 106, nombre: "BUG-106", url: "https://example.com/tickets/106" },
  { id: 107, nombre: "TASK-107", url: "https://example.com/tickets/107" },
  { id: 108, nombre: "REQ-108", url: "https://example.com/tickets/108" },
];

const initialMembers = [
  {
    id: 1,
    nombre: "Sarah Jenkins",
    rol: "Admin",
    email: "sarah.j@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=1",
    ticketsAsignados: ticketPool.slice(0, 7),
  },
  {
    id: 2,
    nombre: "Michael Chen",
    rol: "Editor",
    email: "m.chen@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=3",
    ticketsAsignados: ticketPool.slice(1, 4),
  },
  {
    id: 3,
    nombre: "Emily Wong",
    rol: "Viewer",
    email: "emily.w@example.com",
    urlProfile: "",
    ticketsAsignados: [],
  },
  {
    id: 4,
    nombre: "David Miller",
    rol: "Editor",
    email: "d.miller@example.com",
    urlProfile: "https://i.pravatar.cc/100?img=7",
    ticketsAsignados: ticketPool.slice(0, 5),
  },
];

export default function App() {
  const [members, setMembers] = useState(initialMembers);

  const handleDesvincular = (memberToRemove) => {
    console.log("Desvincular miembro:", memberToRemove);

    setMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== memberToRemove.id)
    );
  };

  const handleAddRequest = (selectedMember) => {
    console.log("Añadir request a:", selectedMember);

    const newTicketId = Date.now();

    const newTicket = {
      id: newTicketId,
      nombre: `REQ-${String(newTicketId).slice(-4)}`,
      url: `https://example.com/tickets/${newTicketId}`,
    };

    setMembers((currentMembers) =>
      currentMembers.map((member) => {
        if (member.id !== selectedMember.id) return member;

        return {
          ...member,
          ticketsAsignados: [...(member.ticketsAsignados ?? []), newTicket],
        };
      })
    );
  };

  return (
    <main className="app-main">
            <NavBar />
      <HamburguerNav />

      <ProjectMembersPage
        projectName={project.name}
        projectDescription={project.description}
        members={members}
        onDesvincular={handleDesvincular}
        onAddRequest={handleAddRequest}
      />
    </main>
  );
}

import ProjectsPage from "./modules/projects/pages/ProjectPage";

const teamProfiles = [
  {
    id: 1,
    name: "Sarah Jenkins",
    profileHeader: "https://i.pravatar.cc/80?img=1",
  },
  {
    id: 2,
    name: "Michael Chen",
    profileHeader: "https://i.pravatar.cc/80?img=3",
  },
  {
    id: 3,
    name: "Emily Wong",
    profileHeader: "https://i.pravatar.cc/80?img=5",
  },
  {
    id: 4,
    name: "David Miller",
    profileHeader: "https://i.pravatar.cc/80?img=7",
  },
];

const currentProjects = [
  {
    id: 1,
    name: "Core API - AUTH",
    key: "CAUTH",
    initials: "CA",
    status: "Active",
    tone: "primary",
    description:
      "Overhaul of the main authentication service to support OAuth2 and MFA across all enterprise clients.",
    updatedAt: "Updated 2h ago",
    members: [
      {
        id: 1,
        name: "Sarah Jenkins",
        urlProfile: "https://i.pravatar.cc/80?img=1",
      },
      {
        id: 2,
        name: "Michael Chen",
        urlProfile: "https://i.pravatar.cc/80?img=3",
      },
      {
        id: 3,
        name: "Emily Wong",
        initials: "EW",
      },
      {
        id: 4,
        name: "David Miller",
        initials: "DM",
      },
      {
        id: 5,
        name: "Ana Torres",
        initials: "AT",
      },
    ],
  },
  {
    id: 2,
    name: "Frontend Design System",
    key: "FDSYS",
    initials: "FD",
    status: "Active",
    tone: "secondary",
    description:
      "Implementation of the new Enterprise Logic design tokens across React components.",
    updatedAt: "Updated 1d ago",
    members: [
      {
        id: 1,
        name: "Emily Wong",
        urlProfile: "https://i.pravatar.cc/80?img=5",
      },
    ],
  },
];

const recentProjects = [
  {
    id: 3,
    name: "Mobile App V2",
    key: "MAPP",
    initials: "MI",
    status: "On Hold",
    tone: "tertiary",
    description:
      "Rewrite of the iOS client using Swift UI. Pending API finalization.",
    updatedAt: "Updated 2w ago",
    members: [
      {
        id: 1,
        name: "Pending Member",
        initials: "PM",
      },
    ],
  },
  {
    id: 4,
    name: "Database Migration",
    key: "DBMIG",
    initials: "DB",
    status: "Active",
    tone: "primary",
    description:
      "Migrating legacy data to new Postgres cluster in US-East-1.",
    updatedAt: "Updated 3d ago",
    members: [
      {
        id: 1,
        name: "Database Admin",
        urlProfile: "https://i.pravatar.cc/80?img=11",
      },
    ],
  },
];

export default function App() {
  return (
    <>
      <NavBar />
      <HamburguerNav />

      <main className="app-main">
        <ProjectsPage
          currentProjects={currentProjects}
          recentProjects={recentProjects}
          teamProfiles={teamProfiles}
        />
      </main>
    </>
  );
}
*/
 
import IssueDetailPage from "./modules/issues/pages/IssueDetail/IssueDetailPage";

const currentUser = {
  name: "Current User",
  avatarUrl: "https://i.pravatar.cc/80?img=12",
};

const issue = {
  key: "AUTH-482",
  workspace: "Global Systems",
  projectName: "Authentication Core (AUTH)",
  projectShortName: "Auth Core",
  title: "Implement new OAuth2 login flow",
  type: "Feature",
  status: "In Progress",
  priority: "High",
  createdAt: "Created Oct 24, 2023",
  createdDate: "Oct 24, 2023",
  updatedAt: "2 hours ago",
  assignee: {
    name: "Sarah Jenkins",
    role: "Senior Backend Eng",
    avatarUrl: "https://i.pravatar.cc/80?img=47",
  },
  reporter: {
    name: "David Chen",
    avatarUrl: "https://i.pravatar.cc/80?img=11",
  },
  description: {
    paragraphs: [
      "We need to upgrade our current authentication module to support the new OAuth2.0 flow standardized across the organization's microservices. This replaces the legacy token system.",
    ],
    points: [
      "Implement Authorization Code Grant type.",
      "Integrate with the new Central Auth Gateway (CAG).",
      "Ensure seamless fallback for existing active sessions during the migration window.",
    ],
    acceptanceCriteria: [
      "User can initiate login and is redirected to CAG.",
      "Upon successful authentication, system securely exchanges code for tokens.",
      "Unit tests updated to achieve >90% coverage on new auth services.",
    ],
  },
};

const activities = [
  {
    id: 1,
    user: {
      name: "Sarah Jenkins",
      avatarUrl: "https://i.pravatar.cc/80?img=47",
    },
    action: "added a comment",
    date: "45 minutes ago",
    comment:
      "I've completed the initial integration with the Central Auth Gateway. Starting on the session fallback logic now.",
  },
  {
    id: 2,
    user: {
      name: "David Chen",
      avatarUrl: "https://i.pravatar.cc/80?img=11",
    },
    action: "changed the status",
    date: "2 hours ago",
    status: "In Progress",
  },
];

export default function App() {
  function handleEdit() {
    console.log("Editar ticket");
  }

  function handleDelete() {
    console.log("Eliminar ticket");
  }

  function handleChangeStatus() {
    console.log("Cambiar estado");
  }

  function handlePostComment(comment) {
    console.log("Nuevo comentario:", comment);
  }

  return (
    <>
      <NavBar />
      <HamburguerNav />

      <main className="app-main">
        <IssueDetailPage
          issue={issue}
          currentUser={currentUser}
          activities={activities}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChangeStatus={handleChangeStatus}
          onPostComment={handlePostComment}
        />
      </main>
    </>
  );
}

/*
import UserProfilePage from "./modules/profile/pages/UserProfilePage";

const user = {
  name: "Sarah Jenkins",
  position: "Senior Backend Engineer",
  avatarUrl: "https://i.pravatar.cc/160?img=47",
  tags: ["Engineering", "San Francisco"],
};

const security = {
  twoFactorEnabled: true,
  twoFactorLabel: "Enabled via SMS",
  actions: ["Change Password", "Manage Active Sessions"],
};

const accountDetails = {
  email: "sarah.jenkins@acmecorp.com",
  phone: "+1 (555) 019-2834",
  timezone: "Pacific Time (US & Canada)",
  manager: {
    name: "Michael Ross",
    initials: "MR",
  },
};

const activities = [
  {
    id: 1,
    icon: "chat_bubble",
    tone: "primary",
    userName: "Sarah Jenkins",
    action: "commented on",
    issue: "ALP-492: Optimize Database Queries",
    comment:
      "I've added the index on the user_id column, performance should be much better now.",
    date: "2 hours ago",
  },
  {
    id: 2,
    icon: "change_history",
    tone: "secondary",
    userName: "Sarah Jenkins",
    action: "changed status of",
    issue: "ALP-480: API Rate Limiting",
    statusChange: {
      from: "IN PROGRESS",
      to: "IN REVIEW",
    },
    date: "Yesterday",
  },
  {
    id: 3,
    icon: "add_task",
    tone: "tertiary",
    userName: "Sarah Jenkins",
    action: "created issue",
    issue: "ALP-501: Update Auth Middleware",
    date: "Oct 24, 2023",
  },
];

export default function App() {
  return (
    <>
      <NavBar />
      <HamburguerNav />

      <main className="app-main">
        <UserProfilePage
          user={user}
          security={security}
          accountDetails={accountDetails}
          activities={activities}
        />
      </main>
    </>
  );
}

*/