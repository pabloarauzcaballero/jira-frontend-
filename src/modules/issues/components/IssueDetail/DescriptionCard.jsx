export default function DescriptionCard({ description }) {
  return (
    <article className="issue-card-panel">
      <h2 className="issue-card-title">Description</h2>

      <div className="issue-description-content">
        {description.paragraphs?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {description.points?.length > 0 && (
          <ul>
            {description.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}

        {description.acceptanceCriteria?.length > 0 && (
          <>
            <p>
              <strong>Acceptance Criteria:</strong>
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