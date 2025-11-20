// ./src/pages/workshops_page/components/offerings.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import canterburyWorkshopImg from "../assets/canterbury_workshop.png";

// --- Data for the Offering Cards + Detailed Content ---
export const offeringsData = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
    title: "Career Insights Panel",
    desc: "A panel of 4-5 university students from various degrees. Moderated discussions in an assembly format, with networking opportunities and a Q&A for student engagement.",
    time: "1 - 1.5 hours",
    students: "100 - 300 Students",
    grade: "Years 10 - 12",
    location: "Auditorium/Hall",

    overviewEyebrow: "Career Insights Panel",
    overviewTitle: "Career stories that feel real and relatable.",
    overviewLead:
      "Students hear directly from recent graduates and current university students about pathways, pivots, and practical lessons that don’t fit into a syllabus.",
    overviewFeatures: [
      {
        title: "Honest, lived experience",
        body: "Panellists share real stories about subject choices, ATAR expectations, uni life and early career decisions.",
      },
      {
        title: "Moderated discussion + Q&A",
        body: "A facilitated format keeps the session structured while leaving space for student questions.",
      },
      {
        title: "Multiple degree pathways",
        body: "Showcase different degrees and industries so students can see there is more than one ‘right’ path.",
      },
      {
        title: "Assembly-friendly format",
        body: "Designed for large groups, with clear AV flow that works in halls and auditoriums.",
      },
    ],
    carouselImages: [canterburyWorkshopImg, canterburyWorkshopImg, canterburyWorkshopImg],
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1770&auto=format&fit=crop",
    title: "Study Skills Workshop",
    desc: "Presented by university students who’ve succeeded through the same process, this workshop covers study techniques and strategies that helped us thrive in university and land jobs.",
    time: "40 - 60 minutes",
    students: "20 - 30 Students",
    grade: "Years 7+",
    location: "Classroom",

    overviewEyebrow: "Study Skills Workshop",
    overviewTitle: "Turn study from last-minute cramming into a repeatable system.",
    overviewLead:
      "We translate evidence-based study strategies into simple, practical routines that students can start using in their very next homework session.",
    overviewFeatures: [
      {
        title: "Evidence-based techniques",
        body: "Introduce methods like active recall, spaced repetition and interleaving in student-friendly language.",
      },
      {
        title: "Planning and organisation",
        body: "Help students break assessments into manageable steps and build weekly study schedules that actually fit their lives.",
      },
      {
        title: "Focus and procrastination",
        body: "Share tools and habits for managing distractions, building focus and reducing last-minute stress.",
      },
      {
        title: "Take-home templates",
        body: "Students leave with simple planning templates they can re-use across subjects.",
      },
    ],
    carouselImages: [canterburyWorkshopImg, canterburyWorkshopImg, canterburyWorkshopImg],
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=1770&auto=format&fit=crop",
    title: "Subject Expert Sessions",
    desc: "We bring professionals or university students into classes to link studies with careers. For example, a paralegal might visit a Legal Studies class to discuss legal career paths.",
    time: "40 - 60 minutes",
    students: "20 - 30 students",
    grade: "Years 9 - 11",
    location: "Classroom (Elective Class)",

    overviewEyebrow: "Subject Expert Sessions",
    overviewTitle: "Connect classroom content to real-world pathways.",
    overviewLead:
      "Professionals and uni students step into elective classes to show how today’s topics link to tomorrow’s jobs.",
    overviewFeatures: [
      {
        title: "Curriculum-aligned examples",
        body: "Speakers reference the concepts students are already learning so the session feels immediately relevant.",
      },
      {
        title: "Real job stories",
        body: "Students hear what a day-in-the-life actually looks like in law, engineering, business and more.",
      },
      {
        title: "Interactive Q&A",
        body: "Small-group settings make it easier for students to ask specific, targeted questions.",
      },
      {
        title: "Role-model visibility",
        body: "Encourage students to see people who look like them thriving in different fields.",
      },
    ],
    carouselImages: [canterburyWorkshopImg, canterburyWorkshopImg, canterburyWorkshopImg],
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1770&auto=format&fit=crop",
    title: "Career Exploration Day",
    desc: "Students rotate between career representatives from fields like Law, Finance, and Engineering, getting insights into each career path and tips for success in those industries.",
    time: "1 - 1.5 hours",
    students: "100 - 300 Students",
    grade: "Years 10 - 12",
    location: "Auditorium/Hall",

    overviewEyebrow: "Career Exploration Day",
    overviewTitle: "A high-energy taster of multiple career pathways.",
    overviewLead:
      "Students rotate through short, sharp sessions with speakers from different industries, turning a single period into a broad career snapshot.",
    overviewFeatures: [
      {
        title: "Rotating stations",
        body: "Keep energy high with short sessions that expose students to multiple fields in one event.",
      },
      {
        title: "Practical tips",
        body: "Speakers share subject suggestions, entry pathways and early-career advice for their field.",
      },
      {
        title: "Scalable format",
        body: "Works for large cohorts without losing opportunities for interaction.",
      },
      {
        title: "Customisable line-up",
        body: "Choose industries that best match your school community and local opportunities.",
      },
    ],
    carouselImages: [canterburyWorkshopImg, canterburyWorkshopImg, canterburyWorkshopImg],
  },
];

