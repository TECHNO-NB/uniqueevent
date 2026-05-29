// @ts-nocheck
"use client"
import {
  motion
} from "framer-motion";

const page = () => {
  return (
      <section id="products" style={{ padding: "90px 25px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 72 }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#00D4FF",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Our Products
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Why Choose{" "}
              <span
                style={{
                  color: "#00D4FF",
               
                }}
              >
                Mithila tech?
              </span>
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 2,
            }}
          >
            {[
                        {
              num: "01",
              title: "Education Software",
              desc: "Custom digital solutions for schools, colleges, and training institutes.",
            },
            {
              num: "02",
              title: "Learning Management System (LMS)",
              desc: "Smart platforms for online learning, courses, and student engagement.",
            },
            {
              num: "03",
              title: "School Management System",
              desc: "Complete software to manage academics, administration, and communication.",
            },
            {
              num: "04",
              title: "Student Attendance System",
              desc: "Easy attendance tracking with real-time reports and monitoring.",
            },
            {
              num: "05",
              title: "Library Management System",
              desc: "Efficient system to manage books, records, and library operations.",
            },
            {
              num: "06",
              title: "Customer Relationship Management (CRM)",
              desc: "Organize leads, customers, and sales processes in one place.",
            },
            {
              num: "07",
              title: "Business & Enterprise Software",
              desc: "Scalable software solutions designed for modern business operations.",
            },
            {
              num: "08",
              title: "Billing & Accounting Software",
              desc: "Manage invoices, expenses, payments, and financial reporting easily.",
            },
            {
              num: "09",
              title: "HR & Payroll Management System Employee",
              desc: "Simplify employee records, payroll, attendance, and HR processes.",
            },
            {
              num: "10",
              title: "Healthcare Software",
              desc: "Digital solutions for hospitals, healthcare providers, and patient care.",
            },
            {
              num: "11",
              title: "Clinic Management Software",
              desc: "Manage appointments, patient records, billing, and clinic workflows.",
            },

              
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ background: "rgba(255,255,255,0.06)" }}
                style={{
                  padding: "48px 36px",
                  borderRadius: 0,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.06)",
                    lineHeight: 1,
                    marginBottom: 20,
                  }}
                >
                  {item.num}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#5A6478",
                    fontSize: 15,
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default page