import "./suspect-card.scss";

export interface SuspectCardProps {
  name: string;
  occupation: string;
  age: number;
  description: string;
  alibi: string;
  imageUrl?: string;
  className?: string;
}

export function SuspectCard({
  name,
  occupation,
  age,
  description,
  alibi,
  imageUrl,
  className,
}: SuspectCardProps) {
  return (
    <div className={`suspect-card ${className || ""}`}>
      <h3>{name}</h3>
      {imageUrl && <img src={imageUrl} alt={name} />}
      <p>
        <strong>Occupation:</strong> {occupation}
      </p>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Alibi:</strong> {alibi}
      </p>
    </div>
  );
}
