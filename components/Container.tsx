import React from "react";

export default function Container({
  wrapper: Wrapper = "div",
  className,
  children,
}: {
  wrapper?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Wrapper
      className={`mx-auto w-full max-w-7xl px-6 sm:px-10 ${className || ""}`}
    >
      {children}
    </Wrapper>
  );
}
