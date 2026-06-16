/* ============================================================
   ACTIVITIES / NEWS POSTS — Social Responsibility › Activities.
   Text is verbatim from najrancement.com; thumbnails downloaded
   to /public/images/activities. Order drives Previous/Next.
   ============================================================ */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
};

export const ACTIVITIES: Post[] = [
  {
    slug: "ceremony-honoring-creators",
    title: "Najran Cement Company participates in a ceremony honoring the creators",
    excerpt:
      "Najran Cement Company participates in a ceremony honoring creative students (creativity), convened by the Department of Education in Najran in the presence of Deputy Governor...",
    body: [
      "Najran Cement Company participates in a ceremony honoring creative students (creativity), convened by the Department of Education in Najran in the presence of Deputy Governor of Najran professor Abdullah bin Dulaim and Director General of Education in Najran, professor Nasser Al Manea.",
    ],
    image: "/images/activities/scorecard.jpg",
  },
  {
    slug: "balanced-scorecard",
    title: "Construction and development course of the Balanced Scorecard (BALANCED SCORECARD)",
    excerpt:
      "Najran Cement Company has implemented a training course entitled “build and develop the Balanced Scorecard” in the training room in the Administration Building was the...",
    body: [
      "Najran Cement Company has implemented a training course entitled “build and develop the Balanced Scorecard” in the training room in the Administration Building was the focus of this session on the dimensions of the Balanced Scorecard, a financial dimension, after the operation, after the customer and after learning and growth as well as strategic planning and formulation of objectives and indicators performance measurement, has participated in this session a number of departmental directors and heads of departments in the company.",
    ],
    image: "/images/activities/scorecard.jpg",
  },
  {
    slug: "students-faculty-engineering",
    title: "Students from the Faculty of Engineering on a visit to Najran Cement Company Factory",
    excerpt:
      "Today; Sunday 14 Muharram 1435 AH corresponding to November 17, 2013 AD Najran Cement Company has received students from the Faculty of Engineering at the...",
    body: [
      "Today; Sunday 14 Muharram 1435 AH corresponding to November 17, 2013 AD Najran Cement Company has received students from the Faculty of Engineering at the University of Najran in a tour visit to the factory, introducing to them the most important parts of a factory and explain the cement industry mechanism by specialists in the production and quality management, and were received by each of the technical advisor and director of the factory.",
    ],
    image: "/images/activities/students.jpg",
  },
  {
    slug: "skills-course-security",
    title: "Skills Course to Protection Personnel from Security Staff",
    excerpt:
      "Najran Cement Company has implemented a training course on the development of security personnel skills have participated in the program number (79), an employee of...",
    body: [
      "Najran Cement Company has implemented a training course on the development of security personnel skills have participated in the program number (79), an employee of the employees of the security at the plant management and the unity of the mills have session dealt with the most important skills necessary to the security men such as duties and responsibilities, public and private systems, security awareness, observation and memory skills, field observations and writing reports, tasks patrols, crisis intervention, methods of traffic and motor control, as well as the principles of safety.",
      "Session for three days were carried out in the factory Sultana from the date of 29.06.2013 to 07.01.2013 has also been implemented in the administration building for each of the employees of the security in the unit mills and management for a period of three days from the date 07/02/2013 to date 4/7/2013 and come such courses interests of the company on the development of human resources as the most valuable resources, the most important and creating supportive environment for learning and creativity continuous career development.",
    ],
    image: "/images/activities/skills.jpg",
  },
  {
    slug: "safety-civil-defense",
    title: "Training program on safety in cooperation with the Civil Defense Department",
    excerpt:
      "Najran Cement Company carried out in cooperation with the Civil Defense Department in Najran training program on safety, the program aims to familiarize the participants...",
    body: [
      "Najran Cement Company carried out in cooperation with the Civil Defense Department in Najran training program on safety, the program aims to familiarize the participants with Balvinyat and new techniques used in the means of safety and civil defense management as well as strengthening cooperation with civil defense unit in the Sultana. 45 Number of employees from all departments and divisions in the factory have benefited from the program. The program has focused on educating and training the participants on the use of safety at work and learn about all types of fire extinguishers and effective emergency response, as well as the prevention of fires and injuries in the workplace.",
    ],
    image: "/images/activities/safety.jpg",
  },
  {
    slug: "iftar-gathering",
    title: "Iftar Gathering",
    excerpt:
      "Najran Cement Company held the annual yearly Iftar ceremony for the year 1434 in the presence of his CEO-designate Professor Mahmoud Sabih, and the company...",
    body: [
      "Najran Cement Company held the annual yearly Iftar ceremony for the year 1434 in the presence of his CEO-designate Professor Mahmoud Sabih, and the company employees gathered to share the occasion together.",
    ],
    image: "/images/activities/iftar.jpg",
  },
  {
    slug: "annual-sports-tournament",
    title: "The activities of the annual sports tournament",
    excerpt:
      "Within Najran Cement sports and social company provided by the company to its employees year-round activities. The company has set up on Friday, January 4...",
    body: [
      "Within Najran Cement sports and social company provided by the company to its employees year-round activities. The company has set up on Friday, January 4 Final match in the second Basketball League season at the company's factory b Sultana. The league this year has participated in four teams is a company Ascent Najran first team and second team Najran Cement Company, the team and the team Nesma Chinese company. The team finished first league victory of Najran Cement Company first place team and the second Najran Cement Company in second place team and the Chinese company in third place. At the end of the match awards were distributed to all participating teams.",
    ],
    image: "/images/activities/sports.jpg",
  },
];

export function getPost(slug: string) {
  const index = ACTIVITIES.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return {
    post: ACTIVITIES[index],
    prev: index > 0 ? ACTIVITIES[index - 1] : null,
    next: index < ACTIVITIES.length - 1 ? ACTIVITIES[index + 1] : null,
  };
}
