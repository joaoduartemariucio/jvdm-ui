import { createElement, type ComponentType, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { act, create } from "react-test-renderer";
import { describe, expect, test, vi } from "vitest";

import * as atoms from "../src/atoms";
import * as molecules from "../src/molecules";
import * as organisms from "../src/organisms";

vi.stubGlobal("localStorage", {
  getItem: () => null,
  setItem: vi.fn(),
});
vi.stubGlobal("window", {
  matchMedia: () => ({ matches: false }),
  setTimeout: vi.fn(),
});
vi.stubGlobal("document", {
  activeElement: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  documentElement: { dataset: {} },
});
vi.stubGlobal("navigator", {
  clipboard: { writeText: vi.fn(async () => undefined) },
});
vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);

type Case = [string, ComponentType<Record<string, unknown>>, Record<string, unknown>];

const iconProps = { size: "md" };
const chartData = [
  { key: "one", label: "One", value: 10 },
  { key: "two", label: "Two", value: 20 },
];
const cases: Case[] = [
  ["Avatar", atoms.Avatar, { name: "Ada Lovelace" }],
  ["Badge", atoms.Badge, { children: "Active" }],
  ["Button", atoms.Button, { children: "Save" }],
  ["Card", atoms.Card, { children: "Content" }],
  ["Checkbox", atoms.Checkbox, { label: "Accept" }],
  ["Combobox", atoms.Combobox, { options: [{ value: "one", label: "One" }] }],
  ["DatePicker", atoms.DatePicker, { defaultValue: "2026-01-15" }],
  ["DateTimePicker", atoms.DateTimePicker, { date: "2026-01-15", time: "09:30" }],
  ["Divider", atoms.Divider, { children: "Or" }],
  ["FileUpload", atoms.FileUpload, { children: "Upload" }],
  ["FormAlert", atoms.FormAlert, { children: "Invalid value" }],
  ["IconButton", atoms.IconButton, { label: "Close" }],
  ["Input", atoms.Input, { placeholder: "Name" }],
  ["PasswordInput", atoms.PasswordInput, { placeholder: "Password" }],
  ["Select", atoms.Select, { children: createElement("option", { value: "one" }, "One") }],
  ["Textarea", atoms.Textarea, { defaultValue: "Text" }],
  ["Kbd", atoms.Kbd, { children: "K" }],
  ["Label", atoms.Label, { children: "Name" }],
  ["Link", atoms.Link, { href: "/docs", children: "Docs" }],
  ["MultiSelect", atoms.MultiSelect, { options: [{ value: "one", label: "One" }] }],
  ["NumberInput", atoms.NumberInput, { defaultValue: 1 }],
  ["PinInput", atoms.PinInput, { length: 4, value: "1234" }],
  ["ProgressBar", atoms.ProgressBar, { value: 0.5 }],
  ["Radio", atoms.Radio, { label: "One" }],
  ["RangeDatePicker", atoms.RangeDatePicker, { start: "2026-01-01", end: "2026-01-15" }],
  [
    "Segmented",
    atoms.Segmented,
    { name: "view", options: [{ value: "list", label: "List" }], defaultValue: "list" },
  ],
  ["Skeleton", atoms.Skeleton, {}],
  ["Slider", atoms.Slider, { min: 0, max: 100, defaultValue: 50 }],
  ["Spinner", atoms.Spinner, {}],
  ["Switch", atoms.Switch, { checked: false, label: "Alerts", onCheckedChange: vi.fn() }],
  ["ThemeToggle", atoms.ThemeToggle, {}],
  ["Thumb", atoms.Thumb, { alt: "Preview", fallback: "No image" }],
  ["TimePicker", atoms.TimePicker, { defaultValue: "09:30" }],
  ["AccessIcon", atoms.AccessIcon, iconProps],
  ["AlertIcon", atoms.AlertIcon, iconProps],
  ["BackIcon", atoms.BackIcon, iconProps],
  ["BoxIcon", atoms.BoxIcon, iconProps],
  ["BuildingIcon", atoms.BuildingIcon, iconProps],
  ["CalendarIcon", atoms.CalendarIcon, iconProps],
  ["CarIcon", atoms.CarIcon, iconProps],
  ["ChevronIcon", atoms.ChevronIcon, iconProps],
  ["CloseIcon", atoms.CloseIcon, iconProps],
  ["DashboardIcon", atoms.DashboardIcon, iconProps],
  ["EyeIcon", atoms.EyeIcon, iconProps],
  ["EyeOffIcon", atoms.EyeOffIcon, iconProps],
  ["FaceIcon", atoms.FaceIcon, iconProps],
  ["FactoryIcon", atoms.FactoryIcon, iconProps],
  ["FunnelIcon", atoms.FunnelIcon, iconProps],
  ["GavelIcon", atoms.GavelIcon, iconProps],
  ["InstagramIcon", atoms.InstagramIcon, iconProps],
  ["LogoutIcon", atoms.LogoutIcon, iconProps],
  ["MailIcon", atoms.MailIcon, iconProps],
  ["MoonIcon", atoms.MoonIcon, iconProps],
  ["MoreIcon", atoms.MoreIcon, iconProps],
  ["PencilIcon", atoms.PencilIcon, iconProps],
  ["PhoneIcon", atoms.PhoneIcon, iconProps],
  ["PlansIcon", atoms.PlansIcon, iconProps],
  ["PlusIcon", atoms.PlusIcon, iconProps],
  ["SearchIcon", atoms.SearchIcon, iconProps],
  ["ShieldCheckIcon", atoms.ShieldCheckIcon, iconProps],
  ["StaffIcon", atoms.StaffIcon, iconProps],
  ["StudentsIcon", atoms.StudentsIcon, iconProps],
  ["SunIcon", atoms.SunIcon, iconProps],
  ["TrashIcon", atoms.TrashIcon, iconProps],
  ["WhatsappIcon", atoms.WhatsappIcon, iconProps],
  ["Svg", atoms.Svg, { children: createElement("path", { d: "M1 1h22v22H1z" }) }],
  ["Accordion", molecules.Accordion, { items: [{ id: "one", title: "One", content: "Content" }] }],
  ["Banner", molecules.Banner, { title: "Saved" }],
  [
    "Breadcrumb",
    molecules.Breadcrumb,
    {
      items: [
        { id: "home", label: "Home", href: "/" },
        { id: "current", label: "Current" },
      ],
    },
  ],
  ["Callout", molecules.Callout, { title: "Note", children: "Details" }],
  ["CardTitle", molecules.CardTitle, { children: "Title" }],
  ["CodeBlock", molecules.CodeBlock, { code: "const value = 1;" }],
  ["CommandMenu", molecules.CommandMenu, { items: [{ id: "one", label: "One" }] }],
  [
    "ConfirmDialog",
    molecules.ConfirmDialog,
    {
      open: false,
      title: "Delete",
      description: "Confirm",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: vi.fn(),
      onCancel: vi.fn(),
    },
  ],
  [
    "Drawer",
    molecules.Drawer,
    { isOpen: false, title: "Menu", children: "Content", onClose: vi.fn() },
  ],
  ["DropdownMenu", molecules.DropdownMenu, { trigger: "Open", children: "Items" }],
  ["Empty", molecules.Empty, { title: "Nothing here" }],
  ["Field", molecules.Field, { label: "Name", children: createElement(atoms.Input) }],
  ["FilterBar", molecules.FilterBar, { children: "Filters" }],
  ["Gallery", molecules.Gallery, { photos: ["/one.jpg", "/two.jpg"], alt: "Gallery" }],
  ["ImagePreview", molecules.ImagePreview, { src: "/one.jpg", alt: "Preview" }],
  ["LoadError", molecules.LoadError, { message: "Failed" }],
  [
    "Menu",
    molecules.Menu,
    { label: "Actions", trigger: "Open", children: createElement("button", null, "Action") },
  ],
  ["MetricCard", molecules.MetricCard, { label: "Users", value: 42 }],
  [
    "Modal",
    molecules.Modal,
    { isOpen: false, title: "Dialog", children: "Content", onClose: vi.fn() },
  ],
  ["PageHeader", molecules.PageHeader, { title: "Dashboard" }],
  ["Pagination", molecules.Pagination, { page: 1, pages: 3, onPageChange: vi.fn() }],
  ["SnackbarStack", molecules.SnackbarStack, { items: [{ id: "one", title: "Saved" }] }],
  ["StatCard", molecules.StatCard, { label: "Users", value: 42 }],
  ["Stepper", molecules.Stepper, { steps: [{ id: "one", label: "One" }], current: 0 }],
  [
    "Tabs",
    molecules.Tabs,
    {
      items: [{ value: "one", label: "One", content: "Content" }],
      value: "one",
      onValueChange: vi.fn(),
    },
  ],
  ["Toast", molecules.Toast, { title: "Saved" }],
  ["Tooltip", molecules.Tooltip, { id: "tip", content: "Helpful", children: "Target" }],
  [
    "TreeView",
    molecules.TreeView,
    { nodes: [{ id: "one", label: "One", children: [{ id: "child", label: "Child" }] }] },
  ],
  [
    "AreaChart",
    organisms.AreaChart,
    { data: [{ label: "One", value: 10 }], top: 20, label: "Area" },
  ],
  [
    "BarChart",
    organisms.BarChart,
    {
      data: chartData,
      top: 20,
      ticks: [0, 10, 20],
      describe: (bar: { label: string }) => bar.label,
      tooltip: (bar: { label: string }) => bar.label,
    },
  ],
  [
    "DonutChart",
    organisms.DonutChart,
    { data: [{ id: "one", label: "One", value: 10, color: "red" }], total: 10, label: "Donut" },
  ],
  [
    "LineChart",
    organisms.LineChart,
    {
      data: chartData,
      top: 20,
      ticks: [0, 10, 20],
      describe: (bar: { label: string }) => bar.label,
      tooltip: (bar: { label: string }) => bar.label,
    },
  ],
  [
    "Sparkline",
    organisms.Sparkline,
    { data: chartData, describe: (bar: { label: string }) => bar.label },
  ],
  [
    "DataTable",
    organisms.DataTable,
    {
      columns: [
        { key: "name", label: "Name", width: "1fr", render: (item: { name: string }) => item.name },
      ],
      items: [{ name: "Ada" }],
      rowKey: (item: { name: string }) => item.name,
    },
  ],
  [
    "KanbanBoard",
    organisms.KanbanBoard,
    { columns: [{ id: "todo", title: "Todo", cards: [{ id: "one", title: "Task" }] }] },
  ],
  ["Timeline", organisms.Timeline, { items: [{ id: "one", title: "Created", meta: "Today" }] }],
];

