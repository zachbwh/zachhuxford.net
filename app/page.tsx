"use client";
import { stack } from "@styled-system/patterns";
import { Text } from "@components/Text";
import { Avatar } from "@components/Avatar";
import { Box } from "@styled-system/jsx";
import { Dropdown } from "@components/Dropdown";
import { Button } from "@components/Button";
import { Palette } from "lucide-react";
import { css } from "@styled-system/css";

const GRAVATAR_URL =
  "https://gravatar.com/avatar/4fe732c23f15dea9070cce32e4e3e0c23b333d83abca1bb77fb3792f91927966?s=300";

const Name = () => (
  <Text textStyle="inherit" color="onMainAccent">
    Zach Huxford
    <Text textStyle="inherit" color="secondaryAccent">
      .
    </Text>
  </Text>
);

const Home = () => {
  return (
    <section
      className={stack({
        direction: "column",
        gap: "4",
        paddingInline: "5",
        paddingBlock: "20",
        paddingBlockStart: "7",
        sm: {
          paddingInline: "10",
          paddingBlockStart: "20",
        },
        justifyContent: "center",
      })}
    >
      <Text textStyle="body" as="p" color="onMainAccent">
        It's me!
      </Text>
      <span className={css({ hideBelow: "sm" })}>
        <Text textStyle="displayLg" as="h1" color="onMainAccent">
          <Name />
          <Box display="inline-block" verticalAlign="sub" paddingLeft="10">
            <Avatar size="lg" src={GRAVATAR_URL} />
          </Box>
        </Text>
      </span>
      <span className={css({ hideFrom: "sm" })}>
        <Text textStyle="displaySm" as="h1" color="onMainAccent">
          <Name />
          <Box display="inline-block" verticalAlign="sub" paddingLeft="5">
            <Avatar size="md" src={GRAVATAR_URL} />
          </Box>
        </Text>
      </span>
      <Text textStyle="body" as="p" color="onMainAccent">
        I'm a Software Developer from New Zealand.
      </Text>
      <Text textStyle="body" as="p" color="onMainAccent">
        I like to spend my spare time browsing wikipedia, reading, listening to
        podcasts and music, and cooking. I'm particularly interested in full
        stack web development, graphic design and Linux.
      </Text>
      <Text textStyle="body" as="p" color="onMainAccent">
        I care about my work having a positive impact on other people, which is
        why it is important to me that my work has a strong human component,
        whether it is by creating something useful or something beautiful.
      </Text>
      <div
        className={css({
          position: "absolute",
          insetBlockEnd: "4",
          insetInlineEnd: "4",
        })}
      >
        <Dropdown
          renderReferenceComponent={({ setReference, referenceProps }) => (
            <Button
              ref={setReference}
              {...referenceProps}
              type="button"
              size="sm"
              variant="secondary"
              label="Theme"
              hideLabel
              width="min"
              icon={<Palette strokeWidth={1.5} />}
            />
          )}
          onItemAction={(key) => {
            document.documentElement.setAttribute("data-theme", key);
          }}
        >
          {[
            { label: "Purple", value: "purple", id: "purple" },
            { label: "Dark", value: "dark", id: "dark" },
          ]}
        </Dropdown>
      </div>
    </section>
  );
};

export default Home;
