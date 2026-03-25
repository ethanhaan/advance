// ./src/global_components/ContactPopup.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const WEB3FORMS_ACCESS_KEY = "11dc10b8-e9d5-46ae-974b-277d7cd35e23";
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes between submissions
const COOLDOWN_KEY = "contact-last-sent";

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

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [cooldownLeft, setCooldownLeft] = useState(0);
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

  // Cooldown timer
  useEffect(() => {
    if (!open) return;
    const check = () => {
      const last = parseInt(localStorage.getItem(COOLDOWN_KEY) || "0", 10);
      const remaining = Math.max(0, COOLDOWN_MS - (Date.now() - last));
      setCooldownLeft(remaining);
      return remaining;
    };
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, [open]);

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
  const inCooldown = cooldownLeft > 0;
  const canSend = form.name.trim().length > 0 && validEmail && form.message.trim().length > 0 && remaining >= 0 && !sending && !inCooldown;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSend) return;

    setSending(true);
    setError(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          source: source || "unknown",
          subject: "Advance Careers — Contact form",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Submission failed");

      localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setOpen(false), 3000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
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

            <AnimatePresence mode="wait">
              {sent ? (
                /* ── Success screen ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: isMobile ? "40px 18px 48px" : "56px 34px 64px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    flex: "1 1 auto",
                  }}
                >
                  {/* Animated checkmark circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: COLORS.blue,
                      display: "grid",
                      placeItems: "center",
                      marginBottom: 24,
                    }}
                  >
                    <motion.svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    style={{
                      margin: 0,
                      fontFamily: "Poly, ui-serif, Georgia, Cambria, Times New Roman, serif",
                      fontSize: isMobile ? 22 : 26,
                      fontWeight: 400,
                      color: COLORS.baseText,
                    }}
                  >
                    Message sent
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    style={{
                      margin: "10px 0 0",
                      fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                      fontSize: 15,
                      color: COLORS.subtleText,
                      maxWidth: 320,
                      lineHeight: 1.5,
                    }}
                  >
                    Thanks for reaching out — we’ll be in touch soon.
                  </motion.p>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  onSubmit={submit}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
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
                  {/* Name */}
                  <motion.div style={{ position: "relative" }} variants={item}>
                    <div style={label}>Name</div>
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
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={onChange}
                      style={inputBase}
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
                  </motion.div>

                  {/* Email */}
                  <motion.div style={{ position: "relative", marginTop: 12 }} variants={item}>
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

                  {/* Phone */}
                  <motion.div style={{ position: "relative", marginTop: 12 }} variants={item}>
                    <div style={label}>Phone</div>
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
                      <path
                        d="M6.6 10.8a13.3 13.3 0 006.6 6.6l2.2-2.2a.9.9 0 01.9-.2 10.2 10.2 0 003.2.5.9.9 0 01.9.9v3.1a.9.9 0 01-.9.9A15.1 15.1 0 013.6 4.5a.9.9 0 01.9-.9H7.6a.9.9 0 01.9.9 10.2 10.2 0 00.5 3.2.9.9 0 01-.2.9L6.6 10.8z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="04XX XXX XXX"
                      value={form.phone}
                      onChange={onChange}
                      style={inputBase}
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
                        {error
                          ? <span style={{ color: "#ef4444" }}>{error}</span>
                          : inCooldown
                            ? `You can send again in ${Math.ceil(cooldownLeft / 60000)}m`
                            : <>Or email us directly at <strong>info@advancecareers.org</strong></>
                        }
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
                      {sending ? "Sending…" : inCooldown ? "Wait" : "Send"}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Time complexity: N/A (UI rendering)

