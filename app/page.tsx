"use client";
import { stack } from "@styled-system/patterns";
import { Text } from "@components/Text";
import { Avatar } from "@components/Avatar";
import { Box } from "@styled-system/jsx";
import { Popover } from "@components/Popover";

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
      <Popover
        renderReferenceComponent={({ setReference, referenceProps }) => (
          <button ref={setReference} type="button" {...referenceProps}>
            Button
          </button>
        )}
      >
        Test
      </Popover>
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
