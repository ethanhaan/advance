// ./src/global_components/ContactPopup.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const MAILTO_ADDRESS = ""; // e.g. "hello@advancecareers.org.au"

function useIsMobile(maxWidthPx = 640) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(`(max-width: ${maxWidthPx}px)`).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const onChange = (e) => setIsMobile(e.matches);

    // Safari fallback
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    setIsMobile(mq.matches);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [maxWidthPx]);

  return isMobile;
}

export default function ContactPopup() {
  const isMobile = useIsMobile(640);

  const [open, setOpen] = useState(false);
  const [source, setSource] = useState(null);
  const modalRef = useRef(null);

  const [form, setForm] = useState({ email: "", message: "" });
  const [sent, setSent] = useState(false);
  const charMax = 800;

  useEffect(() => {
    const openHandler = (e) => {
      setSource(e?.detail?.source || null);
      setSent(false);
      setOpen(true);
    };
    const closeHandler = () => setOpen(false);
    window.addEventListener("open-contact", openHandler);
    window.addEventListener("close-contact", closeHandler);
    return () => {
      window.removeEventListener("open-contact", openHandler);
      window.removeEventListener("close-contact", closeHandler);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const qs = (sel) => modalRef.current?.querySelectorAll(sel);
    const tabbables = () =>
      qs('button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])');
    const first = () => tabbables()?.[0];
    const last = () => {
      const t = tabbables();
      return t?.[t.length - 1];
    };

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && modalRef.current) {
        const t = tabbables();
        if (!t || !t.length) return;
        const f = t[0];
        const l = t[t.length - 1];
        if (e.shiftKey && document.activeElement === f) {
          l.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === l) {
          f.focus();
          e.preventDefault();
        }
      }
    };

    const timer = setTimeout(() => first()?.focus(), 60);
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const overlay = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.22 } },
    exit: { opacity: 0, transition: { duration: 0.22 } },
  };
  const panel = {
    hidden: { opacity: 0, y: 18, scale: 0.975, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.33, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -9,
      scale: 0.98,
      filter: "blur(2px)",
      transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const contentStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.085, delayChildren: 0.06 } },
  };
  const item = {
    hidden: { y: 10, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const COLORS = {
    baseBg: "#ffffff",
    baseText: "#111827",
    subtleText: "#6B7280",
    border: "rgba(17,24,39,0.08)",
    inputBg: "#F8FAFC",
    inputBorder: "#E5E7EB",
    inputText: "#111827",
    blue: "#1B56BA",
  };

  const label = {
    fontFamily:
      "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#475569",
    margin: "12px 0 6px",
  };

  const inputBase = {
    width: "100%",
    boxSizing: "border-box",
    background: COLORS.inputBg,
    border: `1px solid ${COLORS.inputBorder}`,
    color: COLORS.inputText,
    padding: "12px 14px 12px 40px",
    borderRadius: 8,
    outline: "none",
    fontFamily:
      "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    fontSize: 14,
    transition:
      "border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
  };

  const areaBase = {
    ...inputBase,
    padding: "12px 14px",
    minHeight: isMobile ? 120 : 140,
    resize: isMobile ? "none" : "vertical",
  };

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validEmail = useMemo(
    () => /^\S+@\S+\.\S+$/.test(form.email || ""),
    [form.email]
  );

  const remaining = charMax - (form.message?.length || 0);
  const canSend = validEmail && form.message.trim().length > 0 && remaining >= 0;

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Advance Careers — Contact form");
    const body = encodeURIComponent(
      [
        `Email: ${form.email}`,
        `Source: ${source || "unknown"}`,
        "",
        form.message,
      ].join("\n")
    );

    if (MAILTO_ADDRESS) {
      window.location.href = `mailto:${MAILTO_ADDRESS}?subject=${subject}&body=${body}`;
    } else {
      console.log("CONTACT SUBMISSION", { ...form, source });
    }

    setSent(true);
    setTimeout(() => setOpen(false), 1200);
  };

  const headerTitleId = "contact-popup-title";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="contact-overlay"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={overlay}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000, // stay above navbar/menu
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "grid",
            placeItems: "center",
            padding: isMobile ? 12 : 20,
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headerTitleId}
            ref={modalRef}
            variants={panel}
            style={{
              width: isMobile ? "min(560px, calc(100vw - 24px))" : "min(640px, 96vw)",
              maxHeight: isMobile ? "calc(100vh - 24px)" : "90vh",
              borderRadius: isMobile ? 12 : 14,
              background: COLORS.baseBg,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.baseText,
              boxShadow: "0 30px 80px rgba(0,0,0,0.15)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 12 : 14,
                padding: isMobile ? "18px 18px 12px" : "34px 34px 20px",
                position: "relative",
                flex: "0 0 auto",
              }}
              variants={contentStagger}
              initial="hidden"
              animate="show"
            >
              <motion.div
                aria-hidden="true"
                style={{
                  width: isMobile ? 6 : 8,
                  borderRadius: 1,
                  background: COLORS.blue,
                  alignSelf: "stretch",
                  transformOrigin: "top",
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              <motion.div variants={item} style={{ flex: 1, minWidth: 0 }}>
                <h2
                  id={headerTitleId}
                  style={{
                    margin: 0,
                    fontFamily:
                      "Poly, ui-serif, Georgia, Cambria, Times New Roman, serif",
                    fontSize: isMobile ? 22 : 28,
                    lineHeight: 1.15,
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                  }}
                >
                  We’re looking forward to working with you
                </h2>
                <p
                  style={{
                    margin: "6px 0 0",
                    color: COLORS.subtleText,
                    fontFamily:
                      "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                    fontSize: 14,
                  }}
                >
                  Pop in your email and a short message — we’ll get back to you soon.
                </p>
              </motion.div>

              <motion.button
                aria-label="Close contact form"
                onClick={() => setOpen(false)}
                variants={item}
                style={{
                  position: "absolute",
                  top: isMobile ? 10 : 9,
                  right: isMobile ? 10 : 9,
                  width: isMobile ? 40 : 30,
                  height: isMobile ? 40 : 30,
                  display: "grid",
                  placeItems: "center",
                  background: "transparent",
                  color: COLORS.subtleText,
                  border: "1px solid rgba(17,24,39,0.08)",
                  borderRadius: 10,
                  padding: 0,
                  cursor: "pointer",
                  lineHeight: 0,
                  touchAction: "manipulation",
                }}
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ display: "block" }}
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>
            </motion.div>

            {/* Body (scrollable on mobile) */}
            <motion.form
              onSubmit={submit}
              style={{
                padding: isMobile ? "8px 18px 18px" : "10px 34px 28px",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                flex: "1 1 auto",
              }}
              variants={contentStagger}
              initial="hidden"
              animate="show"
            >
              {/* Email */}
              <motion.div style={{ position: "relative" }} variants={item}>
                <div style={label}>Email</div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 38,
                    pointerEvents: "none",
                    opacity: 0.7,
                  }}
                  aria-hidden="true"
                >
                  <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M4 7l8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>

                <input
                  name="email"
                  type="email"
                  required
                  inputMode="email"
                  placeholder="you@school.edu.au"
                  value={form.email}
                  onChange={onChange}
                  style={{
                    ...inputBase,
                    borderColor:
                      form.email && !validEmail ? "#ef4444" : COLORS.inputBorder,
                    boxShadow:
                      form.email && !validEmail
                        ? "0 0 0 3px rgba(239,68,68,0.15)"
                        : "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.blue;
                    e.currentTarget.style.boxShadow =
                      "0 0 0 4px rgba(27,86,186,0.15)";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = COLORS.inputBorder;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = COLORS.inputBg;
                  }}
                  aria-invalid={form.email && !validEmail ? "true" : "false"}
                />
              </motion.div>

              {/* Message */}
              <motion.div style={{ marginTop: 12 }} variants={item}>
                <div style={label}>Message</div>
                <textarea
                  name="message"
                  required
                  maxLength={charMax}
                  placeholder="Tell us about your school, dates, or what you’re after…"
                  value={form.message}
                  onChange={onChange}
                  style={areaBase}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.blue;
                    e.currentTarget.style.boxShadow =
                      "0 0 0 4px rgba(27,86,186,0.15)";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = COLORS.inputBorder;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = COLORS.inputBg;
                  }}
                />
                <div
                  style={{
                    marginTop: 6,
                    fontFamily:
                      "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                    fontSize: 12,
                    color: remaining < 0 ? "#ef4444" : COLORS.subtleText,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? 6 : 0,
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {sent ? (
                      "Thanks — message prepared!"
                    ) : (
                      <>
                        ⚠️ Our send button is currently not working. Please email us at{" "}
                        <strong>info@advancecareers.org</strong> instead.
                      </>
                    )}
                  </span>
                  <span>
                    {remaining} / {charMax}
                  </span>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column-reverse" : "row",
                  justifyContent: "flex-end",
                  alignItems: "stretch",
                  gap: 10,
                  marginTop: 18,
                }}
                variants={item}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    background: "transparent",
                    color: COLORS.subtleText,
                    border: "1px solid rgba(17,24,39,0.10)",
                    padding: isMobile ? "12px 14px" : "10px 12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    borderRadius: 8,
                    width: isMobile ? "100%" : "auto",
                    fontFamily:
                      "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                    touchAction: "manipulation",
                  }}
                >
                  Cancel
                </button>

                <motion.button
                  type="submit"
                  disabled={!canSend}
                  style={{
                    background: COLORS.blue,
                    color: "#FFFFFF",
                    border: `1px solid ${COLORS.blue}`,
                    borderRadius: 8,
                    padding: isMobile ? "12px 14px" : "10px 18px",
                    fontWeight: 800,
                    cursor: canSend ? "pointer" : "not-allowed",
                    opacity: canSend ? 1 : 0.65,
                    width: isMobile ? "100%" : "auto",
                    fontFamily:
                      "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                    touchAction: "manipulation",
                  }}
                  whileHover={isMobile ? undefined : { y: -1, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  Send
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Time complexity: N/A (UI rendering)

