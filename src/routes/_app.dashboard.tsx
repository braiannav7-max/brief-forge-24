import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  projects,
  feedPosts,
  teamOnline,
  tasks,
  meetings,
  type FeedPost,
  type FeedPostType,
} from "@/lib/mock-data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useAuth, displayName, initials } from "@/lib/auth/AuthContext";
import {
  Plus,
  Image as ImageIcon,
  Smile,
  ThumbsUp,
  MessageCircle,
  Share2,
  Calendar,
  MoreHorizontal,
  FileText,
  Upload,
  MessageSquare,
  DollarSign,
  Lightbulb,
  Flag,
  FolderKanban,
  TrendingUp,
  Files,
  Sparkles,
  HardDrive,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

const typeMeta: Record<FeedPostType, { bg: string; color: string; Icon: LucideIcon }> = {
  briefing: { bg: "bg-orange-500/10", color: "text-orange-400", Icon: FileText },
  file: { bg: "bg-indigo-500/10", color: "text-indigo-400", Icon: Upload },
  comment: { bg: "bg-violet-500/10", color: "text-violet-400", Icon: MessageSquare },
  budget: { bg: "bg-emerald-500/10", color: "text-emerald-400", Icon: DollarSign },
  idea: { bg: "bg-amber-500/10", color: "text-amber-400", Icon: Lightbulb },
  milestone: { bg: "bg-primary/10", color: "text-primary", Icon: Flag },
};

const kpiStrip = [
  { value: "6", label: "Proyectos", Icon: FolderKanban, color: "text-indigo-400" },
  { value: "67%", label: "Progreso", Icon: TrendingUp, color: "text-violet-400" },
  { value: "48", label: "Ideas", Icon: Lightbulb, color: "text-emerald-400" },
  { value: "128", label: "Archivos", Icon: Files, color: "text-amber-400" },
];

function Avatar({
  initials,
  size = "h-10 w-10",
  text = "text-[12px]",
  gradient = "from-primary/80 to-lavender",
}: {
  initials: string;
  size?: string;
  text?: string;
  gradient?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white select-none shrink-0",
        gradient,
        size,
        text,
      )}
    >
      {initials}
    </div>
  );
}

// ---------------- Centro: composer + stories + feed ----------------
function Composer() {
  const { t } = useLang();
  const { user } = useAuth();
  const f = t.feed;
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <Avatar
          initials={user ? initials(user) : "??"}
          size="h-10 w-10"
          text="text-[13px]"
          gradient="from-amber-400 to-orange-500"
        />
        <button className="flex-1 text-left rounded-full bg-muted hover:bg-muted/70 transition-colors px-4 py-2.5 text-[13px] text-muted-foreground">
          {f.composerPlaceholder}
        </button>
      </div>
      <div className="mt-3 pt-3 border-t border-border grid grid-cols-3">
        <ComposerBtn Icon={ImageIcon} label={f.photo} color="text-emerald-400" />
        <ComposerBtn Icon={Flag} label={f.milestone} color="text-primary" />
        <ComposerBtn Icon={Smile} label={f.update} color="text-amber-400" />
      </div>
    </div>
  );
}

function ComposerBtn({ Icon, label, color }: { Icon: LucideIcon; label: string; color: string }) {
  return (
    <button className="inline-flex items-center justify-center gap-2 rounded-lg py-2 text-[12.5px] font-semibold text-muted-foreground hover:bg-muted transition-colors">
      <Icon className={cn("h-[18px] w-[18px]", color)} />
      <span className="hidden sm:block">{label}</span>
    </button>
  );
}

