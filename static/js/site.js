/* ============================================================
   Jennifer Calmelat — site.js
   i18n (EN/FR/ES) + interactions. No dependencies.
   ============================================================ */
(function () {
  "use strict";

  /* ======================= i18n ======================= */

  var I18N = {
    en: {
      title_tag: "Jennifer Calmelat — Investigation & Safeguarding Consultant",

      nav_services: "Services",
      nav_approach: "Approach",
      nav_about: "Why me",
      nav_experience: "Track record",
      nav_credentials: "Credentials",
      nav_contact: "Contact",
      nav_cta: "Book a strategic consultation",

      hero_eyebrow: "Investigations · Safeguarding · International Compliance",
      hero_title: "Shedding light on the facts.<br>Strengthening <em>integrity.</em>",
      hero_lead:
        "Combining 13+ years of global field experience with 6+ years of dedicated practice in sensitive and complex investigations (misconduct, fraud, PSEAH). I deliver the <strong>objective fact-finding and trauma-informed evidence</strong> that Boards and donors require for full operational certainty.",
      hero_cta1: "Secure your organization's integrity",
      hero_cta2: "How I can help",
      hero_badge_title: "CHS Alliance qualified investigator",
      hero_badge_sub: "Tier 1 · 2 · 3 — Certified",
      trust_label: "Organizations I've served",
      trust_others: "Universities & Hospitals",

      svc_eyebrow: "Services",
      svc_title: "How I can help <em>your organization</em>",
      svc_lede:
        "From a single sensitive investigation to a full safeguarding framework — engagements tailored to your context, remote or on site.",
      svc_1_title: "PSEAH & misconduct investigations",
      svc_1_desc:
        "Independent, trauma-informed investigations into sexual exploitation, abuse, harassment and behavioural misconduct — from intake to a report you can act on.",
      svc_1_tag1: "Risk mapping",
      svc_1_tag2: "Interviews",
      svc_1_tag3: "Investigation report",
      svc_2_title: "Fraud & corruption investigations",
      svc_2_desc:
        "Discreet fact-finding into fraud and corruption allegations: case intake, evidence analysis and clear findings that stand up to scrutiny — yours and your donors'.",
      svc_2_tag1: "Case management",
      svc_2_tag2: "Evidence analysis",
      svc_2_tag3: "Analytical reporting",
      svc_3_title: "Compliance & accountability frameworks",
      svc_3_desc:
        "Policies, advisory memos and whistleblowing mechanisms that strengthen organizational integrity and meet the expectations of boards and donors.",
      svc_3_tag1: "Policy drafting",
      svc_3_tag2: "Advisory memos",
      svc_3_tag3: "Whistleblowing mechanisms",
      svc_4_title: "Investigator mentoring & capacity building",
      svc_4_desc:
        "Knowledge-transfer programmes that upskill in-house teams in forensic interview techniques and SEAH case management — so they handle future crises with autonomy and less external dependency.",
      svc_4_tag1: "Forensic interviews",
      svc_4_tag2: "Case management",
      svc_4_tag3: "In-house teams",
      svc_5_title: "Internal policy & governance review",
      svc_5_desc:
        "A strategic audit of governance frameworks, codes of conduct and whistleblowing systems — so they withstand the scrutiny of the most rigorous donors and auditors.",
      svc_5_tag1: "Governance audit",
      svc_5_tag2: "Whistleblowing systems",
      svc_5_tag3: "Donor-ready",
      svc_6_title: "Project management for complex programmes",
      svc_6_desc:
        "End-to-end management of humanitarian and health projects: Prince 2 methodology, change management, risk matrices and stakeholder coordination.",
      svc_6_tag1: "Prince 2",
      svc_6_tag2: "Change management",
      svc_6_tag3: "Risk & governance",
      svc_note:
        "Every engagement is handled with strict confidentiality. Click a service to start the conversation.",

      apr_eyebrow: "Our approach",
      apr_title: "Fact-finding that is <em>rigorous and human</em>",
      apr_1_title: "Independence",
      apr_1_desc:
        "An objective, external lens that eliminates conflicts of interest and gives Boards unbiased, actionable findings.",
      apr_2_title: "Evidence-based rigour",
      apr_2_desc:
        "Analytical precision and field-tested investigative techniques, structured with Prince 2 case management.",
      apr_3_title: "Trauma-informed practice",
      apr_3_desc:
        "A secure environment that gathers high-quality testimony without re-victimisation — the human presence truthful disclosure requires.",
      apr_4_title: "Compliance & methodology",
      apr_4_desc:
        "Bridging the gap between ethical allegations and legal, forensic facts — aligned with CHS Alliance standards.",
      apr_note:
        "<strong>Confidentiality, first and always.</strong> A secure, confidential and legally sound process that protects both the people involved and the integrity of the mission.",

      about_caption: "Based in France · Working worldwide",
      about_eyebrow: "Why work with me",
      about_title: "Field-tested rigour, <em>human-centred</em> practice",
      about_p1:
        "I bring 13+ years of experience gained within leading international organizations — <strong>ICRC, MSF, UNFPA and UNICEF</strong> — with more than 6 years dedicated to independent investigations into misconduct, fraud and PSEAH.",
      about_p2:
        "A qualified investigator (CHS Alliance Tier 1, 2 & 3), Master of Law in Human Rights & Bioethics and Certified Fraud Examiner (ongoing), I combine the rigour of Prince 2 project management with a trauma-informed approach to fact-finding — across 21 countries and four continents.",
      stat_years: "Years of experience",
      stat_countries: "Countries",
      stat_orgs: "Organizations",
      stat_langs: "Working languages",
      lang_fr: "Français <small>Native</small>",
      lang_en: "English <small>Fluent</small>",
      lang_es: "Español <small>Fluent</small>",
      about_cv: "Download CV",

      xp_eyebrow: "Track record",
      xp_title: "Where this experience <em>was earned</em>",
      xp_lede:
        "A career built across the private sector, UN agencies, NGOs, local associations and hospitals — in headquarters and in the field.",
      xp_1_date: "Oct 2023 — Present",
      xp_1_role: "Investigation Consultant & Trainer",
      xp_1_org: "OSACO · UNICEF · MSF · Business schools & universities",
      xp_1_detail:
        "<ul><li>Investigations into behavioural misconduct, abuse and corruption: risk mapping, in-depth interviews, analytical reporting.</li><li>Deployed to Eswatini, Côte d'Ivoire, Ethiopia and Cameroon to support investigations and strengthen local capacity.</li><li>Remote investigations covering France, Singapore, Kenya, Tanzania, Rwanda, Yemen, Peru, The Gambia, Chad and DRC.</li><li>Training on investigative techniques and PSEAH information sessions.</li></ul>",
      xp_2_date: "Jul 2024 — May 2025",
      xp_2_role: "Investigation Consultant",
      xp_2_org: "UNFPA — Remote",
      xp_2_detail:
        "<ul><li>Intake and lead of investigations into PSEAH, fraud and corruption allegations.</li><li>Full case workflows: interviews, evidence analysis, report writing.</li><li>Advisory memos strengthening integrity, compliance and accountability.</li></ul>",
      xp_3_date: "Jul 2022 — May 2024",
      xp_3_role: "Project Management Officer — Strategy & Efficiency",
      xp_3_org: "University Hospital Saint-Pierre & Foundation — Brussels",
      xp_3_detail:
        "<ul><li>Transversal projects including Ukraine aid (field visit to Kyiv; coordination with Panzi Hospital — Dr. Denis Mukwege).</li><li>Development of new polyclinics and a mobile mental-health clinic.</li><li>Prince 2 methodology, change management, governance analyses, risk matrices, coaching and reporting.</li></ul>",
      xp_4_date: "Sep 2021 — Dec 2023",
      xp_4_role: "Behavioural Committee Member (GAREC)",
      xp_4_org: "Médecins Sans Frontières — Remote",
      xp_4_detail:
        "<ul><li>Member of the GAREC Behavioural Committee: contributed to drafting ethical policies.</li><li>Investigations into reported complaints and dissemination of the whistleblowing mechanism.</li><li>Contributed to designing training for an inclusive and safe workplace.</li></ul>",
      xp_5_date: "Jan 2021 — Jul 2022",
      xp_5_role: "Deputy Coordinator — Intercultural Mediation",
      xp_5_org: "BELRefugees — Brussels",
      xp_5_detail:
        "<ul><li>Strategy of the mediation department; supervision of 7 cultural mediators, ~35 arrivals dispatched daily.</li><li>Recruitment, training and induction of new team members.</li><li>Representation toward local police; hospital liaison for medical emergencies.</li></ul>",
      xp_6_date: "2019 — 2020",
      xp_6_role: "Protection Delegate",
      xp_6_org: "ICRC — Chocó, Colombia",
      xp_6_detail:
        "<ul><li>Protection activities and humanitarian dialogue with State and non-State armed groups.</li><li>Case management: missing persons, forensics, recruitment of minors, mine contamination, sexual violence, IHL violations.</li><li>Representation of ICRC toward mayors, human-rights defenders and local NGOs.</li></ul>",
      xp_7_date: "2017 — 2019",
      xp_7_role: "HR / Finance Manager",
      xp_7_org: "MSF — Pakistan, DRC, Sierra Leone",
      xp_7_detail:
        "<ul><li>HR and finance management across three country missions.</li><li>Case management for fraud and corruption.</li><li>Mass recruitment campaigns.</li></ul>",
      xp_8_date: "2013 — 2016",
      xp_8_role: "Treasury Coordinator / Business Developer",
      xp_8_org: "Nexans / Leyton Consulting — Brussels",
      xp_8_detail:
        "<ul><li>Cash management in SAP; lean management and continuous improvement projects.</li><li>Negotiation with CFOs and CEOs on R&D fiscal incentives — €850K revenue, 36 new clients.</li></ul>",

      cred_eyebrow: "Credentials",
      cred_title: "Qualified, certified, <em>and always evolving</em>",
      edu_heading: "Education",
      cert_heading: "Certifications & training",
      edu_1_degree: "Master of Specialization in Law",
      edu_1_field: "Human Rights — Bioethics, History, Philosophy, Sociology",
      edu_1_place: "Saint Louis University, Brussels, Belgium",
      edu_2_degree: "Master in Business & Administration",
      edu_2_field: "Business Management",
      edu_2_place: "Burgundy School of Business, Dijon, France",
      edu_3_degree: "Academic Exchange",
      edu_3_field: "International Studies",
      edu_3_place: "FU-JEN University, Taipei, Taiwan",
      edu_4_degree: "Bachelor in Sociology",
      edu_4_field: "Sociology of Organizations",
      edu_4_place: "Paris 12 University, France",
      cert_1_name: "Investigator Qualification Training Scheme — Tier 1 · 2 · 3",
      cert_2_name: "Certified Fraud Examiner (CFE)",
      cert_3_name: "Investigations Foundations",
      cert_3_date: "London — May 2025",
      cert_4_name: "PSEA, Global Safeguarding & Child Protection",
      cert_4_date: "July & November 2024",
      cert_5_name: "Fraud & Corruption Awareness and Prevention",
      cert_5_date: "July 2024",
      cert_6_name: "BSAFE Security Training",
      cert_6_date: "July 2024",
      cert_certified: "Certified",
      cert_ongoing: "Ongoing",

      ct_eyebrow: "Contact",
      ct_title: "Let's discuss <em>how I can help.</em>",
      ct_lede:
        "Whether it's allegations of a breach of your internal code of conduct, training your in-house investigators or a review of your processes — the first conversation is free and confidential.",
      ct_email: "Email",
      ct_phone: "Phone / WhatsApp",
      ct_location: "Location",
      ct_location_val: "France — available worldwide",
      ct_form_title: "Request a confidential consultation",
      ct_form_sub: "I usually reply within 48 hours.",
      ct_f_name: "Name",
      ct_f_name_ph: "Your name",
      ct_f_email: "Email",
      ct_f_email_ph: "you@organization.org",
      ct_f_subject: "Subject",
      ct_f_subject_ph: "e.g. PSEAH investigation support",
      ct_f_message: "Message",
      ct_f_message_ph:
        "Briefly describe your situation or needs — no confidential details needed at this stage.",
      ct_f_send: "Send message",
      ct_f_privacy: "Your message is sent securely and treated as confidential.",
      ct_msg_sending: "Sending…",
      ct_msg_ok:
        "Thank you — your message has been sent. I'll get back to you within 48 hours.",
      ct_msg_err:
        "Something went wrong. Please email me directly at j.calmelat@gmail.com.",
      ct_subject_prefix: "Enquiry: ",

      fp_eyebrow: "Global footprint",
      fp_title: "Wherever you operate, <em>I can be there.</em>",
      fp_lede:
        "21 countries across four continents — on-site deployments and remote investigations, in three languages.",
      fp_leg_field: "On-site missions",
      fp_leg_remote: "Remote investigations",

      footer_tagline: "Investigations · Safeguarding · International Compliance",
      footer_rights: "© {year} Jennifer Calmelat. All rights reserved.",
    },

    fr: {
      title_tag: "Jennifer Calmelat — Consultante en enquêtes & safeguarding",

      nav_services: "Services",
      nav_approach: "Approche",
      nav_about: "À propos",
      nav_experience: "Parcours",
      nav_credentials: "Références",
      nav_contact: "Contact",
      nav_cta: "Réserver une consultation stratégique",

      hero_eyebrow: "Enquêtes · Safeguarding · Conformité internationale",
      hero_title: "Faire la lumière sur les faits.<br>Renforcer <em>l'intégrité.</em>",
      hero_lead:
        "Riche de 13 ans d'expérience de terrain au sein du secteur international et de la santé, je me spécialise depuis plus de 6 ans dans la conduite d'enquêtes complexes et sensibles (harcèlement moral, harcèlement sexuel, fraude). J'apporte la <strong>rigueur analytique</strong> qui transforme des situations complexes en faits établis, au service d'une gouvernance solide et durable.",
      hero_cta1: "Sécurisez l'intégrité de votre organisation",
      hero_cta2: "Comment je peux aider",
      hero_badge_title: "Enquêtrice qualifiée CHS Alliance",
      hero_badge_sub: "Niveaux 1 · 2 · 3 — Certifiée",
      trust_label: "Ils m'ont fait confiance",
      trust_others: "Universités & hôpitaux",

      svc_eyebrow: "Services",
      svc_title: "Comment je peux aider <em>votre organisation</em>",
      svc_lede:
        "D'une enquête sensible ponctuelle à un dispositif complet de safeguarding — des missions adaptées à votre contexte, à distance ou sur le terrain.",
      svc_1_title: "Enquêtes sur le harcèlement & les manquements au code de conduite",
      svc_1_desc:
        "Enquêtes indépendantes, menées avec une approche sensible au trauma, portant sur le harcèlement moral et sexuel, les abus et les manquements au code de conduite — de la saisine à un rapport exploitable.",
      svc_1_tag1: "Cartographie des risques",
      svc_1_tag2: "Entretiens",
      svc_1_tag3: "Rapport d'enquête",
      svc_2_title: "Enquêtes fraude & corruption",
      svc_2_desc:
        "Établissement discret des faits en cas d'allégations de fraude ou de corruption : saisine, analyse des preuves et conclusions solides — pour vous comme pour vos bailleurs.",
      svc_2_tag1: "Gestion des dossiers",
      svc_2_tag2: "Analyse des preuves",
      svc_2_tag3: "Rapports analytiques",
      svc_3_title: "Conformité & cadres de redevabilité",
      svc_3_desc:
        "Politiques, notes de conseil et mécanismes d'alerte qui renforcent l'intégrité de votre organisation et répondent aux attentes des conseils d'administration et des bailleurs.",
      svc_3_tag1: "Rédaction de politiques",
      svc_3_tag2: "Notes de conseil",
      svc_3_tag3: "Mécanismes d'alerte",
      svc_4_title: "Mentorat & renforcement des capacités",
      svc_4_desc:
        "Programmes de transfert de connaissances qui professionnalisent les équipes internes aux techniques d'entretien forensique et à la gestion des cas de SEAH — pour gérer les crises futures en autonomie et réduire la dépendance externe.",
      svc_4_tag1: "Entretiens forensiques",
      svc_4_tag2: "Gestion des dossiers",
      svc_4_tag3: "Équipes internes",
      svc_5_title: "Audit de politiques & gouvernance",
      svc_5_desc:
        "Un audit stratégique des cadres de gouvernance, codes de conduite et mécanismes d'alerte — pour qu'ils répondent aux exigences de conformité de vos bailleurs et partenaires.",
      svc_5_tag1: "Audit de gouvernance",
      svc_5_tag2: "Mécanismes d'alerte",
      svc_5_tag3: "Prêt pour les bailleurs",
      svc_6_title: "Gestion de projets complexes",
      svc_6_desc:
        "Pilotage de bout en bout de projets humanitaires et de santé : méthodologie Prince 2, conduite du changement, matrices de risques et coordination des parties prenantes.",
      svc_6_tag1: "Prince 2",
      svc_6_tag2: "Conduite du changement",
      svc_6_tag3: "Risques & gouvernance",
      svc_note:
        "Chaque mission est traitée dans la plus stricte confidentialité. Cliquez sur un service pour démarrer la conversation.",

      apr_eyebrow: "Notre approche",
      apr_title: "Une recherche de faits <em>rigoureuse et humaine</em>",
      apr_1_title: "Neutralité & indépendance",
      apr_1_desc:
        "Une perspective externe et objective qui élimine les conflits d'intérêts et garantit la validité du rapport.",
      apr_2_title: "Rigueur analytique",
      apr_2_desc:
        "Précision analytique et techniques éprouvées, structurées par la méthodologie Prince 2 pour une gestion de cas irréprochable.",
      apr_3_title: "Approche sensible au trauma",
      apr_3_desc:
        "Un environnement sécurisé pour recueillir des informations de haute qualité sans revictimisation.",
      apr_4_title: "Conformité & méthodologie",
      apr_4_desc:
        "Un alignement avec les normes de la CHS Alliance, qui relie les allégations éthiques aux faits juridiques et forensiques.",
      apr_note:
        "<strong>La confidentialité, d'abord et toujours.</strong> Un processus sécurisé, confidentiel et juridiquement solide qui protège à la fois les personnes et l'intégrité de la mission.",

      about_caption: "Basée en France · Missions dans le monde entier",
      about_eyebrow: "Raisons de travailler avec moi",
      about_title: "La rigueur du terrain, <em>une pratique centrée sur l'humain</em>",
      about_p1:
        "Je réunis plus de 13 ans d'expérience acquise au sein d'organisations internationales de premier plan — <strong>CICR, MSF, UNFPA et UNICEF</strong> — dont plus de 6 ans consacrés aux enquêtes indépendantes sur le harcèlement, la fraude et les manquements au code de conduite.",
      about_p2:
        "Enquêtrice qualifiée (CHS Alliance Niveaux 1, 2 & 3), titulaire d'un Master en droit (Droits de l'Homme & Bioéthique) et Certified Fraud Examiner (en cours), j'allie la rigueur de la méthodologie Prince 2 à une approche sensible au trauma pour établir les faits — dans 21 pays sur quatre continents.",
      stat_years: "Ans d'expérience",
      stat_countries: "Pays",
      stat_orgs: "Organisations",
      stat_langs: "Langues de travail",
      lang_fr: "Français <small>Langue maternelle</small>",
      lang_en: "Anglais <small>Courant</small>",
      lang_es: "Espagnol <small>Courant</small>",
      about_cv: "Télécharger le CV",

      xp_eyebrow: "Parcours",
      xp_title: "Là où cette expérience <em>a été forgée</em>",
      xp_lede:
        "Une carrière construite entre le secteur privé, les agences onusiennes, les ONG, les associations locales et les hôpitaux — au siège comme sur le terrain.",
      xp_1_date: "Oct. 2023 — Aujourd'hui",
      xp_1_role: "Consultante en enquêtes & formatrice",
      xp_1_org: "OSACO · UNICEF · MSF · Écoles de commerce & universités",
      xp_1_detail:
        "<ul><li>Enquêtes sur les manquements au code de conduite, les abus et la corruption : cartographie des risques, entretiens approfondis, rapports analytiques.</li><li>Déploiements en Eswatini, Côte d'Ivoire, Éthiopie et Cameroun pour appuyer les enquêtes et renforcer les capacités locales.</li><li>Enquêtes à distance : France, Singapour, Kenya, Tanzanie, Rwanda, Yémen, Pérou, Gambie, Tchad et RDC.</li><li>Formations aux techniques d'enquête et sessions d'information sur la prévention du harcèlement et des abus.</li></ul>",
      xp_2_date: "Juil. 2024 — Mai 2025",
      xp_2_role: "Consultante en enquêtes",
      xp_2_org: "UNFPA — À distance",
      xp_2_detail:
        "<ul><li>Saisine et conduite d'enquêtes sur des allégations de harcèlement, fraude et corruption.</li><li>Gestion complète des dossiers : entretiens, analyse des preuves, rédaction de rapports.</li><li>Notes de conseil renforçant l'intégrité, la conformité et la redevabilité.</li></ul>",
      xp_3_date: "Juil. 2022 — Mai 2024",
      xp_3_role: "Cheffe de projets — Stratégie & efficience",
      xp_3_org: "CHU Saint-Pierre & Fondation Saint-Pierre — Bruxelles",
      xp_3_detail:
        "<ul><li>Projets transversaux dont l'aide à l'Ukraine (visite de terrain à Kyiv ; coordination avec l'hôpital de Panzi — Dr Denis Mukwege).</li><li>Développement de nouvelles polycliniques et d'une clinique mobile de santé mentale.</li><li>Méthodologie Prince 2, conduite du changement, analyses de gouvernance, matrices de risques, coaching et reporting.</li></ul>",
      xp_4_date: "Sept. 2021 — Déc. 2023",
      xp_4_role: "Membre du comité comportemental (GAREC)",
      xp_4_org: "Médecins Sans Frontières — À distance",
      xp_4_detail:
        "<ul><li>Membre du comité comportemental GAREC : participation à la rédaction de politiques éthiques.</li><li>Enquêtes sur les plaintes signalées et diffusion du mécanisme d'alerte.</li><li>Participation à la conception de formations pour un environnement de travail inclusif et sûr.</li></ul>",
      xp_5_date: "Janv. 2021 — Juil. 2022",
      xp_5_role: "Coordinatrice adjointe — Médiation interculturelle",
      xp_5_org: "BELRefugees — Bruxelles",
      xp_5_detail:
        "<ul><li>Stratégie du département de médiation ; supervision de 7 médiateurs culturels, ~35 arrivées orientées par jour.</li><li>Recrutement, formation et intégration des nouvelles recrues.</li><li>Représentation auprès de la police locale ; liaison hospitalière pour les urgences médicales.</li></ul>",
      xp_6_date: "2019 — 2020",
      xp_6_role: "Déléguée Protection",
      xp_6_org: "CICR — Chocó, Colombie",
      xp_6_detail:
        "<ul><li>Activités de protection et dialogue humanitaire avec des groupes armés étatiques et non étatiques.</li><li>Gestion de dossiers : personnes disparues, médecine légale, recrutement de mineurs, contamination par mines, violences sexuelles, violations du DIH.</li><li>Représentation du CICR auprès des maires, défenseurs des droits humains et ONG locales.</li></ul>",
      xp_7_date: "2017 — 2019",
      xp_7_role: "Responsable RH / Finance",
      xp_7_org: "MSF — Pakistan, RDC, Sierra Leone",
      xp_7_detail:
        "<ul><li>Gestion RH et financière sur trois missions pays.</li><li>Gestion de dossiers de fraude et de corruption.</li><li>Campagnes de recrutement massif.</li></ul>",
      xp_8_date: "2013 — 2016",
      xp_8_role: "Coordinatrice trésorerie / Business developer",
      xp_8_org: "Nexans / Leyton Consulting — Bruxelles",
      xp_8_detail:
        "<ul><li>Gestion de trésorerie sous SAP ; projets de lean management et d'amélioration continue.</li><li>Négociation avec des DAF et PDG sur les incitations fiscales R&D — 850 K€ de revenus, 36 nouveaux clients.</li></ul>",

      cred_eyebrow: "Références",
      cred_title: "Qualifiée, certifiée, <em>en évolution permanente</em>",
      edu_heading: "Formation",
      cert_heading: "Certifications & formations",
      edu_1_degree: "Master de spécialisation en droit",
      edu_1_field: "Droits humains — bioéthique, histoire, philosophie, sociologie",
      edu_1_place: "Université Saint-Louis, Bruxelles, Belgique",
      edu_2_degree: "Master en management",
      edu_2_field: "Business administration",
      edu_2_place: "Burgundy School of Business, Dijon, France",
      edu_3_degree: "Échange académique",
      edu_3_field: "Études internationales",
      edu_3_place: "Université FU-JEN, Taipei, Taïwan",
      edu_4_degree: "Licence de sociologie",
      edu_4_field: "Sociologie des organisations",
      edu_4_place: "Université Paris 12, France",
      cert_1_name: "Investigator Qualification Training Scheme — Niveaux 1 · 2 · 3",
      cert_2_name: "Certified Fraud Examiner (CFE)",
      cert_3_name: "Fondamentaux des enquêtes",
      cert_3_date: "Londres — mai 2025",
      cert_4_name: "PSEA, safeguarding global & protection de l'enfance",
      cert_4_date: "Juillet & novembre 2024",
      cert_5_name: "Sensibilisation et prévention fraude & corruption",
      cert_5_date: "Juillet 2024",
      cert_6_name: "Formation sécurité BSAFE",
      cert_6_date: "Juillet 2024",
      cert_certified: "Certifiée",
      cert_ongoing: "En cours",

      ct_eyebrow: "Contact",
      ct_title: "Parlons de <em>la façon dont je peux aider.</em>",
      ct_lede:
        "Qu'il s'agisse d'allégations de non-respect de votre code de conduite interne, de la formation de vos enquêteurs internes ou de la revue de vos processus — le premier échange est gratuit et confidentiel.",
      ct_email: "Email",
      ct_phone: "Téléphone / WhatsApp",
      ct_location: "Localisation",
      ct_location_val: "France — disponible dans le monde entier",
      ct_form_title: "Demander une consultation confidentielle",
      ct_form_sub: "Je réponds généralement sous 48 heures.",
      ct_f_name: "Nom",
      ct_f_name_ph: "Votre nom",
      ct_f_email: "Email",
      ct_f_email_ph: "vous@organisation.org",
      ct_f_subject: "Objet",
      ct_f_subject_ph: "ex. Appui à une enquête interne",
      ct_f_message: "Message",
      ct_f_message_ph:
        "Décrivez brièvement votre situation ou vos besoins — aucun détail confidentiel à ce stade.",
      ct_f_send: "Envoyer le message",
      ct_f_privacy:
        "Votre message est transmis de manière sécurisée et traité confidentiellement.",
      ct_msg_sending: "Envoi en cours…",
      ct_msg_ok:
        "Merci — votre message a bien été envoyé. Je reviens vers vous sous 48 heures.",
      ct_msg_err:
        "Une erreur est survenue. Écrivez-moi directement à j.calmelat@gmail.com.",
      ct_subject_prefix: "Demande : ",

      fp_eyebrow: "Empreinte mondiale",
      fp_title: "Où que vous opériez, <em>je peux intervenir.</em>",
      fp_lede:
        "21 pays sur quatre continents — déploiements sur le terrain et enquêtes à distance, en trois langues.",
      fp_leg_field: "Missions sur le terrain",
      fp_leg_remote: "Enquêtes à distance",

      footer_tagline: "Enquêtes · Safeguarding · Conformité internationale",
      footer_rights: "© {year} Jennifer Calmelat. Tous droits réservés.",
    },

    es: {
      title_tag: "Jennifer Calmelat — Consultora en investigaciones y salvaguarda",

      nav_services: "Servicios",
      nav_approach: "Enfoque",
      nav_about: "Sobre mí",
      nav_experience: "Trayectoria",
      nav_credentials: "Credenciales",
      nav_contact: "Contacto",
      nav_cta: "Agenda una consulta estratégica",

      hero_eyebrow: "Investigaciones · Salvaguarda · Cumplimiento Internacional",
      hero_title: "Esclarecer los hechos.<br>Fortalecer <em>la integridad.</em>",
      hero_lead:
        "Respaldada por 13 años de experiencia en el terreno global, me especializo desde hace más de 6 años en investigaciones complejas y sensibles (conductas indebidas, fraude, PSEAH). <strong>Rigor analítico y enfoque sensible al trauma</strong> para transformar la ambigüedad en hechos probados.",
      hero_cta1: "Asegure la integridad de su organización",
      hero_cta2: "Cómo puedo ayudarte",
      hero_badge_title: "Investigadora cualificada por CHS Alliance",
      hero_badge_sub: "Niveles 1 · 2 · 3 — Certificada",
      trust_label: "Organizaciones que han confiado en mí",
      trust_others: "Universidades y hospitales",

      svc_eyebrow: "Servicios",
      svc_title: "Cómo puedo ayudar a <em>tu organización</em>",
      svc_lede:
        "Desde una investigación sensible puntual hasta un marco completo de salvaguarda — misiones adaptadas a tu contexto, en remoto o sobre el terreno.",
      svc_1_title: "Investigaciones PSEAH y conductas indebidas",
      svc_1_desc:
        "Investigaciones independientes y sensibles al trauma sobre explotación, abuso y acoso sexual y conductas indebidas — desde la recepción del caso hasta un informe accionable.",
      svc_1_tag1: "Mapeo de riesgos",
      svc_1_tag2: "Entrevistas",
      svc_1_tag3: "Informe de investigación",
      svc_2_title: "Investigaciones de fraude y corrupción",
      svc_2_desc:
        "Esclarecimiento discreto de alegaciones de fraude y corrupción: recepción del caso, análisis de pruebas y conclusiones sólidas — ante tu organización y tus donantes.",
      svc_2_tag1: "Gestión de casos",
      svc_2_tag2: "Análisis de pruebas",
      svc_2_tag3: "Informes analíticos",
      svc_3_title: "Cumplimiento y marcos de rendición de cuentas",
      svc_3_desc:
        "Políticas, notas de asesoría y mecanismos de denuncia que fortalecen la integridad de tu organización y responden a las expectativas de juntas directivas y donantes.",
      svc_3_tag1: "Redacción de políticas",
      svc_3_tag2: "Notas de asesoría",
      svc_3_tag3: "Mecanismos de denuncia",
      svc_4_title: "Mentoría y capacitación de investigadores",
      svc_4_desc:
        "Programas de transferencia de conocimiento que profesionalizan a los equipos internos en técnicas de entrevista forense y gestión de casos de SEAH — para gestionar crisis futuras con autonomía y reducir la dependencia externa.",
      svc_4_tag1: "Entrevista forense",
      svc_4_tag2: "Gestión de casos",
      svc_4_tag3: "Equipos internos",
      svc_5_title: "Auditoría de políticas y gobernanza",
      svc_5_desc:
        "Una auditoría estratégica de marcos de gobernanza, códigos de conducta y mecanismos de denuncia — para que resistan el escrutinio de los donantes y auditores más rigurosos.",
      svc_5_tag1: "Auditoría de gobernanza",
      svc_5_tag2: "Mecanismos de denuncia",
      svc_5_tag3: "Listo para donantes",
      svc_6_title: "Gestión de proyectos complejos",
      svc_6_desc:
        "Gestión integral de proyectos humanitarios y de salud: metodología Prince 2, gestión del cambio, matrices de riesgo y coordinación de actores.",
      svc_6_tag1: "Prince 2",
      svc_6_tag2: "Gestión del cambio",
      svc_6_tag3: "Riesgos y gobernanza",
      svc_note:
        "Cada misión se trata con estricta confidencialidad. Haz clic en un servicio para iniciar la conversación.",

      apr_eyebrow: "Nuestro enfoque",
      apr_title: "Una búsqueda de los hechos <em>rigurosa y humana</em>",
      apr_1_title: "Objetividad e independencia",
      apr_1_desc:
        "Una visión externa y objetiva que elimina los conflictos de interés y aporta a la junta conclusiones imparciales y accionables.",
      apr_2_title: "Rigor analítico",
      apr_2_desc:
        "Precisión analítica y técnicas de investigación probadas, estructuradas con la metodología Prince 2.",
      apr_3_title: "Sensibilidad al trauma",
      apr_3_desc:
        "Un entorno seguro para recoger testimonios de alta calidad sin revictimización, centrado en el bienestar de la persona.",
      apr_4_title: "Conformidad y metodología",
      apr_4_desc:
        "Establece hechos verificables que conectan las alegaciones éticas con los hechos jurídicos y forenses, alineados con la CHS Alliance.",
      apr_note:
        "<strong>Confidencialidad, primero y siempre.</strong> Un proceso seguro, confidencial y jurídicamente sólido que protege tanto a las personas como la integridad de la misión.",

      about_caption: "Con base en Francia · Trabajo en todo el mundo",
      about_eyebrow: "Razones para trabajar conmigo",
      about_title: "Rigor probado en terreno, <em>práctica centrada en las personas</em>",
      about_p1:
        "Reúno más de 13 años de experiencia adquirida en organizaciones internacionales — <strong>CICR, MSF, UNFPA y UNICEF</strong> — con más de 6 años dedicados a investigaciones independientes sobre conductas indebidas, fraude y PSEAH.",
      about_p2:
        "Investigadora cualificada (CHS Alliance Niveles 1, 2 y 3), Máster en Derecho (Derechos Humanos y Bioética) y Certified Fraud Examiner (en curso), combino el rigor de la metodología Prince 2 con un enfoque sensible al trauma para esclarecer los hechos — en 21 países y cuatro continentes.",
      stat_years: "Años de experiencia",
      stat_countries: "Países",
      stat_orgs: "Organizaciones",
      stat_langs: "Idiomas de trabajo",
      lang_fr: "Francés <small>Nativo</small>",
      lang_en: "Inglés <small>Fluido</small>",
      lang_es: "Español <small>Fluido</small>",
      about_cv: "Descargar CV",

      xp_eyebrow: "Trayectoria",
      xp_title: "Dónde se forjó <em>esta experiencia</em>",
      xp_lede:
        "Una carrera construida entre el sector privado, las agencias de la ONU, las ONG, las asociaciones locales y los hospitales — en sede y en terreno.",
      xp_1_date: "Oct. 2023 — Actualidad",
      xp_1_role: "Consultora en investigaciones y formadora",
      xp_1_org: "OSACO · UNICEF · MSF · Escuelas de negocios y universidades",
      xp_1_detail:
        "<ul><li>Investigaciones sobre conductas indebidas, abusos y corrupción: mapeo de riesgos, entrevistas en profundidad, informes analíticos.</li><li>Despliegues en Esuatini, Costa de Marfil, Etiopía y Camerún para apoyar investigaciones y fortalecer la capacidad local.</li><li>Investigaciones en remoto: Francia, Singapur, Kenia, Tanzania, Ruanda, Yemen, Perú, Gambia, Chad y RDC.</li><li>Formación en técnicas de investigación y sesiones informativas sobre PSEAH.</li></ul>",
      xp_2_date: "Jul. 2024 — May. 2025",
      xp_2_role: "Consultora en investigaciones",
      xp_2_org: "UNFPA — Remoto",
      xp_2_detail:
        "<ul><li>Recepción y dirección de investigaciones sobre alegaciones de PSEAH, fraude y corrupción.</li><li>Gestión completa de casos: entrevistas, análisis de pruebas, redacción de informes.</li><li>Notas de asesoría para fortalecer la integridad, el cumplimiento y la rendición de cuentas.</li></ul>",
      xp_3_date: "Jul. 2022 — May. 2024",
      xp_3_role: "Responsable de proyectos — Estrategia y eficiencia",
      xp_3_org: "Hospital Universitario Saint-Pierre y Fundación — Bruselas",
      xp_3_detail:
        "<ul><li>Proyectos transversales, incluida la ayuda a Ucrania (visita de terreno a Kiev; coordinación con el Hospital de Panzi — Dr. Denis Mukwege).</li><li>Desarrollo de nuevas policlínicas y de una clínica móvil de salud mental.</li><li>Metodología Prince 2, gestión del cambio, análisis de gobernanza, matrices de riesgo, coaching y reporting.</li></ul>",
      xp_4_date: "Sep. 2021 — Dic. 2023",
      xp_4_role: "Miembro del Comité de Conducta (GAREC)",
      xp_4_org: "Médicos Sin Fronteras — Remoto",
      xp_4_detail:
        "<ul><li>Miembro del Comité de Conducta (GAREC): participación en la redacción de políticas éticas.</li><li>Investigación de las quejas recibidas y difusión del mecanismo de denuncia.</li><li>Participación en el diseño de formaciones para un entorno de trabajo inclusivo y seguro.</li></ul>",
      xp_5_date: "Ene. 2021 — Jul. 2022",
      xp_5_role: "Coordinadora adjunta — Mediación intercultural",
      xp_5_org: "BELRefugees — Bruselas",
      xp_5_detail:
        "<ul><li>Estrategia del departamento de mediación; supervisión de 7 mediadores culturales, ~35 llegadas gestionadas al día.</li><li>Selección, formación e incorporación de nuevos miembros del equipo.</li><li>Representación ante la policía local; enlace hospitalario para emergencias médicas.</li></ul>",
      xp_6_date: "2019 — 2020",
      xp_6_role: "Delegada de Protección",
      xp_6_org: "CICR — Chocó, Colombia",
      xp_6_detail:
        "<ul><li>Actividades de protección y diálogo humanitario con grupos armados estatales y no estatales.</li><li>Gestión de casos: personas desaparecidas, forense, reclutamiento de menores, contaminación por minas, violencia sexual, violaciones del DIH.</li><li>Representación del CICR ante alcaldías, defensores de derechos humanos y ONG locales.</li></ul>",
      xp_7_date: "2017 — 2019",
      xp_7_role: "Responsable de RR. HH. / Finanzas",
      xp_7_org: "MSF — Pakistán, RDC, Sierra Leona",
      xp_7_detail:
        "<ul><li>Gestión de RR. HH. y finanzas en tres misiones país.</li><li>Gestión de casos de fraude y corrupción.</li><li>Campañas de selección masiva de personal.</li></ul>",
      xp_8_date: "2013 — 2016",
      xp_8_role: "Coordinadora de tesorería / Business developer",
      xp_8_org: "Nexans / Leyton Consulting — Bruselas",
      xp_8_detail:
        "<ul><li>Gestión de tesorería en SAP; proyectos de lean management y mejora continua.</li><li>Negociación con CFO y CEO sobre incentivos fiscales de I+D — 850 K€ de ingresos, 36 nuevos clientes.</li></ul>",

      cred_eyebrow: "Credenciales",
      cred_title: "Cualificada, certificada <em>y en constante evolución</em>",
      edu_heading: "Formación",
      cert_heading: "Certificaciones y cursos",
      edu_1_degree: "Máster de especialización en Derecho",
      edu_1_field: "Derechos humanos — bioética, historia, filosofía, sociología",
      edu_1_place: "Universidad Saint-Louis, Bruselas, Bélgica",
      edu_2_degree: "Máster en Administración de Empresas",
      edu_2_field: "Gestión empresarial",
      edu_2_place: "Burgundy School of Business, Dijon, Francia",
      edu_3_degree: "Intercambio académico",
      edu_3_field: "Estudios internacionales",
      edu_3_place: "Universidad FU-JEN, Taipéi, Taiwán",
      edu_4_degree: "Grado en Sociología",
      edu_4_field: "Sociología de las organizaciones",
      edu_4_place: "Universidad París 12, Francia",
      cert_1_name: "Investigator Qualification Training Scheme — Niveles 1 · 2 · 3",
      cert_2_name: "Certified Fraud Examiner (CFE)",
      cert_3_name: "Fundamentos de investigaciones",
      cert_3_date: "Londres — mayo 2025",
      cert_4_name: "PSEA, salvaguarda global y protección de la infancia",
      cert_4_date: "Julio y noviembre 2024",
      cert_5_name: "Concienciación y prevención de fraude y corrupción",
      cert_5_date: "Julio 2024",
      cert_6_name: "Formación de seguridad BSAFE",
      cert_6_date: "Julio 2024",
      cert_certified: "Certificada",
      cert_ongoing: "En curso",

      ct_eyebrow: "Contacto",
      ct_title: "Hablemos de <em>cómo puedo ayudarte.</em>",
      ct_lede:
        "Ya se trate de alegaciones de incumplimiento de tu código de conducta interno, de la formación de tus investigadores internos o de la revisión de tus procesos — la primera conversación es gratuita y confidencial.",
      ct_email: "Email",
      ct_phone: "Teléfono / WhatsApp",
      ct_location: "Ubicación",
      ct_location_val: "Francia — disponible en todo el mundo",
      ct_form_title: "Solicita una consulta confidencial",
      ct_form_sub: "Suelo responder en un plazo de 48 horas.",
      ct_f_name: "Nombre",
      ct_f_name_ph: "Tu nombre",
      ct_f_email: "Email",
      ct_f_email_ph: "tu@organizacion.org",
      ct_f_subject: "Asunto",
      ct_f_subject_ph: "p. ej. Apoyo en investigación PSEAH",
      ct_f_message: "Mensaje",
      ct_f_message_ph:
        "Describe brevemente tu situación o necesidades — sin detalles confidenciales en esta etapa.",
      ct_f_send: "Enviar mensaje",
      ct_f_privacy:
        "Tu mensaje se envía de forma segura y se trata con confidencialidad.",
      ct_msg_sending: "Enviando…",
      ct_msg_ok:
        "Gracias — tu mensaje se ha enviado correctamente. Te responderé en un plazo de 48 horas.",
      ct_msg_err:
        "Algo salió mal. Escríbeme directamente a j.calmelat@gmail.com.",
      ct_subject_prefix: "Consulta: ",

      fp_eyebrow: "Presencia mundial",
      fp_title: "Donde sea que operes, <em>puedo estar.</em>",
      fp_lede:
        "21 países en cuatro continentes — despliegues en terreno e investigaciones en remoto, en tres idiomas.",
      fp_leg_field: "Misiones en terreno",
      fp_leg_remote: "Investigaciones en remoto",

      footer_tagline: "Investigaciones · Salvaguarda · Cumplimiento Internacional",
      footer_rights: "© {year} Jennifer Calmelat. Todos los derechos reservados.",
    },
  };

  var LANG_KEY = "jc_lang";
  var currentLang = "en";

  function detectLang() {
    var saved = null;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch (e) {}
    if (saved && I18N[saved]) return saved;
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return I18N[nav] ? nav : "en";
  }

  function t(key) {
    var dict = I18N[currentLang] || I18N.en;
    var val = dict[key] != null ? dict[key] : I18N.en[key];
    if (val == null) return null;
    return val.replace("{year}", String(new Date().getFullYear()));
  }

  function applyLang(lang) {
    if (!I18N[lang]) lang = "en";
    currentLang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}

    document.documentElement.lang = lang;
    document.title = t("title_tag");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n");
      var mode = "text";
      var key = spec;
      var m = spec.match(/^\[(\w+)\](.+)$/);
      if (m) {
        mode = m[1];
        key = m[2];
      }
      var val = t(key);
      if (val == null) return;
      if (mode === "html") el.innerHTML = val;
      else if (mode === "placeholder") el.setAttribute("placeholder", val);
      else el.textContent = val;
    });

    document.querySelectorAll("[data-setlang]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-setlang") === lang);
    });

    document.dispatchEvent(new CustomEvent("jc:lang", { detail: lang }));
  }

  document.querySelectorAll("[data-setlang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-setlang"));
    });
  });

  /* ======================= Header ======================= */

  var header = document.getElementById("siteHeader");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY || 0;
    header.classList.toggle("scrolled", y > 10);
    toTop.classList.toggle("show", y > 900);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ======================= Mobile menu ======================= */

  var burger = document.getElementById("navBurger");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-locked");
    burger.setAttribute("aria-expanded", "false");
  }

  burger.addEventListener("click", function () {
    var open = !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", open);
    document.body.classList.toggle("menu-locked", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  mobileMenu.querySelectorAll("a[href^='#']").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ======================= Reveal on scroll ======================= */

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".rv").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ======================= Counters ======================= */

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var dur = 1300;
    var start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var countObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach(function (el) {
    countObserver.observe(el);
  });

  /* ======================= Service rows → contact ======================= */

  function goToContactWithSubject(row) {
    var title = row.querySelector("h3");
    var subject = document.getElementById("cf-subject");
    if (title && subject) {
      subject.value = (t("ct_subject_prefix") || "") + title.textContent.trim();
    }
    var contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
  }

  document.querySelectorAll(".service-row").forEach(function (row) {
    row.addEventListener("click", function () {
      goToContactWithSubject(row);
    });
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goToContactWithSubject(row);
      }
    });
  });

  /* ======================= Contact form ======================= */

  var form = document.getElementById("contactForm");
  var formMsg = document.getElementById("formMsg");
  var formSubmit = document.getElementById("formSubmit");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      formMsg.className = "form-msg show";
      formMsg.textContent = t("ct_msg_sending");
      formSubmit.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            formMsg.className = "form-msg show ok";
            formMsg.textContent = t("ct_msg_ok");
          } else {
            throw new Error("send failed");
          }
        })
        .catch(function () {
          formMsg.className = "form-msg show err";
          formMsg.textContent = t("ct_msg_err");
        })
        .finally(function () {
          formSubmit.disabled = false;
        });
    });
  }

  /* ======================= Init ======================= */

  applyLang(detectLang());
})();