// --- SVG Icons (Self-contained) ---
const ClockIcon = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
  </svg>
);

const StudentIcon = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    fill="currentColor"
  >
    <path d="M320 32c-17.7 0-32 14.3-32 32V288H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320h144c-17.7 0-32 14.3-32 32s14.3 32 32 32h192c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM128 448V352H64v96h64zm192-32c0-17.7-14.3-32-32-32s-32 14.3-32 32v32H192v-32c0-53 43-96 96-96s96 43 96 96v32h-64v-32zm224-32h-64v96h64V416z" />
  </svg>
);

const StairsIcon = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    fill="currentColor"
  >
    <path d="M80 64c0-17.7-14.3-32-32-32S16 46.3 16 64V448H128c70.7 0 128-57.3 128-128s-57.3-128-128-128H80V64zm224 0c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H384c70.7 0 128-57.3 128-128s-57.3-128-128-128H304V0c0-17.7-14.3-32-32-32s-32 14.3-32 32V64zM368 448H560c8.8 0 16-7.2 16-16V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v80H384c-17.7 0-32 14.3-32 32s14.3 32 32 32z" />
  </svg>
);

const PinIcon = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    fill="currentColor"
  >
    <path d="M172.3 501.7C27 392.2-36.3 259.4 34.3 153.7 76.2 81.3 126.7 32 201.7 32c103.2 0 171.5 98.8 141.8 193.3-22.3 69.8-70.2 121.7-124.8 163.4-14.3 10.9-31.1 19.3-43.7 27.6-13.4 8.7-27.9 17.8-38.3 27.2-12.2 11-21.7 24.3-26.6 40.8z" />
  </svg>
);

// --- Reusable Feature Component for Cards ---
const Feature = ({ Icon, text }) => {
  const featureStyle = {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    flex: 1,
  };
  const iconWrapperStyle = {
    display: "flex",
    backgroundColor: "#3b3b3bEE",
    borderRadius: "5px",
    height: "20px",
    width: "20px",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };
  const iconStyle = { height: "13px", color: "white" };
  const textStyle = {
    fontSize: "11px",
    fontWeight: 500,
    color: "#3b3b3bee",
    lineHeight: 1,
  };
  return (
    <div style={featureStyle}>
      <div style={iconWrapperStyle}>
        <Icon style={iconStyle} />
      </div>
      <div style={textStyle}>{text}</div>
    </div>
  );
};

