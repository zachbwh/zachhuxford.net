import Image from "next/image";
// import styles from "./page.module.css";
import { css } from "@styled-system/css";
import { container, center } from "@styled-system/patterns";
import { Text } from "@components/Text";

export default function Home() {
  return (
    <div className={container({})}>
      <Text textStyle="body" as="p">
        It's me!
      </Text>
      <Text textStyle="display">
        Zach Huxford<Text>.</Text>
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
    </div>
  );
}
