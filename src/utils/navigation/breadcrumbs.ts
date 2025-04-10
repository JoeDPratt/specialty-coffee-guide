export function getBreadcrumbsFromPath(
  path: string,
  finalLabelOverride?: string,
): { label: string; href: string }[] {
  const segments = path.split("/").filter(Boolean);
  const crumbs = segments.map((seg, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    let label = decodeURIComponent(seg)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    if (index === segments.length - 1 && finalLabelOverride) {
      label = finalLabelOverride;
    }

    return { label, href };
  });

  return [{ label: "Home", href: "/" }, ...crumbs];
}
