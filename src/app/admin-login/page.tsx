"use client";

import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Admin sign-in API abhi connect nahi hai. Secure login backend connect karna baaki hai.");
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-frame">
        <section className="admin-brand-panel" aria-label="Rashid Mega Mart">
          <div className="admin-brand-lockup">
            <Image
              src="/Logo.png"
              alt="Rashid Mega Mart"
              width={720}
              height={360}
              priority
              className="admin-brand-logo"
            />
            <div className="admin-panel-label"><span />ADMIN PANEL<span /></div>
          </div>
          <p className="admin-brand-tagline">SMARTER MANAGEMENT<br />A STRONGER BUSINESS</p>
        </section>

        <section className="admin-form-panel" aria-labelledby="admin-login-title">
          <div className="admin-user-emblem" aria-hidden="true">
            <svg viewBox="0 0 64 64"><circle cx="32" cy="21" r="12" fill="currentColor"/><path d="M10 55c0-12 9-20 22-20s22 8 22 20v3H10z" fill="currentColor"/></svg>
          </div>
          <h1 id="admin-login-title">Admin <span>Login</span></h1>
          <p className="admin-form-subtitle">Welcome Back! Please sign in to continue</p>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <label className="admin-input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.2 0-7.5 2.2-7.5 5v2h15v-2c0-2.8-3.3-5-7.5-5Z" fill="currentColor"/></svg>
              <input name="username" autoComplete="username" placeholder="Username" aria-label="Username" required />
            </label>
            <label className="admin-input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2ZM10 7a2 2 0 1 1 4 0v2h-4Zm2 11a2 2 0 1 1 1-3.73V17h-2v-2.73A2 2 0 0 1 12 18Z" fill="currentColor"/></svg>
              <input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Password" aria-label="Password" required />
              <button className="admin-eye-button" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </label>
            <div className="admin-form-options">
              <label className="admin-remember"><input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} /><span />Remember Me</label>
              <button type="button" className="admin-forgot" onClick={() => setNotice("Password recovery ke liye store administrator se contact karein.")}>Forgot Password?</button>
            </div>
            <button type="submit" className="admin-submit-button"><span aria-hidden="true">↪</span> Login</button>
            {notice && <p className="admin-login-notice" role="status">{notice}</p>}
          </form>

          <div className="admin-authorized"><span />Only for Authorized Personnel<span /></div>
          <p className="admin-portal-foot"><b>✓</b> Rashid Mega Mart Admin Portal</p>
        </section>
      </div>
    </main>
  );
}