function Stories() {
  const { t } = useLang();
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-soft">
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        <Link
          to="/proyectos"
          className="relative h-[150px] w-[96px] shrink-0 rounded-xl overflow-hidden border border-dashed border-border bg-surface-elevated flex flex-col items-center justify-end pb-3 hover:border-primary/50 transition-colors group"
        >
          <div className="absolute top-5 left-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <p className="text-[10.5px] font-semibold text-center px-1.5 leading-tight">
            {t.dashboard.newProject}
          </p>
        </Link>

        {projects.map((p) => (
          <Link
            key={p.id}
            to="/proyectos/$id"
            params={{ id: p.id }}
            className="relative h-[150px] w-[96px] shrink-0 rounded-xl overflow-hidden group"
          >
            {p.coverImage && (
              <img
                src={p.coverImage}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div
              className={cn(
                "absolute top-2 left-2 h-8 w-8 rounded-full flex items-center justify-center text-[9px] font-bold ring-[3px] ring-primary",
                p.logoClass,
              )}
            >
              {p.initials}
            </div>
            <p className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-semibold leading-tight line-clamp-2">
              {p.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function KpiStrip() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {kpiStrip.map((k) => (
        <div
          key={k.label}
          className="rounded-2xl border border-border bg-card p-3.5 shadow-soft flex items-center gap-3"
        >
          <div
            className={cn("h-9 w-9 rounded-xl bg-muted flex items-center justify-center", k.color)}
          >
            <k.Icon className="h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0">
            <p className="text-[19px] font-bold leading-none tracking-tight">{k.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{k.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActionBtn({
  Icon,
  label,
  active,
  onClick,
}: {
  Icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 inline-flex items-center justify-center gap-2 rounded-lg py-2 text-[12.5px] font-semibold transition-colors hover:bg-muted",
        active ? "text-primary" : "text-muted-foreground",
      )}
    >
      <Icon className={cn("h-[17px] w-[17px]", active && "fill-primary")} />
      {label}
    </button>
  );
}

function Post({ post }: { post: FeedPost }) {
  const { t } = useLang();
  const f = t.feed;
  const meta = typeMeta[post.type];
  const Icon = meta.Icon;
  const [liked, setLiked] = useState(false);
  const likeCount = post.likes + (liked ? 1 : 0);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-start gap-3 p-4 pb-3">
        <Avatar initials={post.authorInitials} size="h-10 w-10" text="text-[12px]" />
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] leading-tight">
            <span className="font-semibold">{post.author}</span>
            <span className="text-muted-foreground"> {f.verbs[post.type]} </span>
            <span className="font-semibold">{post.project}</span>
          </p>
          <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
            <span>{post.time}</span>
            <span>·</span>
            <span>{post.authorRole}</span>
          </div>
        </div>
        <div
          className={cn(
            "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
            meta.bg,
            meta.color,
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <button className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <p className="px-4 pb-3 text-[13.5px] leading-relaxed">{post.text}</p>

      {post.image && (
        <img src={post.image} alt={post.project} className="w-full max-h-[380px] object-cover" />
      )}

      <div className="px-4 py-2.5 flex items-center justify-between text-[11.5px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-[18px] w-[18px] rounded-full bg-primary flex items-center justify-center">
            <ThumbsUp className="h-2.5 w-2.5 text-white fill-white" />
          </span>
          {likeCount}
        </span>
        <span>
          {post.comments} {f.commentsLabel}
        </span>
      </div>

      <div className="px-2 py-1 border-t border-border flex items-center">
        <ActionBtn
          Icon={ThumbsUp}
          label={liked ? f.liked : f.like}
          active={liked}
          onClick={() => setLiked((v) => !v)}
        />
        <ActionBtn Icon={MessageCircle} label={f.comment} />
        <ActionBtn Icon={Share2} label={f.share} />
      </div>

      <div className="flex items-center gap-2 p-3 border-t border-border">
        <Avatar
          initials="BS"
          size="h-8 w-8"
          text="text-[10px]"
          gradient="from-amber-400 to-orange-500"
        />
        <input
          placeholder={f.writeComment}
          className="flex-1 rounded-full bg-muted px-4 py-2 text-[12.5px] outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/60"
        />
      </div>
    </div>
  );
}

// ---------------- Rail izquierdo ----------------
function ProfileCard() {
  const { user } = useAuth();
  const role = (user?.user_metadata?.role as string | undefined) === "admin" ? "Admin" : "Miembro";
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      <div className="h-16 bg-gradient-to-r from-primary to-lavender" />
      <div className="px-4 pb-4 -mt-7">
        <Avatar
          initials={user ? initials(user) : "??"}
          size="h-14 w-14 ring-4 ring-card"
          text="text-[17px]"
          gradient="from-amber-400 to-orange-500"
        />
        <p className="mt-2 text-[14.5px] font-bold leading-tight">{displayName(user)}</p>
        <p className="text-[11.5px] text-muted-foreground">{user?.email ?? role}</p>
        <div className="mt-3 grid grid-cols-3 gap-1 text-center">
          {[
            { v: "6", l: "Proyectos" },
            { v: "48", l: "Ideas" },
            { v: "128", l: "Archivos" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg bg-muted/60 py-2">
              <p className="text-[15px] font-bold leading-none">{s.v}</p>
              <p className="text-[9.5px] text-muted-foreground mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const shortcuts: {
  to: "/proyectos" | "/briefings" | "/ia" | "/archivos";
  label: keyof ReturnType<typeof useLang>["t"]["nav"];
  Icon: LucideIcon;
}[] = [
  { to: "/proyectos", label: "projects", Icon: FolderKanban },
  { to: "/briefings", label: "briefings", Icon: Lightbulb },
  { to: "/ia", label: "ai", Icon: Sparkles },
  { to: "/archivos", label: "files", Icon: Files },
];

function Shortcuts() {
  const { t } = useLang();
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-soft">
      <h3 className="px-2 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
        {t.feed.shortcuts}
      </h3>
      <div className="space-y-0.5">
        {shortcuts.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] font-medium text-foreground/80 hover:bg-muted transition-colors"
          >
            <span className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-primary">
              <s.Icon className="h-[17px] w-[17px]" />
            </span>
            {t.nav[s.label]}
          </Link>
        ))}
      </div>
    </div>
  );
}

function StorageCard() {
  const { t } = useLang();
  const used = 64;
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-2 mb-3">
        <HardDrive className="h-4 w-4 text-primary" />
        <h3 className="text-[13px] font-semibold">{t.feed.storage}</h3>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-lavender rounded-full"
          style={{ width: used + "%" }}
        />
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        {t.feed.storageUsed.replace("{used}", "6,4 GB").replace("{total}", "10 GB")}
      </p>
    </div>
  );
}

// ---------------- Rail derecho ----------------
const priorityCls: Record<string, string> = {
  Alta: "bg-red-500/10 text-red-400",
  Media: "bg-orange-500/10 text-orange-400",
  Baja: "bg-emerald-500/10 text-emerald-400",
};

function RightRail() {
  const { t } = useLang();
  const d = t.dashboard;
  return (
    <div className="hidden xl:flex w-[300px] shrink-0 flex-col gap-4 sticky top-[80px] self-start">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <h3 className="text-[14px] font-semibold mb-3">{d.upcomingMeetings}</h3>
        <div className="space-y-3">
          {meetings.map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-medium leading-tight truncate">{m.label}</p>
                <p className="text-[11px] text-muted-foreground">{m.date}</p>
              </div>
              <div className="flex -space-x-1.5 shrink-0">
                {m.avatars.map((av, j) => (
                  <div
                    key={j}
                    className="h-6 w-6 rounded-full border-2 border-card bg-gradient-to-br from-primary/80 to-lavender flex items-center justify-center text-[8px] font-bold text-white"
                  >
                    {av}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <h3 className="text-[14px] font-semibold mb-3">{d.pendingTasks}</h3>
        <div className="space-y-2.5">
          {tasks.map((tk, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-md border-2 border-border shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-medium leading-tight">{tk.label}</p>
                <p className="text-[11px] text-muted-foreground">{tk.project}</p>
              </div>
              <span
                className={cn(
                  "text-[10.5px] font-semibold px-1.5 py-0.5 rounded-md shrink-0",
                  priorityCls[tk.priority],
                )}
              >
                {tk.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <h3 className="text-[14px] font-semibold mb-3">{t.feed.teamOnline}</h3>
        <div className="space-y-2.5">
          {teamOnline.map((member) => (
            <div key={member.initials} className="flex items-center gap-3">
              <div className="relative shrink-0">
                <Avatar initials={member.initials} size="h-9 w-9" text="text-[11px]" />
                <span
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                    member.online ? "bg-emerald-500" : "bg-muted-foreground/40",
                  )}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-medium leading-tight truncate">{member.name}</p>
                <p className="text-[11px] text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- Página ----------------
function Dashboard() {
  const { t } = useLang();
  const d = t.dashboard;

  return (
    <div className="flex gap-5 max-w-[1600px] mx-auto">
      {/* Rail izquierdo */}
      <div className="hidden lg:flex w-[240px] shrink-0 flex-col gap-4 sticky top-[80px] self-start">
        <ProfileCard />
        <Shortcuts />
        <StorageCard />
      </div>

      {/* Feed central */}
      <div className="flex-1 min-w-0 space-y-4 max-w-[640px] mx-auto">
        <div className="pt-0.5">
          <h1 className="text-[20px] md:text-[22px] font-bold tracking-tight">{d.welcome}</h1>
          <p className="text-[12.5px] text-muted-foreground mt-0.5">{d.subtitle}</p>
        </div>
        <KpiStrip />
        <Composer />
        <Stories />
        {feedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <button className="w-full rounded-2xl border border-border bg-card py-3 text-[12.5px] font-semibold text-primary hover:bg-muted transition-colors shadow-soft">
          {t.feed.loadMore}
        </button>
      </div>

      {/* Rail derecho */}
      <RightRail />
    </div>
  );
}
