import React from "react";

export default function Container({
  wrapper: Wrapper = "div",
  className,
  fullWidth,
  children,
}: {
  wrapper?: keyof JSX.IntrinsicElements;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Wrapper
      className={`${fullWidth ? "w-full" : "max-w-[85%]"} m-auto ${
        className || ""
      }`}
    >
      {children}
    </Wrapper>
  );
}
