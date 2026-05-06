import { useEffect, useEffectEvent, useState, type ReactNode } from "react";

import "./folder.scss";

export interface FolderProps {
  title: string;
  content: ReactNode;
  info?: ReactNode;
  tabLabel?: string;
  className?: string;
}

export function Folder({
  title,
  content,
  info,
  tabLabel = "Case File",
  className = "",
}: FolderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalTitleId = `folder-title-${title.toLowerCase().replace(/\s+/g, "-")}`;

  const closeModal = useEffectEvent(() => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  return (
    <>
      <button
        type="button"
        className={["folder", className].filter(Boolean).join(" ")}
        onClick={() => setIsOpen(true)}
      >
        <span className="folder__tab">{tabLabel}</span>
        <span className="folder__body">
          <span className="folder__eyebrow">Open dossier</span>
          <span className="folder__title">{title}</span>
        </span>
      </button>

      {isOpen ? (
        <div
          className="folder-modal"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="folder-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="folder-modal__header">
              <div>
                <p className="folder-modal__kicker">Case material</p>
                <h2 id={modalTitleId} className="folder-modal__title">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                className="folder-modal__close"
                onClick={() => setIsOpen(false)}
                aria-label={`Close ${title}`}
              >
                Close
              </button>
            </div>

            {info ? <div className="folder-modal__info">{info}</div> : null}

            <div className="folder-modal__content">{content}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
