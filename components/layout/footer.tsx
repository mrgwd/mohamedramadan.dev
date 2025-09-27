import ExternalLink from "../ui/externalLink";

export default function Footer() {
  return (
    <footer className="text-foreground-secondary-muted my-8 flex flex-wrap gap-x-3">
      <ExternalLink href="https://twitter.com/_MuhammedR">
        @_MuhammedR
      </ExternalLink>
      <ExternalLink href="https://linkedin.com/in/mrgwd">linkedin</ExternalLink>
      <ExternalLink href="https://github.com/mrgwd">github</ExternalLink>
      <ExternalLink href="mailto:mogdwd@gmail.com">email</ExternalLink>
      <ExternalLink
        className="sm:ml-auto"
        href="https://github.com/mrgwd/muhammadramadan"
      >
        source code
      </ExternalLink>
    </footer>
  );
}
