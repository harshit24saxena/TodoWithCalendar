"use client"
import { motion } from "motion/react"

export default function Login() {

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--bg-secondary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          padding: "0 20px",
        }}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "2.4rem",
              fontWeight: 800,
              color: "#2d1a0e",
              lineHeight: 1.15,
              marginBottom: "6px",
            }}
          >
            Daily Task
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.4 }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "0.95rem",
              color: "#7a5a46",
              fontWeight: 400,
            }}
          >
            Welcome back! Log in to continue.
          </motion.p>
        </div>


            {/* Divider */}
            <div className="w-full border-[#d39c12] border-b-2 p-1 mb-4">
            </div>

            {/* Google OAuth */}
            <motion.a
              id="google-login"
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                background: "white",
                border: "1.5px solid var(--accent-peach)",
                borderRadius: "14px",
                padding: "12px",
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "#2d1a0e",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(251,161,119,0.1)",
              }}
            >
              {/* COOGLE LOGO */}
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Continue with Google
            </motion.a>
      </motion.div>
    </div>
  )
}
