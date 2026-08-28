import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Label,
  PasswordInput,
  ProgressBar,
  Select,
  Skeleton,
  Textarea,
  type BadgeTone,
  type ButtonVariant,
} from "jvdm-ui/atoms";
import {
  CardTitle,
  Empty,
  Field,
  LoadError,
  Menu,
  menuItemClass,
  PageHeader,
  StatCard,
} from "jvdm-ui/molecules";
import { DataTable, Sparkline, type Column } from "jvdm-ui/organisms";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "ghost", "danger"];
const TONES: BadgeTone[] = ["neutral", "accent", "ok", "warn", "danger", "info"];

const COLUMNS: Column[] = [
  { key: "name", label: "Name", width: "2fr" },
  { key: "role", label: "Role", width: "1fr" },
  { key: "usage", label: "Usage", width: "1fr", align: "right" },
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

export function Gallery() {
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
          <CardTitle>Stats and charts</CardTitle>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard hint="last 30 days" label="Revenue" value="$48,120" />
            <StatCard hint="up 12%" label="Active users" value="1,284" />
            <StatCard attention hint="needs attention" label="Failed jobs" value="7" />
          </div>
          <Sparkline data={TREND} describe={(bar) => `${bar.label}: ${bar.value}`} />
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-6">
          <CardTitle>Data table</CardTitle>
          <DataTable
            columns={COLUMNS}
            items={ROWS}
            renderRow={(row, gridClass) => (
              <div className={`${gridClass} h-12 px-4 text-sm`}>
                <span>{row.name}</span>
                <span className="text-ink-muted">{row.role}</span>
                <span className="text-right">{row.usage}</span>
              </div>
            )}
            rowKey={(row) => row.id}
          />
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
