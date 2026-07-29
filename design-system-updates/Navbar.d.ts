export interface NavbarProps {
  /** Which link renders as current (bold + underlined, aria-current="page"). Default "work" */
  activePage?: "work" | "about" | "resume";
  /** mailto target for the Contact button. Default "aisha.momand1@gmail.com" */
  contactEmail?: string;
  /** href the logo links to. Default "Home Page.html" */
  logoHref?: string;
}
/**
 * Sticky header shared by every page. Owns its own responsive switch at
 * 1000px — below that it collapses to logo + hamburger with a stacked
 * expandable menu; at/above it renders the full inline link row.
 */
export declare function Navbar(props: NavbarProps): JSX.Element;
