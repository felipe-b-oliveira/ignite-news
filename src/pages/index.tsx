import styles from "../styles/home.module.scss";

import React from "react";

export default function Home() {
  return (
    <h1 className={styles.title}>
      Hello<span>World</span>
    </h1>
  )
}
