import { ReactNode } from "react";

import styles from "./Modal.module.css";

export default function Modal({
  children,
  isOpen,
  close,
}: {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
}) {
  return (
    <div
      onClick={close}
      className={`${styles.container} ${isOpen && styles.container_open}`}
    >
      <div className={`${styles.wrapper} ${isOpen && styles.fadeIn}`}>
        {children}
      </div>
    </div>
  );
}