// --- Reusable Program Card Component ---
const ProgramCard = ({
  imgUrl,
  title,
  desc,
  time,
  students,
  grade,
  location,
  isActive = false,
  onClick,
}) => {
  // per-card professional shadow
  const baseShadow = "0 8px 18px rgba(15, 23, 42, 0.12), 0 1px 4px rgba(15, 23, 42, 0.06)";

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: "24px",
    backgroundColor: "#FFFFFF",
    boxShadow: isActive
      ? `${baseShadow}, 0 0 0 2px #1B56BA`
      : 'none',
    width: "100%",
    height: "220px",
    cursor: "pointer",
    boxSizing: "border-box",
    border: "none",
    transition: "box-shadow 180ms ease, transform 180ms ease",
  };

  const imageContainerStyle = {
    flex: 5,
    padding: "18px",
    height: "100%",
    boxSizing: "border-box",
  };
  const imageStyle = {
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "18px",
    width: "100%",
    height: "100%",
  };
  const dividerStyle = {
    height: "calc(100% - 36px)",
    width: "1px",
    backgroundColor: "#E4E1E199",
  };
  const contentStyle = {
    flex: 11,
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    boxSizing: "border-box",
    height: "100%",
  };
  const titleStyle = { fontWeight: 600, color: "#3b3b3b", fontSize: "18px" };
  const descStyle = {
    color: "#3b3b3b",
    fontSize: "11px",
    marginTop: "6px",
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  };
  const featureRowStyle = {
    display: "flex",
    gap: "8px",
    width: "90%",
  };

  return (
    <motion.div
      style={cardStyle}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{
        y: -4,
        scale: 1.01,
        boxShadow: `${baseShadow}, 0 0 0 2px ${
          isActive ? "#1B56BA" : "rgba(148, 163, 184, 0.5)"
        }`,
      }}
      onClick={onClick}
    >
      <div style={imageContainerStyle}>
        <div style={imageStyle} />
      </div>
      <div style={dividerStyle} />
      <div style={contentStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={descStyle}>{desc}</div>
        <div style={{ ...featureRowStyle, marginTop: "16px" }}>
          <Feature Icon={ClockIcon} text={time} />
          <Feature Icon={StudentIcon} text={students} />
        </div>
        <div style={{ ...featureRowStyle, marginTop: "12px" }}>
          <Feature Icon={StairsIcon} text={grade} />
          <Feature Icon={PinIcon} text={location} />
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Offerings Carousel Component ---
export default function OfferingsCarousel({ activeIndex, setActiveIndex }) {
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const scrollContainerRef = useRef(null);

  const scrollBy = (distance) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: distance,
        behavior: "smooth",
      });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <div
      onMouseEnter={() => setIsCarouselHovered(true)}
      onMouseLeave={() => setIsCarouselHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        // ✅ ensure the section itself has **no** shadow
        boxShadow: "none",
        background: "transparent",
      }}
    >
      {/* Scroll Arrows */}
      {["left", "right"].map((dir) => (
        <motion.button
          key={dir}
          onClick={() => scrollBy(dir === "left" ? -400 : 400)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isCarouselHovered ? 1 : 0,
            scale: isCarouselHovered ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            [dir]: "0.5rem",
            zIndex: 10,
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            border: "1px solid #e0e0e0",
            background: "#ffffff",
            color: "#0B0F14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(15,23,42,0.16)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b3b3b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: dir === "left" ? "rotate(180deg)" : "" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      ))}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="offerings-scroll-container"
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "1rem 0.5rem 1.75rem",
          width: "100%",
          scrollbarWidth: "none",
        }}
      >
        <style>{`.offerings-scroll-container::-webkit-scrollbar { display: none; }`}</style>
        
        <div style={{ width: '0px', flexShrink: 0, scrollSnapAlign: 'start' }} />

        {offeringsData.map((offering, i) => (
          <motion.div
            key={offering.title}
            layout
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              flex: "0 0 clamp(340px, 90vw, 480px)",
              scrollSnapAlign: "start",
            }}
          >
            <ProgramCard
              {...offering}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

