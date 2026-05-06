import "./evidence-card.scss";

export interface EvidenceCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  className?: string;
}

export function EvidenceCard({
  title,
  description,
  imageUrl,
  className = "",
}: EvidenceCardProps) {
  return (
    <div className={["evidence-card", className].filter(Boolean).join(" ")}>
      <h3 className="evidence-card__title">{title}</h3>
      <p className="evidence-card__description">{description}</p>
      {imageUrl && (
        <img src={imageUrl} alt={title} className="evidence-card__image" />
      )}
    </div>
  );
}
