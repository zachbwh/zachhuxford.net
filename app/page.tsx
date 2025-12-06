"use client";
import { stack } from "@styled-system/patterns";
import { Avatar } from "@components/Avatar";
import { Box } from "@styled-system/jsx";
import { Dropdown } from "@components/Dropdown";
import { Button } from "@components/Button";
import { Palette } from "lucide-react";
import { css } from "@styled-system/css";

const GRAVATAR_URL =
  "https://gravatar.com/avatar/4fe732c23f15dea9070cce32e4e3e0c23b333d83abca1bb77fb3792f91927966?s=300";

const Name = () => (
  <span>
    Zach Huxford
    <span className={css({ color: "foreground.secondary-accent" })}>.</span>
  </span>
);

const Home = () => {
  return (
    <section
      className={stack({
        direction: "column",
        gap: "4",
        justifyContent: "center",
        color: "foreground.on-main-accent",
      })}
    >
      <p className={css({ textStyle: "body" })}>It's me!</p>
      <span className={css({ hideBelow: "sm" })}>
        <h1 className={css({ textStyle: "display-lg" })}>
          <Name />
          <Box display="inline-block" verticalAlign="sub" paddingLeft="10">
            <Avatar size="lg" src={GRAVATAR_URL} />
          </Box>
        </h1>
      </span>
      <span className={css({ hideFrom: "sm" })}>
        <h1 className={css({ textStyle: "display-sm" })}>
          <Name />
          <Box display="inline-block" verticalAlign="sub" paddingLeft="5">
            <Avatar size="md" src={GRAVATAR_URL} />
          </Box>
        </h1>
      </span>
      <p className={css({ textStyle: "body" })}>
        I'm a Software Developer from New Zealand.
      </p>
      <p className={css({ textStyle: "body" })}>
        I like to spend my spare time browsing wikipedia, reading, listening to
        podcasts and music, and cooking. I'm particularly interested in full
        stack web development, graphic design and Linux.
      </p>
      <p className={css({ textStyle: "body" })}>
        I care about my work having a positive impact on other people, which is
        why it is important to me that my work has a strong human component,
        whether it is by creating something useful or something beautiful.
      </p>
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
            document.startViewTransition(() => {
              document.documentElement.setAttribute("data-theme", key);
            });
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
