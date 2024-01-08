import { useState } from "react";

import Image from "next/image";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

import styles from "./ContactModal.module.css";
import loadingStyles from "./LoadingStyle.module.css";

export default function ContactModal({
  contactModalOpen,
  setContactModalOpen,
}: {
  contactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;
}) {

  const [loading, setLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<
    { message: string; status: "error" | "success" } | undefined
  >(undefined);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleContact = async (e: MouseEvent) => {

    e.stopPropagation();

    if (name == "" || email == "" || body == "") {
      setStatus({ status: "error", message: "Fill in required fields" });
      return;
    }

    const emailregex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const validEmail = emailregex.test(email);
    if(!validEmail) {
      setStatus({ status: "error", message: "Invalid Email" });
      return;
    }

    setLoading(true);
    setStatus(undefined);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        body: body,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setStatus({ message: "Sent", status: "success" });
    } else {
      setStatus({ message: "Error", status: "error" });
    }

    setName("");
    setEmail("");
    setBody("");
    setLoading(false);
  };

  return (
    <Modal
      isOpen={contactModalOpen}
      close={() => {
        setContactModalOpen(false);
        setStatus(undefined);
        setLoading(false);
      }}
    >
      {loading && <div className={loadingStyles.loading} />}
      <div className={styles.form}>
        <input
          onClick={(e) => e.stopPropagation()}
          type="text"
          className={styles.input}
          placeholder={"name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <input
          onClick={(e) => e.stopPropagation()}
          type="email"
          className={styles.input}
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <textarea
          onClick={(e) => e.stopPropagation()}
          className={`${styles.input} ${styles.textarea}`}
          placeholder={"your inquiry..."}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={loading}
        />
        <div className={styles.actions}>
          <Button disabled={loading} onClick={(e) => handleContact(e)}>
            Send
          </Button>
          {status && (
            <div
              className={`${styles.status} ${
                status.status == "error" ? styles.error : styles.success
              }`}
            >
              {status.message}
              <Image
                src={`/icons/${
                  status.status == "error" ? "xmark" : "check"
                }.svg`}
                alt={status.status}
                width={10}
                height={10}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
