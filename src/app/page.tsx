"use client";

import styles from "@/styles/pages/index.module.css";
import data from "@/data.json";

//components
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Button/Button";

import { useState } from "react";
import ContactModal from "@/components/ContactModal/ContactModal";

export default function Home() {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  return (
    <main className={styles.main}>
      <ContactModal
        contactModalOpen={contactModalOpen}
        setContactModalOpen={setContactModalOpen}
      />

      <div
        className={`${styles.container} ${
          contactModalOpen && styles.container_blur
        }`}
      >
        <div className={styles.head}>
          <span className={styles.name}>{data.name}</span>
          <span className={styles.tagline}>{data.tagline}</span>
          <div className={styles.platforms}>
            {data.platforms.map((icon) => (
              <Icon key={icon.icon} {...icon} />
            ))}
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.divider} />
          {data.description}
        </div>
        <div className={styles.contact}>
          <Button
            onClick={() => {
              setContactModalOpen(true);
            }}
          >
            Contact
          </Button>
        </div>
      </div>
    </main>
  );
}
