import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { SocialLinks } from "../components/common/SocialLinks";

export const WebTeamPage = () => {
  // ============================================================
  // WEB TEAM MEMBERS
  // ============================================================

  const teamMembers = [
    {
      id: "m1",
      name: "Suruchi Warke",
      photo: "/assets/team/rashmi.jpeg",
      instagram:
        "https://www.instagram.com/suruchi_510/",
      linkedin:
        "https://www.linkedin.com/in/suruchi-warke/",
    },

    {
      id: "m2",
      name: "Swarali Patil",
      photo: "/assets/team/aabha.jpeg",
      instagram:
        "https://www.instagram.com/swaralipatil11/",
      linkedin: "https://www.linkedin.com/in/swarali-patil-223979372/",
    },

    {
      id: "m3",
      name: "Hital Chavan",
      photo: "/assets/team/gargi.jpeg",
      instagram:
        "https://www.instagram.com/hitalc_24",
      linkedin:
        "https://linkedin.com/in/hital-chavan-18ba9532a",
    },
    

    {
      id: "m4",
      name: "Pranjali Lad",
      photo: "/assets/team/akanksha.jpeg",
      instagram:
        "https://www.instagram.com/pranjali_lad74/",
      linkedin:
        "https://www.linkedin.com/in/pranjali-lad-546761312",
    },

    {
      id: "m5",
      name: "Anushka Chitkote",
      photo: "/assets/team/sanket.jpg",
      instagram:
        "https://www.instagram.com/anushkaa_.11",
      linkedin:
        "https://www.linkedin.com/in/anushka-chitkote/",
    },

    {
      id: "m6",
      name: "Jay",
      photo: "/assets/team/ashmit.jpg",
      instagram: "https://www.instagram.com/jay.kelanii?stkn=cnAzZjNpeWIzZ2ow",
      linkedin:
        "https://www.linkedin.com/in/jay-kelani-682103219/",
    },

    {
      id: "m7",
      name: "Shreyank Pal",
      photo: "/assets/team/varsha.jpg",
      instagram: "https://www.instagram.com/shreyank_2432/",
      linkedin:
        " https://www.linkedin.com/in/shreyank-pal-648b79260/",
    },

    {
      id: "m8",
      name: "Diksha Sagare",
      photo: "/assets/team/arjun.jpg",
      instagram:
        "https://www.instagram.com/diksha__1207/",
      linkedin:
        "https://www.linkedin.com/in/diksha-sagare-255775380",
    },

    {
      id: "m9",
      name: "Purva Patil",
      photo: "/assets/team/anushree.jpg",
      instagram: "https://www.instagram.com/purvaa05_/",
      linkedin:
        " https://www.linkedin.com/in/purva-patil-71b8113a1",
    },

    {
      id: "m10",
      name: "Poorva",
      photo: "/assets/team/harshal.jpg",
      instagram: "https://www.instagram.com/_poorvapatil_",
      linkedin:
        "https://www.linkedin.com/in/patilpoorva",
    },

    {
      id: "m11",
      name: "Sarthak Godbole",
      photo: "/assets/team/maitreya.jpg",
      instagram:
        "https://www.instagram.com/godbole_sarthak/",
      linkedin:
        "https://www.linkedin.com/in/sarthak-godbole-1b6206329/",
    },

    {
      id: "m12",
      name: "Manas Shewale",
      photo: "/assets/team/tanushree.jpg",
      instagram:
        "https://www.instagram.com/manasshewale_",
      linkedin:
        "https://www.linkedin.com/in/manasshewale15/",
    },

    {
      id: "m13",
      name: "Niranjan Iyer",
      photo: "/assets/team/tanushree.jpg",
      instagram:
        "https://www.instagram.com/niranjan_iyer_",
      linkedin:
        "https://www.linkedin.com/in/iyerniranjan",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">

      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/backgrounds/blurred-background.png')",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 z-0 bg-black/30" />

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}

      <main
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1600px]
          px-5
          pb-16
          pt-28
          sm:px-8
          lg:px-12
        "
      >

        {/* ========================================================
            PAGE TITLE
        ======================================================== */}

        <div className="mb-10 flex flex-col items-center sm:mb-12">

          <h1
            className="
              font-tungsten
              text-6xl
              uppercase
              tracking-wide
              text-transparent
              bg-gradient-to-r
              from-fuchsia-500
              via-pink-300
              to-white
              bg-clip-text
              drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]
              sm:text-7xl
              md:text-8xl
            "
          >
            WEB TEAM
          </h1>

          {/* Glowing underline */}

          <div
            className="
              mt-2
              h-[3px]
              w-12
              rounded-full
              bg-gradient-to-r
              from-fuchsia-500
              via-pink-300
              to-white
              shadow-[0_0_10px_#f472b6,0_0_20px_rgba(244,114,182,0.8)]
            "
          />

        </div>


        {/* ========================================================
            TEAM CARDS
        ======================================================== */}

        <section className="w-full">

          <div
            className="
              grid
              grid-cols-1
              justify-items-center
              gap-6
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-5
            "
          >

            {teamMembers.map((member) => (

              <article
                key={member.id}
                className="
                  group
                  relative
                  w-full
                  max-w-[290px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-pink-400/60
                  bg-[#170d25]/60
                  p-4
                  backdrop-blur-md

                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-pink-300
                  hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]
                "
              >

                {/* ==================================================
                    CARD INNER GLOW
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-2xl
                    bg-gradient-to-br
                    from-pink-500/10
                    via-transparent
                    to-purple-600/10
                  "
                />


                {/* ==================================================
                    MEMBER PHOTO
                ================================================== */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    border-fuchsia-400/40
                    bg-[#12091d]
                  "
                >

                  <img
                    src={member.photo}
                    alt={`Photo of ${member.name}`}
                    className="
                      aspect-[3/2]
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Photo dark gradient */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-fuchsia-950/50
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Neon bottom-right glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      right-0
                      h-10
                      w-16
                      bg-gradient-to-tl
                      from-pink-500/70
                      to-transparent
                      blur-md
                    "
                  />

                </div>


                {/* ==================================================
                    MEMBER NAME
                ================================================== */}

                <h3
                  className="
                    relative
                    mt-4
                    truncate
                    text-center
                    text-lg
                    font-semibold
                    tracking-wide
                    text-white
                    sm:text-xl
                  "
                >
                  {member.name}
                </h3>


                {/* ==================================================
                    MEMBER SOCIAL LINKS
                ================================================== */}

                <div
                  className="
                    relative
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-7
                  "
                >

                  {/* Instagram */}

                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} Instagram`}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      text-fuchsia-400
                      transition-all
                      duration-200
                      hover:scale-110
                      hover:text-pink-300
                      hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.9)]
                    "
                  >
                    <FaInstagram size={27} />
                  </a>


                  {/* LinkedIn */}

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      text-fuchsia-400
                      transition-all
                      duration-200
                      hover:scale-110
                      hover:text-pink-300
                      hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.9)]
                    "
                  >
                    <FaLinkedin size={27} />
                  </a>

                </div>


                {/* ==================================================
                    CARD CORNER GLOW
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    right-0
                    h-12
                    w-12
                    rounded-br-2xl
                    bg-gradient-to-tl
                    from-pink-500/40
                    to-transparent
                    blur-md
                  "
                />

              </article>

            ))}

          </div>

        </section>

      </main>


      {/* ============================================================
          FOOTER / CLUB SOCIAL LINKS
          
          IMPORTANT:
          These are the CLUB's Instagram + LinkedIn.
          They are NOT the individual team-member links.
      ============================================================ */}

      <footer
        className="
          relative
          z-10
          flex
          w-full
          items-end
          justify-between
          px-6
          pb-6
          sm:px-10
          sm:pb-8
          lg:px-12
        "
      >

        {/* Club Instagram + LinkedIn */}

        <SocialLinks />

        {/* Year */}

        <div
          className="
            flex
            items-center
            gap-3
            font-aldrich
            text-xs
            tracking-[0.25em]
            text-pink-300
            sm:text-sm
          "
        >
          <span
            className="
              h-[2px]
              w-10
              bg-gradient-to-r
              from-fuchsia-500
              to-pink-200
              shadow-[0_0_8px_rgba(236,72,153,0.8)]
            "
          />

          <span>2026</span>
        </div>

      </footer>

    </div>
  );
};