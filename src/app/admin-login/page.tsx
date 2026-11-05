"use client";

import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Admin sign-in API abhi connect nahi hai. Secure login backend connect karna baaki hai.");
  }

  return (
    <main className="rm-admin-login">
      <div className="rm-admin-glow rm-admin-glow-one" aria-hidden="true" />
      <div className="rm-admin-glow rm-admin-glow-two" aria-hidden="true" />
      <div className="rm-admin-layout">
        <section className="rm-admin-brand" aria-label="Rashid Mega Mart">
          <Image src="/Logo.png" alt="Rashid Mega Mart" width={620} height={310} priority className="rm-admin-logo" />
          <span className="rm-admin-overline"><i /> SECURE ADMIN PORTAL <i /></span>
          <h2>Manage smarter.<br /><em>Grow stronger.</em></h2>
          <p>Your store, orders and operations — all in one place.</p>
          <div className="rm-admin-trust"><span>✦</span> PRIVATE ACCESS <b /> AUTHORIZED TEAM ONLY</div>
        </section>

        <section className="rm-admin-card" aria-labelledby="rm-admin-title">
          <div className="rm-admin-card-top">
            <div className="rm-admin-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 3 19 6v5c0 4.6-2.9 8-7 10-4.1-2-7-5.4-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="rm-admin-secure"> <i /> SECURE SIGN IN</span>
          </div>
          <h1 id="rm-admin-title">Welcome <span>back.</span></h1>
          <p className="rm-admin-subtitle">Sign in to access your admin dashboard.</p>

          <form className="rm-admin-form" onSubmit={handleSubmit}>
            <label htmlFor="admin-username">USERNAME</label>
            <div className="rm-admin-field">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.5-3.3 3.1-5.2 7-5.2s6.5 1.9 7 5.2" /></svg>
              <input id="admin-username" name="username" autoComplete="username" placeholder="Enter your username" required />
            </div>

            <label htmlFor="admin-password">PASSWORD</label>
            <div className="rm-admin-field">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></svg>
              <input id="admin-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required />
              <button type="button" className="rm-admin-toggle" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "HIDE" : "SHOW"}</button>
            </div>

            <button type="submit" className="rm-admin-submit">Sign in to dashboard <span aria-hidden="true">↗</span></button>
            {notice && <p className="rm-admin-notice" role="status">{notice}</p>}
          </form>

          <div className="rm-admin-card-foot"><span>🔒</span> Your access is protected and private</div>
        </section>
      </div>
      <footer className="rm-admin-footer">© {new Date().getFullYear()} RASHID MEGA MART <span>•</span> ADMIN ACCESS</footer>
    </main>
  );
}
