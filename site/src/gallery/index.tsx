import { useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Combobox,
  DatePicker,
  DateTimePicker,
  Divider,
  FileUpload,
  Input,
  IconButton,
  Kbd,
  Label,
  Link,
  PasswordInput,
  ProgressBar,
  NumberInput,
  Radio,
  RangeDatePicker,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Segmented,
  Switch,
  Textarea,
  TimePicker,
  buttonClass,
  MoreIcon,
  type BadgeTone,
  type ButtonVariant,
} from "jvdm-ui/atoms";
import {
  CardTitle,
  Callout,
  CommandMenu,
  ConfirmDialog,
  Drawer,
  DropdownMenu,
  Empty,
  Accordion,
  Breadcrumb,
  Field,
  FilterBar,
  LoadError,
  Menu,
  Gallery as ComponentGallery,
  menuItemClass,
  Modal,
  PageHeader,
  Pagination,
  StatCard,
  SnackbarStack,
  Tabs,
  Toast,
  Tooltip,
  CodeBlock,
} from "jvdm-ui/molecules";
import {
  DataTable,
  DonutChart,
  LineChart,
  Sparkline,
  Timeline,
  type Column,
} from "jvdm-ui/organisms";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "ghost", "danger"];
const TONES: BadgeTone[] = ["neutral", "accent", "ok", "warn", "danger", "info"];

const COLUMNS: Column<(typeof ROWS)[number]>[] = [
  { key: "name", label: "Name", width: "2fr", render: (row) => row.name },
  { key: "role", label: "Role", width: "1fr", render: (row) => row.role },
  {
    key: "usage",
    label: "Usage",
    width: "1fr",
    align: "right",
    render: (row) => row.usage,
  },
];

const ROWS = [
  { id: "1", name: "Ada Lovelace", role: "Owner", usage: "82%" },
  { id: "2", name: "Grace Hopper", role: "Admin", usage: "64%" },
  { id: "3", name: "Alan Turing", role: "Member", usage: "31%" },
];

const TREND = [
  { key: "mon", label: "Mon", value: 12 },
  { key: "tue", label: "Tue", value: 20 },
  { key: "wed", label: "Wed", value: 16 },
  { key: "thu", label: "Thu", value: 28 },
  { key: "fri", label: "Fri", value: 24 },
  { key: "sat", label: "Sat", value: 34 },
];

const LINE_TREND = [
  { key: "jan", label: "Jan", value: 18 },
  { key: "feb", label: "Feb", value: 24 },
  { key: "mar", label: "Mar", value: 21 },
  { key: "apr", label: "Apr", value: 36 },
  { key: "may", label: "May", value: 31 },
  { key: "jun", label: "Jun", value: 42 },
];

