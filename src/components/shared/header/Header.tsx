import SCGLogo from "@public/logos/scg-logo-stacked.svg";

export default function Header() {
  return (
    <header
      className="bg-pr-800 flex justify-left gap-3 items-center h-auto py-4"
      role="banner"
      aria-label="SCG site header"
    >
      <div className="layout-container">
        <SCGLogo className="h-24 w-auto" />
      </div>
    </header>
  );
}