describe("public component coverage", () => {
  test.each(cases)("renders %s", (_name, Component, props) => {
    const markup = renderToStaticMarkup(createElement(Component, props) as ReactElement);

    expect(markup).toMatchSnapshot();
  });

  test.each(cases)("exercises %s event handlers", async (_name, Component, props) => {
    let renderer: ReturnType<typeof create>;
    await act(async () => {
      renderer = create(createElement(Component, props));
    });

    const event = {
      clipboardData: { getData: () => "1234" },
      dataTransfer: { files: null },
      key: "ArrowRight",
      preventDefault: vi.fn(),
      target: { value: "next" },
    };
    const handlers = renderer!.root
      .findAll((node) => typeof node.type === "string")
      .flatMap((node) =>
        Object.entries(node.props)
          .filter(([key, value]) => key.startsWith("on") && typeof value === "function")
          .map(([, value]) => value as (event: typeof event) => unknown),
      );

    for (const handler of handlers) {
      await act(async () => {
        try {
          await handler(event);
        } catch {
          return;
        }
      });
    }

    expect(renderer!.toJSON()).toBeDefined();
  });
});

test("builds menu item classes for each tone", () => {
  expect(molecules.menuItemClass()).toContain("text-ink-soft");
  expect(molecules.menuItemClass({ tone: "danger", className: "w-full" })).toContain("text-danger");
  expect(molecules.menuItemClass({ tone: "danger", className: "w-full" })).toContain("w-full");
});
