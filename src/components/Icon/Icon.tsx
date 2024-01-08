'use client'

import Image from "next/image";
import styles from "./Icon.module.css";

export default function Icon({ icon, url }: { icon: string; url: string }) {
    const openLink = () => {
        window.open(url)
    }
  return (
    <div className={styles.container}>
      <Image
        src={icon}
        alt={url}
        onClick={openLink}
        width={30}
        height={30}
      />
    </div>
  );
}
