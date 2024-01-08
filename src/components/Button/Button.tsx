import styles from "./Button.module.css";

export default function Button({
  children,
  onClick = () => {},
  disabled,
}: {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
  disabled?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`${styles.container} ${disabled && styles.disabled}`}
    >
      {children}
    </div>
  );
}
