import { useEffect } from 'react';
import styles from './Toast.module.css';

interface Props {
  message: string;
  onDismiss: () => void;
}

export default function Toast({ message, onDismiss }: Props) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, 3200);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className={styles.toast} role="alert" aria-live="assertive">
      <span>{message}</span>
      <button className={styles.close} onClick={onDismiss} aria-label="Dismiss message">✕</button>
    </div>
  );
}
