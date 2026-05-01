export default function DescriptionCard({ description }) {
  return (
    <article className="issue-card-panel">
      <h2 className="issue-card-title">Descripción</h2>

      <div className="issue-description-content">
        {description.paragraphs?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {description.points?.length > 0 && (
          <>
            <p>
              <strong>Acciones:</strong>
            </p>
            <ul>
              {description.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </>
        )}

        {description.acceptanceCriteria?.length > 0 && (
          <>
            <p>
              <strong>Criterios de aceptación:</strong>
            </p>

            <ul>
              {description.acceptanceCriteria.map((criteria, index) => (
                <li key={index}>{criteria}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}