export function Gallery() {
  const [notifications, setNotifications] = useState(true);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("overview");
  const [density, setDensity] = useState("comfortable");
  const [toastVisible, setToastVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbars, setSnackbars] = useState<
    { id: string; title: string; message: string; tone: "ok" }[]
  >([]);

  return (
    <section className="flex scroll-mt-20 flex-col gap-8" id="components">
      <div className="flex flex-col gap-2">
        <Label>Components</Label>
        <h2 className="text-2xl font-bold">Four layers, one vocabulary.</h2>
      </div>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Buttons</CardTitle>
          <div className="flex flex-wrap items-center gap-3">
            {VARIANTS.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">small</Button>
            <Button size="md">medium</Button>
            <Button size="lg">large</Button>
            <Button disabled>disabled</Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-5">
          <CardTitle>Overlays and media</CardTitle>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Label>Confirm dialog</Label>
              <p className="text-sm text-ink-muted">
                Destructive actions get a deliberate second step.
              </p>
              <Button className="self-start" onClick={() => setConfirmOpen(true)} variant="danger">
                Delete preset
              </Button>
              <ConfirmDialog
                cancelLabel="Keep preset"
                confirmLabel="Delete preset"
                description="This removes the generated preset from the current workspace."
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => setConfirmOpen(false)}
                open={confirmOpen}
                title="Delete this preset?"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Icon button and gallery</Label>
              <div className="flex items-center gap-2">
                <IconButton label="More actions">
                  <MoreIcon />
                </IconButton>
                <span className="text-sm text-ink-muted">Actions stay compact and named.</span>
              </div>
              <ComponentGallery
                alt="Theme preview"
                fallback={<span className="font-mono text-xs text-ink-dim">4:3 preview</span>}
                photos={[]}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Badges and labels</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            {TONES.map((tone) => (
              <Badge key={tone} tone={tone}>
                {tone}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Label>uppercase label</Label>
            <Avatar name="Ada Lovelace" />
            <ProgressBar className="w-64" value={62} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Form controls</CardTitle>
          <div className="grid gap-4 md:grid-cols-3">
            <Field htmlFor="email" label="Email">
              <Input id="email" placeholder="ada@example.com" />
            </Field>
            <Field htmlFor="password" label="Password">
              <PasswordInput id="password" placeholder="••••••••" />
            </Field>
            <Field htmlFor="role" label="Role">
              <Select id="role">
                <option>Owner</option>
                <option>Admin</option>
                <option>Member</option>
              </Select>
            </Field>
          </div>
          <Field htmlFor="bio" label="Bio">
            <Textarea id="bio" placeholder="A few words about you" />
          </Field>
          <Field error="Enter a valid email address" htmlFor="invalid" label="With an error">
            <Input aria-invalid id="invalid" defaultValue="not-an-email" />
          </Field>
          <div className="grid gap-4 md:grid-cols-3">
            <Field htmlFor="assignee" label="Assignee">
              <Combobox
                id="assignee"
                options={[
                  { label: "Ada Lovelace", value: "ada" },
                  { label: "Grace Hopper", value: "grace" },
                ]}
                placeholder="Search people"
              />
            </Field>
            <Field htmlFor="date" label="Release date">
              <DatePicker id="date" defaultValue="2026-09-23" />
            </Field>
            <Field htmlFor="time" label="Release time">
              <TimePicker id="time" defaultValue="09:30" />
            </Field>
            <div className="flex flex-col gap-2">
              <Label>Attachments</Label>
              <FileUpload accept=".json,.css" multiple>
                Upload theme files
              </FileUpload>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-5">
          <CardTitle>Commands, filters and drawer</CardTitle>
          <FilterBar onClear={() => undefined} resultLabel="12 components">
            <Combobox
              aria-label="Filter by layer"
              options={[
                { label: "Atoms", value: "atoms" },
                { label: "Molecules", value: "molecules" },
              ]}
              placeholder="Filter layer"
            />
            <DatePicker aria-label="Updated after" />
          </FilterBar>
          <div className="grid gap-6 md:grid-cols-2">
            <CommandMenu
              items={[
                { id: "theme", label: "Open theme editor", description: "Edit tokens and presets" },
                { id: "catalog", label: "Browse components", description: "Jump to the catalog" },
                { id: "source", label: "Read source", description: "Open the repository" },
              ]}
            />
            <div className="flex flex-col items-start gap-4">
              <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
              <Drawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="Theme details"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-6 text-ink-muted">
                    This side surface keeps context visible while a consumer inspects the current
                    theme.
                  </p>
                  <Callout title="Build-time output" tone="info">
                    The same JSON can be passed to the CLI.
                  </Callout>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-5">
          <CardTitle>Date ranges, values and menus</CardTitle>
          <RangeDatePicker end="2026-09-30" start="2026-09-23" />
          <DateTimePicker date="2026-09-23" time="09:30" />
          <div className="grid gap-4 md:grid-cols-3">
            <NumberInput aria-label="Seats" defaultValue="12" min="1" />
            <DropdownMenu
              trigger={<span className={buttonClass({ variant: "secondary" })}>More options</span>}
            >
              <button
                className="block w-full rounded-sm px-3 py-2 text-left text-xs text-ink-soft hover:bg-raised"
                type="button"
              >
                Duplicate preset
              </button>
              <button
                className="block w-full rounded-sm px-3 py-2 text-left text-xs text-ink-soft hover:bg-raised"
                type="button"
              >
                Move to archive
              </button>
            </DropdownMenu>
            <Button
              onClick={() =>
                setSnackbars([
                  {
                    id: String(Date.now()),
                    title: "Preset saved",
                    message: "Ready to use in your next build.",
                    tone: "ok",
                  },
                ])
              }
              variant="secondary"
            >
              Show snackbar
            </Button>
          </div>
          <CodeBlock
            code={'defineTheme({ tokens: { radius: { md: "8px" } } })'}
            language="typescript"
          />
          <SnackbarStack
            items={snackbars}
            onDismiss={(id) => setSnackbars((items) => items.filter((item) => item.id !== id))}
          />
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Menu</CardTitle>
          <div className="flex flex-wrap items-center gap-6">
            <Menu
              align="start"
              label="Open the account menu"
              trigger={<Avatar name="Ada Lovelace" />}
            >
              <button className={menuItemClass()} type="button">
                Profile
              </button>
              <button className={menuItemClass()} type="button">
                Settings
              </button>
              <button className={menuItemClass({ tone: "danger" })} type="button">
                Sign out
              </button>
            </Menu>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Controls and navigation</CardTitle>
          <div className="flex flex-wrap items-center gap-4">
            <Checkbox label="Remember this device" defaultChecked />
            <Switch
              checked={notifications}
              label="Notifications"
              onCheckedChange={setNotifications}
            />
          </div>
          <Tabs
            items={[
              { value: "overview", label: "Overview", content: "A compact overview panel." },
              { value: "activity", label: "Activity", content: "Recent activity appears here." },
              {
                value: "disabled",
                label: "Disabled",
                content: "Unavailable content.",
                disabled: true,
              },
            ]}
            onValueChange={setTab}
            value={tab}
          />
          <Pagination page={page} pages={4} onPageChange={setPage} />
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Foundations and feedback</CardTitle>
          <div className="flex flex-wrap items-center gap-4">
            <Segmented
              label="Density"
              name="density"
              onValueChange={setDensity}
              options={[
                { value: "compact", label: "Compact" },
                { value: "comfortable", label: "Comfortable" },
                { value: "spacious", label: "Spacious" },
              ]}
              value={density}
            />
            <Tooltip content="Keyboard shortcuts are available" id="shortcut-tip">
              <Button aria-label="Keyboard shortcuts" variant="ghost">
                <Kbd>?</Kbd>
              </Button>
            </Tooltip>
            <Spinner label="Loading preview" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Label>Preferences</Label>
              <Radio defaultChecked label="System default" name="theme-preference" />
              <Radio label="Always light" name="theme-preference" />
              <Radio label="Always dark" name="theme-preference" />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Volume</Label>
              <Slider defaultValue="72" id="volume" max="100" min="0" />
              <div className="flex items-center justify-between text-xs text-ink-muted">
                <span>Quiet</span>
                <span>72%</span>
                <Link href="#theming">Tune the theme</Link>
              </div>
            </div>
          </div>
          <Divider>or continue with</Divider>
          <Breadcrumb
            items={[
              { id: "catalog", href: "#components", label: "Catalog" },
              { id: "foundations", href: "#components", label: "Foundations" },
              { id: "feedback", label: "Feedback" },
            ]}
          />
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Modal</CardTitle>
            <p className="mt-2 max-w-xl text-sm text-ink-muted">
              A responsive dialog that becomes a bottom sheet on small screens and a centered
              surface on larger ones.
            </p>
          </div>
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        </div>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Export theme"
          size="sm"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-6 text-ink-muted">
              Your current scale is ready to become a portable theme preset.
            </p>
            <div className="rounded-md border border-line bg-field p-3 font-mono text-xs text-ink-soft">
              jvdm-ui theme export --name current
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button onClick={() => setModalOpen(false)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Export preset</Button>
            </div>
          </div>
        </Modal>
      </Card>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Disclosure and line chart</CardTitle>
          <Accordion
            exclusive
            items={[
              {
                id: "tokens",
                title: "Tokens are composable",
                content:
                  "Consumers add their own values through a theme JSON object without rewriting shipped component styles.",
                defaultOpen: true,
              },
              {
                id: "rules",
                title: "Rules are enforced",
                content:
                  "The package uses lint boundaries and scales so the catalog stays coherent as it grows.",
              },
            ]}
          />
          <LineChart
            data={LINE_TREND}
            describe={(point) => `${point.label}: ${point.value} members`}
            ticks={[0, 20, 40]}
            tooltip={(point) => `${point.value} members`}
            top={50}
          />
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="flex flex-col gap-5">
            <CardTitle>Contextual feedback</CardTitle>
            <Callout title="Theme saved" tone="ok">
              Your token scale is ready to export as a build-time preset.
            </Callout>
            <Callout title="One value needs attention" tone="warn">
              Radius `13px` does not belong to the active scale.
            </Callout>
            <Callout title="Connection failed" tone="danger">
              We could not refresh the preview. Try again in a moment.
            </Callout>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-5">
            <CardTitle>Activity timeline</CardTitle>
            <Timeline
              items={[
                { id: "theme", title: "Theme seed updated", meta: "2 min ago", tone: "accent" },
                { id: "build", title: "Preset generated", meta: "18 min ago", tone: "ok" },
                { id: "review", title: "Review requested", meta: "1 hr ago", tone: "neutral" },
              ]}
            />
          </div>
        </Card>
        {toastVisible ? (
          <Toast onDismiss={() => setToastVisible(false)} title="Preview updated" tone="ok">
            All components now inherit the selected density.
          </Toast>
        ) : (
          <Button
            className="justify-self-start"
            onClick={() => setToastVisible(true)}
            variant="secondary"
          >
            Show toast again
          </Button>
        )}
      </div>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Stats and charts</CardTitle>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard hint="last 30 days" label="Revenue" value="$48,120" />
            <StatCard hint="up 12%" label="Active users" value="1,284" />
            <StatCard attention hint="needs attention" label="Failed jobs" value="7" />
          </div>
          <Sparkline data={TREND} describe={(bar) => `${bar.label}: ${bar.value}`} />
          <DonutChart
            data={[
              { id: "atoms", label: "Atoms", value: 18, color: "var(--color-accent)" },
              { id: "molecules", label: "Molecules", value: 14, color: "var(--color-info)" },
              { id: "organisms", label: "Organisms", value: 8, color: "var(--color-ok)" },
            ]}
            label="Components by layer"
            total={40}
          >
            <span className="text-2xl font-bold text-ink">40</span>
            <span className="text-2xs text-ink-dim">components</span>
          </DonutChart>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Data table</CardTitle>
          <DataTable columns={COLUMNS} items={ROWS} rowKey={(row) => row.id} />
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <Empty description="Adjust the filters to see more." title="Nothing here yet" />
        </Card>
        <Card>
          <LoadError message="Could not load this section." onRetry={() => undefined} />
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Page header and skeletons</CardTitle>
          <PageHeader subtitle="3 members" title="Team">
            <Button variant="primary">Invite</Button>
          </PageHeader>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </Card>
    </section>
  );
}
