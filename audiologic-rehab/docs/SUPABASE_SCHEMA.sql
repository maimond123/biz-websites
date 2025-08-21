x-- Run this in Supabase SQL editor (adjust if schema names differ)

create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content_md text not null,
  cover_image_url text,
  status text not null check (status in ('draft','published','archived')),
  author_id uuid not null references auth.users(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_published_at_idx on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);

create table if not exists public.blog_tags (
  id bigserial primary key,
  slug text unique not null,
  name text not null
);

create table if not exists public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id bigint not null references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id),
  content text not null check (length(content) between 1 and 5000),
  parent_id uuid references public.blog_comments(id) on delete cascade,
  status text not null default 'visible' check (status in ('visible','hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_comments_post_created_idx on public.blog_comments (post_id, created_at);

alter table public.blog_posts enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.blog_comments enable row level security;

create or replace function public.is_owner() returns boolean
language sql stable as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'owner', false)
$$;

drop policy if exists "read published posts" on public.blog_posts;
create policy "read published posts"
on public.blog_posts for select
using (status = 'published' or public.is_owner());

drop policy if exists "owner can crud posts" on public.blog_posts;
create policy "owner can crud posts"
on public.blog_posts for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "read tags" on public.blog_tags;
create policy "read tags"
on public.blog_tags for select using (true);

drop policy if exists "owner can crud tags" on public.blog_tags;
create policy "owner can crud tags"
on public.blog_tags for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "read post-tags" on public.blog_post_tags;
create policy "read post-tags"
on public.blog_post_tags for select using (true);

drop policy if exists "owner can crud post-tags" on public.blog_post_tags;
create policy "owner can crud post-tags"
on public.blog_post_tags for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "read comments for published posts" on public.blog_comments;
create policy "read comments for published posts"
on public.blog_comments for select
using (
  exists (
    select 1 from public.blog_posts p
    where p.id = blog_comments.post_id
      and (p.status = 'published' or public.is_owner())
  )
);

drop policy if exists "members can create comments on published posts" on public.blog_comments;
create policy "members can create comments on published posts"
on public.blog_comments for insert
with check (
  auth.uid() is not null
  and exists (
    select 1 from public.blog_posts p
    where p.id = blog_comments.post_id
      and p.status = 'published'
  )
);

drop policy if exists "author can update/delete own comments; owner can do all" on public.blog_comments;
create policy "author can update/delete own comments; owner can do all"
on public.blog_comments for update using (
  public.is_owner() or author_id = auth.uid()
) with check (
  public.is_owner() or author_id = auth.uid()
);

drop policy if exists "author can delete own comments; owner can do all" on public.blog_comments;
create policy "author can delete own comments; owner can do all"
on public.blog_comments for delete using (
  public.is_owner() or author_id = auth.uid()
);


