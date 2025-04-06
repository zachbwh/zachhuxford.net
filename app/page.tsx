"use client";
import { stack } from "@styled-system/patterns";
import { Text } from "@components/Text";
import { Avatar } from "@components/Avatar";
import { Box } from "@styled-system/jsx";
import { Dropdown } from "@components/Dropdown";
import { Button } from "@components/Button";
import { Palette } from "lucide-react";

export default function Home() {
  return (
    <div
      className={stack({
        direction: "column",
        gap: "4",
        paddingInline: "10",
        justifyContent: "center",
        minHeight: "[100dvh]",
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
        <Box display="inline-block" verticalAlign="sub" paddingLeft="10">
          <Avatar
            size="lg"
            src="https://gravatar.com/avatar/4fe732c23f15dea9070cce32e4e3e0c23b333d83abca1bb77fb3792f91927966?s=300"
          />
        </Box>
      </Text>
      <Text textStyle="body" as="p">
        I'm a Software Developer from New Zealand.
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
      <Dropdown
        renderReferenceComponent={({ setReference, referenceProps }) => (
          <Button
            ref={setReference}
            {...referenceProps}
            type="button"
            size="sm"
            variant="primary"
            label="Theme"
            icon={<Palette />}
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
  );
}
