'use client';

import { useEffect, useRef } from 'react';

/**
 * Accessible overlay dialog for form success / error (replaces window.alert).
 */
export default function FormFeedbackModal({
  open,
  variant = 'success',
  title,
  message,
  detail,
  onClose,
}) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  const heading =
    title ?? (variant === 'success' ? 'Thank you' : 'Something went wrong');

  return (
    <div
      className="form-feedback-modal-backdrop"
      role="presentation"
      onClick={() => onCloseRef.current()}
    >
      <div
        className="form-feedback-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-feedback-modal-title"
        aria-describedby="form-feedback-modal-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`form-feedback-modal-icon form-feedback-modal-icon--${variant}`} aria-hidden>
          {variant === 'success' ? '✓' : '!'}
        </div>
        <h2 id="form-feedback-modal-title" className="form-feedback-modal-title">
          {heading}
        </h2>
        <p id="form-feedback-modal-desc" className="form-feedback-modal-message">
          {message}
        </p>
        {detail ? <div className="form-feedback-modal-detail">{detail}</div> : null}
        <button type="button" className="form-feedback-modal-ok" onClick={() => onCloseRef.current()}>
          OK
        </button>
      </div>
    </div>
  );
}
