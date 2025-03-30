"use client";
import Image from "next/image";
// import styles from "./page.module.css";
import { css } from "@styled-system/css";
import { container, stack } from "@styled-system/patterns";
import { Text } from "@components/Text";

export default function Home() {
  return (
    <div
      className={stack({
        direction: "column",
        gap: 4,
        justifyContent: "center",
        minHeight: "100dvh",
      })}
    >
      <Text textStyle="body" as="p">
        It's me!
      </Text>
      <Text textStyle="display">
        Zach Huxford
        <Text textStyle="inherit" color="secondaryAccent">
          .
        </Text>
      </Text>
      <Text textStyle="body" as="p">
        I'm a Software Developer from New Zealand. I care about my work having a
        positive impact on other people, which is why it is important to me that
        my work has a strong human component, whether it is by creating
        something useful or something beautiful.
      </Text>
      <Text textStyle="body" as="p">
        I like to spend my spare time browsing wikipedia, reading, listening to
        podcasts and music, and cooking. I'm particularly interested in full
        stack web development, graphic design and Linux.
      </Text>
      <Text textStyle="body" as="p">
        I care about my work having a positive impact on other people, which is
        why it is important to me that my work has a strong human component,
        whether it is by creating something useful or something beautiful.
      </Text>
      <label htmlFor="theme-select">Choose a theme:</label>
      <select
        name="theme"
        id="theme-select"
        onChange={(e) =>
          document.documentElement.setAttribute("data-theme", e.target.value)
        }
      >
        <option value="purple">Purple</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
