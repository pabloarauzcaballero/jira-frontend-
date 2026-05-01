const MAX_VISIBLE_TICKETS = 5;

function normalizeTickets(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

export default function AssignedTicketsCell({ tickets = [] }) {
  const normalizedTickets = normalizeTickets(tickets);
  const visibleTickets = normalizedTickets.slice(0, MAX_VISIBLE_TICKETS);
  const hiddenTicketsCount = Math.max(
    normalizedTickets.length - MAX_VISIBLE_TICKETS,
    0
  );

  if (normalizedTickets.length === 0) {
    return <span className="text-secondary small">Sin tickets</span>;
  }

  return (
    <div className="d-flex flex-wrap align-items-center gap-1">
      {visibleTickets.map((ticket, index) => {
        const ticketKey = ticket.id ?? ticket.url ?? ticket.nombre ?? index;
        const ticketName = ticket.nombre ?? `TCK-${ticket.id ?? index + 1}`;
        const ticketUrl = ticket.url ?? "#";

        return (
          <a
            key={ticketKey}
            href={ticketUrl}
            target="_blank"
            rel="noreferrer"
            title={ticket.descripcion ?? ticketName}
            className="btn btn-sm btn-outline-primary rounded-pill py-0 px-2 project-members-ticket-btn"
          >
            {ticketName}
          </a>
        );
      })}

      {hiddenTicketsCount > 0 && (
        <span className="badge rounded-pill text-bg-secondary project-members-ticket-more">
          +{hiddenTicketsCount}
        </span>
      )}
    </div>
  );
}
