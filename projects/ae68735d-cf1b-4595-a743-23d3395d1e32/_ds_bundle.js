/* @ds-bundle: {"format":4,"namespace":"AishaMomandDesignSystem_ae6873","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"MetaField","sourcePath":"components/core/MetaField.jsx"},{"name":"ProjectCard","sourcePath":"components/core/ProjectCard.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Link","sourcePath":"components/navigation/Link.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"e29ae0ad30b7","components/core/Button.jsx":"9ce48c25ea8c","components/core/MetaField.jsx":"01ea9dc314fc","components/core/ProjectCard.jsx":"6b79d1efa3ff","components/core/Tag.jsx":"d6068cde5ba1","components/navigation/Footer.jsx":"2b67a6304b01","components/navigation/Link.jsx":"7f9d140b21b9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AishaMomandDesignSystem_ae6873 = window.AishaMomandDesignSystem_ae6873 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function Logo({
  name = "Aisha Momand",
  size = 40
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.png",
    alt: "",
    style: {
      width: size,
      height: size,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-name)",
      color: "var(--navy-900)",
      whiteSpace: "nowrap"
    }
  }, name));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children = "Get in touch",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button"
}) {
  const [hovered, setHovered] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  // Sizes align with the type scale: sm/md = --text-nav-link & --text-label (14px), lg = --text-body (16px)
  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: 14
    },
    md: {
      padding: "12px 24px",
      fontSize: 14
    },
    lg: {
      padding: "16px 32px",
      fontSize: 16
    }
  };
  const palette = {
    primary: {
      bg: "var(--action-primary)",
      bgHover: "var(--action-primary-hover)",
      bgActive: "var(--action-primary-active)",
      fg: "var(--cream-50)",
      border: "transparent"
    },
    secondary: {
      bg: "transparent",
      bgHover: "var(--action-secondary-hover)",
      bgActive: "var(--action-secondary-active)",
      fg: "var(--navy-900)",
      border: "var(--border-interactive)"
    },
    ghost: {
      bg: "transparent",
      bgHover: "var(--action-secondary-hover)",
      bgActive: "var(--action-secondary-active)",
      fg: "var(--navy-900)",
      border: "transparent"
    }
  }[variant];
  const bg = disabled ? "var(--action-disabled-bg)" : active ? palette.bgActive : hovered ? palette.bgHover : palette.bg;
  const fg = disabled ? "var(--action-disabled-fg)" : palette.fg;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      ...sizes[size],
      fontFamily: "var(--font-body)",
      fontWeight: 700,
      lineHeight: 1.43,
      background: bg,
      color: fg,
      border: `1.5px solid ${disabled ? "var(--action-disabled-bg)" : palette.border}`,
      borderRadius: "var(--radius-badge)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      transition: "var(--transition-interactive)",
      transform: active && !disabled ? "scale(0.98)" : hovered && !disabled ? "translateY(-1px)" : "none",
      outline: focused ? "2px solid var(--focus-ring)" : "none",
      outlineOffset: 2,
      minHeight: 44,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/MetaField.jsx
try { (() => {
function MetaField({
  label = "role",
  value = "UX/UI Designer"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-label)",
      letterSpacing: "var(--text-eyebrow-letterspace)",
      color: "var(--navy-900)",
      textTransform: "uppercase"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body-md)",
      color: "var(--text-muted)"
    }
  }, value));
}
Object.assign(__ds_scope, { MetaField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MetaField.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children = "case study"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-badge)",
      background: "var(--surface-badge)",
      padding: "5px 8px",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-label)",
      letterSpacing: "var(--text-eyebrow-letterspace)",
      color: "var(--text-on-badge)",
      textTransform: "uppercase",
      whiteSpace: "nowrap"
    }
  }, children));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/ProjectCard.jsx
try { (() => {
function ProjectCard({
  title = "I designed an end-to-end interface for a solar farm design tool",
  tags = ["case study", "End-to-End Design", "Enterprise UX", "NDA", "2025"],
  image
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 396,
      borderRadius: "var(--radius-card)",
      background: image ? `url(${image}) center/cover no-repeat` : "var(--surface-media-placeholder)",
      border: "0.56px solid rgba(255,255,255,0.2)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-display-sm)",
      color: "var(--navy-900)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: 24,
      flexWrap: "wrap"
    }
  }, tags.map((t, i) => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: i
  }, t))));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function ArrowIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 5 19 12 12 19"
  }));
}
function CopyrightIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    style: {
      flexShrink: 0,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10.25"
  }), /*#__PURE__*/React.createElement("text", {
    x: "12",
    y: "15.7",
    textAnchor: "middle",
    fontSize: "11",
    fontFamily: "Georgia, serif",
    fontWeight: "600",
    fill: "currentColor",
    stroke: "none"
  }, "C"));
}
function Footer({
  heading = "Let\u2019s connect and build clarity.",
  body = "Whether you have a complex system to untangle or a new product to launch, I can help you find the clarity in the noise.",
  email = "aisha.momand1@gmail.com",
  compact = false
}) {
  const c = compact;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-inverse)",
      padding: c ? "48px 20px" : "60px clamp(20px, 6vw, 80px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: c ? 16 : 20,
      paddingBottom: c ? 40 : 60
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: c ? "600 32px/1.15 var(--font-display)" : "var(--text-display-lg)",
      color: "var(--text-inverse)"
    }
  }, heading), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: c ? "400 16px/1.6 var(--font-body)" : "var(--text-body-lg)",
      color: "var(--text-inverse)"
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: c ? "500 16px/1.6 var(--font-body)" : "500 20px/1.6 var(--font-body)",
      color: "var(--text-accent-on-dark)",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, "linkedin ", /*#__PURE__*/React.createElement(ArrowIcon, null)), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    style: {
      font: c ? "500 16px/1.6 var(--font-body)" : "500 20px/1.6 var(--font-body)",
      color: "var(--text-accent-on-dark)",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, email, " ", /*#__PURE__*/React.createElement(ArrowIcon, null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "0.56px solid var(--border-hairline)",
      padding: c ? "40px 0 0" : "60px 0",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 14px/1.14 var(--font-body)",
      letterSpacing: "0.6px",
      color: "var(--text-inverse)",
      textTransform: "uppercase",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(CopyrightIcon, null), " 2025 AISHA MOMAND"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 14px/1.14 var(--font-body)",
      color: "var(--text-inverse)",
      textAlign: "left"
    }
  }, "Created with love, coffee, and the occasional existential crisis about button placement"))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Link.jsx
try { (() => {
function Link({
  children = "Work",
  href = "#",
  active = false
}) {
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const underline = active || focused || hovered;
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    "aria-current": active ? "page" : undefined,
    style: {
      font: "var(--text-nav-link)",
      fontWeight: active ? 700 : 400,
      color: "var(--navy-900)",
      textDecoration: underline ? "underline" : "none",
      padding: "12px 4px",
      display: "inline-block",
      minHeight: 44,
      boxSizing: "border-box"
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }, children);
}
Object.assign(__ds_scope, { Link });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Link.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.MetaField = __ds_scope.MetaField;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Link = __ds_scope.Link;

})();
