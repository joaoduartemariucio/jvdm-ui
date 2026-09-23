import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

import { Badge } from "../src/atoms/badge";
import { Button, buttonClass } from "../src/atoms/button";
import { Card } from "../src/atoms/card";
import { Input } from "../src/atoms/input";
import { Switch } from "../src/atoms/switch";
import { Banner } from "../src/molecules/banner";

function render(element: ReactElement) {
  return renderToStaticMarkup(element);
}

describe("Button", () => {
  test("builds classes from the selected variant and size", () => {
    const classes = buttonClass({ variant: "danger", size: "sm", className: "w-full" });

    expect(classes).toContain("border-danger/50");
    expect(classes).toContain("px-3 py-2");
    expect(classes).toContain("w-full");
  });

  test("renders its default state", () => {
    expect(render(createElement(Button, { children: "Save" }))).toMatchSnapshot();
  });

  test("renders an icon-sized danger button", () => {
    expect(
      render(createElement(Button, { "aria-label": "Delete", size: "icon", variant: "danger" })),
    ).toMatchSnapshot();
  });
});

describe("form and feedback components", () => {
  test("renders an input with the selected control size", () => {
    const markup = render(
      createElement(Input, { name: "email", placeholder: "Email", size: "sm" }),
    );

    expect(markup).toContain('name="email"');
    expect(markup).toContain('placeholder="Email"');
    expect(markup).toContain("px-3 py-2");
    expect(markup).toMatchSnapshot();
  });

  test("renders badge tones and banner content", () => {
    expect(render(createElement(Badge, { tone: "ok", children: "Active" }))).toMatchSnapshot();
    expect(
      render(
        createElement(
          Banner,
          { title: "Saved", tone: "ok" },
          createElement("span", null, "Your changes are live."),
        ),
      ),
    ).toMatchSnapshot();
  });
});

describe("layout and state components", () => {
  test("renders card padding and switch state", () => {
    expect(
      render(createElement(Card, { padding: "lg" }, createElement("p", null, "Content"))),
    ).toMatchSnapshot();
    expect(
      render(
        createElement(Switch, {
          checked: true,
          label: "Notifications",
          onCheckedChange: () => undefined,
        }),
      ),
    ).toMatchSnapshot();
  });
});
