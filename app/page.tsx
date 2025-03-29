import Image from "next/image";
// import styles from "./page.module.css";
import { css } from "@styled-system/css";
import { center } from "@styled-system/patterns";

export default function Home() {
  return (
    <div className={css({ textStyle: "body" })}>
      <p>It's me!</p>
      <h1 className={css({ textStyle: "display" })}>
        Zach Huxford<span>.</span>
      </h1>
      <p>
        I'm a Software Developer from New Zealand. I care about my work having a
        positive impact on other people, which is why it is important to me that
        my work has a strong human component, whether it is by creating
        something useful or something beautiful.
      </p>
      <p>
        I like to spend my spare time browsing wikipedia, reading, listening to
        podcasts and music, and cooking. I'm particularly interested in full
        stack web development, graphic design and Linux.
      </p>
      <p>
        I care about my work having a positive impact on other people, which is
        why it is important to me that my work has a strong human component,
        whether it is by creating something useful or something beautiful.
      </p>
    </div>
  );
}
