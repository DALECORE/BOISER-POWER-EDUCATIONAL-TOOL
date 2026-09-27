export interface ILAWBOWEntry {
  grade: string;
  subject: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  termNumber: 1 | 2 | 3;
  week: number;
  weekLabel: string;
  topic: string;
  competency: string;
  hours: number;
  sessions: number;
  code: string;
  contentStandard: string;
  performanceStandard: string;
  learningCompetency: string;
  enablingCompetencies: string;
  subjectCategory: 'Filipino' | 'English' | 'Math' | 'Science' | 'AP' | 'MAPEH' | 'TLE' | 'ESP';
  s1: string;
  s2: string;
  s3: string;
  s4: string;
  lasBg?: string;
  lasA1?: string;
  lasA2?: string;
  lasA3?: string;
}

export const ILAW_BOW_DATABASE: ILAWBOWEntry[] = [
  // =========================================================================
  // GRADE 11 — MABISANG KOMUNIKASYON (DepEd Strengthened SHS Filipino)
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Linggo 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T1-W1',
    topic: 'Mungkahing Pagpapangkat: Persona, Panahon, at Lugar',
    competency: 'Mungkahing Pagpapangkat: Persona, Panahon, at Lugar',
    learningCompetency: 'Naiisa-isa ang mga kontekstuwal na elemento ng komunikasyon (persona, panahon, at lugar) at naipapaliwanag ang impluwensya nito sa pagbuo ng diskurso.',
    contentStandard: 'Nauunawaan ang mga batayang teorya at salik na nakakaapekto sa mabisang pakikipagtalastasan sa wikang Filipino.',
    performanceStandard: 'Nakabubuo ng mapanuri at etikal na pagsusuri ng iba\'t ibang sitwasyong pangkomunikasyon sa pamayanan at midya.',
    enablingCompetencies: '1. Natutukoy ang papel ng tagapagsalita at tagapakinig. 2. Nasusuri kung paano binabago ng panahon at espasyo ang kahulugan ng salita.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Pagpapakita ng video clip ng talumpati sa plaza vs. podcast. Engage: Pagsusuri kung bakit nag-iiba ang tono batay sa lugar at kausap.',
    s2: 'Explore: Pangkatang pagsusuri ng tatlong konteksto: pampublikong debate, hapag-kainan, at digital chat. Explain: Teorya ng Persona, Panahon, at Lugar.',
    s3: 'Elaborate: Role-play simulation ng pagpapanayam sa isang lokal na lider ng barangay gamit ang angkop na rehistro.',
    s4: 'Evaluate: Pagsusulit at rubric evaluation ng nabuong iskrip ng panayam na nagpapakita ng pagsasaalang-alang sa persona at lugar.',
    lasBg: 'Ang komunikasyon ay hindi nagaganap sa kawalan; ito ay laging nakaugat sa persona (sino ang nag-uusap), panahon (kailan nagaganap), at lugar (saan umiiral ang diskurso).',
    lasA1: 'Gumawa ng matrix na naghahambing sa paggamit ng wika sa tatlong magkakaibang persona (guro, kaibigan, punong-lungsod).',
    lasA2: 'Suriin ang isang napapanahong balita at tukuyin kung paano nakaimpluwensya ang panahon at lugar sa estilo ng pag-uulat.',
    lasA3: 'Sumulat ng 200-salitang replektibong sanaysay tungkol sa kahalagahan ng pag-angkop sa konteksto sa digital age.'
  },
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 1',
    termNumber: 1,
    week: 2,
    weekLabel: 'Linggo 2',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T1-W2',
    topic: 'Barayti at Baryasyon ng Wika sa Lipunan',
    competency: 'Pagsusuri sa mga Barayti ng Wika (Dayalek, Sosyolek, Idyolek, Etnolek, Ekolek)',
    learningCompetency: 'Natutukoy at nasusuri ang iba\'t ibang barayti ng wika sa pamamagitan ng pagbibigay ng mga halimbawang nagpapakita ng kultural na pagkakaiba.',
    contentStandard: 'Nauunawaan ang kalikasan, barayti, at baryasyon ng wikang Filipino sa iba\'t ibang pamayanan sa bansa.',
    performanceStandard: 'Nakapagpapakita ng paggalang sa multilingguwal at multikultural na realidad ng Pilipinas.',
    enablingCompetencies: '1. Naiisa-isa ang 5 pangunahing barayti. 2. Nakapagtatala ng mga lokal na termino sa sariling rehiyon.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Paghula sa pinagmulan ng mga diyalekto at salitang kanto. Engage: Audio clips ng iba\'t ibang punto sa Pilipinas.',
    s2: 'Explore: Pangkatang pagbuo ng "Wika Map" ng Northern Mindanao at sariling komunidad. Explain: Sosyolingguwistikang teorya ng barayti.',
    s3: 'Elaborate: Pagsasagawa ng skit na gumagamit ng tamang idyolek at sosyolek nang may etikal na paggalang.',
    s4: 'Evaluate: 10-item formative quiz at pagwawasto ng matrix ng mga barayti ng wika.',
    lasBg: 'Ang pagkakaiba-iba ng wika ay patunay ng mayamang kultura at kasaysayan ng bawat grupo sa kapuluan.',
    lasA1: 'Itala ang 10 salita sa inyong sariling rehiyon (e.g. Bisaya / Chavacano) at ibigay ang katumbas sa Filipino at konteksto ng paggamit.',
    lasA2: 'Tukuyin ang barayti ng wika sa 5 ibinigay na pahayag at ipaliwanag ang iyong sagot.',
    lasA3: 'Sumulat ng isang diyalogo sa pagitan ng dalawang kabataang nagmula sa magkakaibang lalawigan.'
  },
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 1',
    termNumber: 1,
    week: 3,
    weekLabel: 'Linggo 3',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T1-W3',
    topic: 'Kakayahang Pragmatiko at Sosyolingguwistiko',
    competency: 'Kakayahang Komunikatibo: Pragmatiko at Sosyolingguwistiko',
    learningCompetency: 'Naipapamalas ang kakayahang pragmatiko sa pamamagitan ng pagtukoy sa di-tahasang pahiwatig at layunin ng nagsasalita (Speech Acts).',
    contentStandard: 'Nauunawaan ang ugnayan ng pahiwatig, kultura, at etika sa pakikipagtalastasan.',
    performanceStandard: 'Naisasagawa ang mabisang pakikipagtalastasan na umiiwas sa miskomunikasyon at nakapaloob sa kabutihang-asal.',
    enablingCompetencies: '1. Nauunawaan ang illocutionary at perlocutionary force. 2. Nasusuri ang "kagandahang-asal" sa kulturang Pilipino.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Ano ang ibig sabihin kapag sinabi ng bisita: "Malamig pala rito"? Engage: Konsepto ng "pahiwatig" sa kulturang Pilipino.',
    s2: 'Explore: Pagsusuri ng mga sitwasyon ng pahiwatig sa pamilya at opisina. Explain: Teorya ng Speech Acts ni Austin at Searle.',
    s3: 'Elaborate: Simulasyon ng paglutas sa tampuhan o di-pagkakaunawaan gamit ang mabuting komunikasyon.',
    s4: 'Evaluate: Pagsusuri sa isang maikling dula-dulaan batay sa rubric ng kakayahang pragmatiko.',
    lasBg: 'Ang kakayahang pragmatiko ay ang abilidad na maunawaan ang tunay na kahulugan ng mensahe lampas sa literal na anyo ng mga salita.',
    lasA1: 'Ipaliwanag ang literal vs. pragmatikong kahulugan ng 5 karaniwang pahayag sa Pilipinas.',
    lasA2: 'Sumulat ng solusyon sa isang sitwasyong nagkaroon ng miskomunikasyon dahil sa maling interpretasyon ng pahiwatig.',
    lasA3: 'Bumuo ng sariling gabay sa "Mabisang Pakikipag-usap sa Nakatatanda at mga Awtoridad".'
  },
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Linggo 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T2-W1',
    topic: 'Tekstong Akademiko at Impormatibo',
    competency: 'Pagbasa at Pagsusuri ng Tekstong Impormatibo at Deskriptibo',
    learningCompetency: 'Nasusuri ang estruktura, tono, at layunin ng tekstong impormatibo at deskriptibo tungo sa pananaliksik.',
    contentStandard: 'Nauunawaan ang mga katangian at anyo ng iba\'t ibang tekstong binabasa sa Senior High School.',
    performanceStandard: 'Nakasusulat ng isang komprehensibong buod at reaksyong papel batay sa binasang tekstong akademiko.',
    enablingCompetencies: '1. Nakikilala ang paksang pangungusap. 2. Natutukoy ang hulwaran ng organisasyon ng teksto.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Paghahambing ng balita sa pahayagan at artikulo sa ensiklopedya. Engage: Pagsusuri ng obhetibong tono.',
    s2: 'Explore: Pag-aaral ng tekstong impormatibo ukol sa kalikasan ng Mindanao. Explain: Hulwaran ng organisasyon.',
    s3: 'Elaborate: Pagsulat ng sariling tekstong impormatibo tungkol sa isang natatanging pook sa sariling munisipalidad.',
    s4: 'Evaluate: Peer-evaluation ng isinulat na tekstong impormatibo gamit ang rubrik sa nilalaman at gramatika.',
    lasBg: 'Ang tekstong impormatibo ay naglalayong maghatid ng tumpak, beripikado, at obhetibong kabatiran sa mambabasa.',
    lasA1: 'Basahin ang ibinigay na sipi at balangkasin ang pangunahin at pansuportang ideya.',
    lasA2: 'Itama ang 5 maling impormasyon at ipaliwanag kung bakit mahalaga ang pagsangguni sa mapagkakatiwalaang sanggunian.',
    lasA3: 'Sumulat ng 150-salitang impormatibong anunsyo para sa isang pampublikong serbisyo sa paaralan.'
  },
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Linggo 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T3-W1',
    topic: 'Komunikasyon sa Trabaho at Propesyonal na Pagsulat',
    competency: 'Pagsulat ng Liham Pangnegosyo at Memorandum',
    learningCompetency: 'Nakasusulat ng pormal at propesyonal na liham pangnegosyo (liham aplikasyon, pagbibitiw, at kahilingan) alinsunod sa pamantayan ng industriya.',
    contentStandard: 'Nauunawaan ang mga kumbensyon at pormat ng propesyonal at teknikal na komunikasyon sa daigdig ng paggawa.',
    performanceStandard: 'Nakabubuo ng propesyonal na portfolio ng mga dokumento sa trabaho na magagamit sa TechPro at Academic tracks.',
    enablingCompetencies: '1. Naiisa-isa ang bahagi ng liham pangnegosyo. 2. Nagagamit ang pormal na rehistro ng wika sa trabaho.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Pagsusuri ng isang hindi maayos na email sa aplikasyon. Engage: Kahalagahan ng unang impresyon sa paghahanapbuhay.',
    s2: 'Explore: Paghahambing ng Full Block at Modified Block style. Explain: Bahagi ng liham at layunin ng memorandum.',
    s3: 'Elaborate: Pagsulat ng Liham Aplikasyon at Resume para sa isang aktwal na bakanteng posisyon sa Region X.',
    s4: 'Evaluate: Pagsusuri sa nabuong liham gamit ang pamantayang rubrik sa korespondensiya opisyal.',
    lasBg: 'Ang liham pangnegosyo at memorandum ay salamin ng propesyonalismo at kredibilidad ng isang kawani at kumpanya.',
    lasA1: 'Tukuyin ang 7 bahagi ng ibinigay na halimbawang liham pangnegosyo.',
    lasA2: 'Iwasto ang mga kamalian sa tono, bantas, at pormat ng isang halimbawang draft ng memorandum.',
    lasA3: 'Sumulat ng isang pormal na liham kahilingan para sa Work Immersion / On-the-Job Training.'
  },

  // =========================================================================
  // GRADE 11 — EFFECTIVE COMMUNICATION (English)
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'Effective Communication',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-EC11-T1-W1',
    topic: 'Nature, Process, and Models of Human Communication',
    competency: 'Nature, Process, and Models of Human Communication',
    learningCompetency: 'Explains the functions, nature, and process of communication using established models (Shannon-Weaver, Schramm, Berlo SMCR).',
    contentStandard: 'The learner understands the principles, nature, and elements of human communication in multidisciplinary and cultural contexts.',
    performanceStandard: 'The learner demonstrates effective and culturally sensitive oral and written communication exemplifying fundamental communication models.',
    enablingCompetencies: '1. Distinguishes verbal from non-verbal communication cues in interpersonal settings. 2. Identifies systemic communication breakdowns and applies remediation techniques.',
    subjectCategory: 'English',
    s1: 'Elicit: Telephone game exposing distortion. Engage: Video case analysis of intercultural communication breakdowns.',
    s2: 'Explore: Small group diagramming of Shannon-Weaver vs. Schramm models. Explain: Interactive lecture on noise barriers.',
    s3: 'Elaborate: Role-play simulation resolving workplace miscommunication in a simulated BPO / front-office scenario.',
    s4: 'Evaluate: Formative rubric assessment of role-play simulation and 10-item conceptual quiz on communication models.',
    lasBg: 'Communication is a dynamic two-way process of exchanging information, thoughts, and emotions through shared systems of symbols and behavior.',
    lasA1: 'Create a comparative Venn diagram contrasting the linear Shannon-Weaver model with the transactional Schramm interactive model.',
    lasA2: 'Analyze three real-life classroom or online communication breakdowns. Propose a concrete communicative repair strategy for each.',
    lasA3: 'Record or present a 2-minute video commentary demonstrating appropriate non-verbal gestures in formal Philippine workplace settings.'
  },
  {
    grade: 'Grade 11',
    subject: 'Effective Communication',
    term: 'Term 1',
    termNumber: 1,
    week: 2,
    weekLabel: 'Week 2',
    hours: 4,
    sessions: 4,
    code: 'SHS-EC11-T1-W2',
    topic: 'Intercultural Communication & Communicative Strategies',
    competency: 'Intercultural Sensitivity and Communicative Strategies in Discourse',
    learningCompetency: 'Engages in collaborative communicative situations using appropriate communicative strategies and demonstrating sensitivity to cultural nuances.',
    contentStandard: 'The learner demonstrates communicative competence by recognizing barriers in intercultural discourse.',
    performanceStandard: 'The learner skillfully deploys communicative strategies in informal dialogues, panel discussions, and symposiums.',
    enablingCompetencies: '1. Identifies 7 communicative strategies. 2. Evaluates ethnocentrism and bias in media discourse.',
    subjectCategory: 'English',
    s1: 'Elicit: Cross-cultural etiquette quiz. Engage: Discussion on high-context vs low-context Philippine regional discourse.',
    s2: 'Explore: Case study of multinational company email exchanges. Explain: Hofstede cultural dimensions in conversation.',
    s3: 'Elaborate: Mock legislative or barangay council debate deploying assigned communicative strategy cards.',
    s4: 'Evaluate: Checklist scoring of strategy card utilization during the live mock debate.',
    lasBg: 'Intercultural communication happens when participants from differing cultural backgrounds negotiate shared meaning respectfully.',
    lasA1: 'Classify 10 dialogue excerpts into Nomination, Restriction, Turn-taking, Topic Control, Topic Shifting, Repair, or Termination.',
    lasA2: 'Write a short script showing how a chairperson can use "Repair" and "Topic Shifting" to resolve an argument.',
    lasA3: 'Draft a Code of Intercultural Conduct for your Senior High School classroom.'
  },
  {
    grade: 'Grade 11',
    subject: 'Effective Communication',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-EC11-T2-W1',
    topic: 'Critical Reading & Academic Text Structures (EAPP)',
    competency: 'Academic Text Structures and Critical Reading Across Disciplines',
    learningCompetency: 'Differentiates language and text structures used in academic texts from various disciplines (IMRaD format, problem-solution, cause-effect).',
    contentStandard: 'The learner understands the principles, text structures, and objective conventions of academic writing.',
    performanceStandard: 'The learner produces a comprehensive critique of an academic journal article or research report.',
    enablingCompetencies: '1. Locates thesis statements and topic sentences. 2. Synthesizes multiple texts on a single topic.',
    subjectCategory: 'English',
    s1: 'Elicit: Compare social media post vs scientific journal abstract. Engage: Vocabulary audit of academic tone.',
    s2: 'Explore: Highlighting text structures in research papers. Explain: Academic objectivity, hedges, and nominalization.',
    s3: 'Elaborate: Annotating an academic paper relevant to student track (TechPro vs Academic).',
    s4: 'Evaluate: Text structure identification quiz and abstract critique worksheet.',
    lasBg: 'Academic language is formal, objective, cautious, and structurally organized to convey scientific rigor.',
    lasA1: 'Read a research abstract and label its Introduction, Methodology, Results, and Discussion (IMRaD).',
    lasA2: 'Convert 5 informal, biased paragraphs into objective, academic prose.',
    lasA3: 'Write an academic review of a peer-reviewed article in your field of interest.'
  },
  {
    grade: 'Grade 11',
    subject: 'Effective Communication',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-EC11-T3-W1',
    topic: 'Workplace Correspondence & Technical Writing',
    competency: 'Professional and Workplace Correspondence (Memos, Business Letters)',
    learningCompetency: 'Drafts professional workplace communications including executive summaries, formal memoranda, and business inquiries.',
    contentStandard: 'The learner understands professional correspondence standards, ethical obligations, and corporate voice.',
    performanceStandard: 'The learner compiles a professional career portfolio with polished correspondence artifacts.',
    enablingCompetencies: '1. Applies standard business formatting. 2. Adheres to conciseness and courtesy principles.',
    subjectCategory: 'English',
    s1: 'Elicit: Critique of unprofessional corporate emails. Engage: Impact of tone on client trust.',
    s2: 'Explore: Deconstructing memorandum structure. Explain: Executive summary writing standards.',
    s3: 'Elaborate: Drafting a formal inter-office memorandum requesting facility upgrades.',
    s4: 'Evaluate: Scoring memorandum artifacts against corporate rubric.',
    lasBg: 'Clear professional correspondence saves institutional time and prevents costly operational mistakes.',
    lasA1: 'Identify 5 errors in tone or format in the provided business memo.',
    lasA2: 'Draft a concise 1-page executive memo proposing an eco-friendly campus initiative.',
    lasA3: 'Write a professional email inquiring about internship qualifications at an IT firm.'
  },

  // =========================================================================
  // GRADE 11 — GENERAL MATHEMATICS
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'General Mathematics',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GM11-T1-W1',
    topic: 'Functions, Piecewise Functions & Mathematical Modeling',
    competency: 'Functions, Piecewise Functions & Mathematical Modeling',
    learningCompetency: 'Represents real-life situations using functions, including piecewise functions, and evaluates function values across domains.',
    contentStandard: 'The learner understands key concepts of functions and piecewise mathematical models.',
    performanceStandard: 'The learner models real-world situations involving cost functions, utility rates, and step billing.',
    enablingCompetencies: '1. Evaluates algebraic functions f(x). 2. Graphically plots piecewise step-functions.',
    subjectCategory: 'Math',
    s1: 'Elicit: Jeepney fare calculation rules (base fare + additional km). Engage: Stepwise cost modeling.',
    s2: 'Explore: Graphing mobile data plans and electrical consumption tiers. Explain: Piecewise domain notation.',
    s3: 'Elaborate: Formulating a piecewise function for local tricycle tariff rates in the municipality.',
    s4: 'Evaluate: 5-item piecewise evaluation problem set and word problem rubric.',
    lasBg: 'Functions describe predictable relationships where each distinct input produces exactly one definite output.',
    lasA1: 'Construct a piecewise function C(d) representing local jeepney fare: P13 for the first 4 km, plus P1.75 for each additional km.',
    lasA2: 'Evaluate the function f(x) = { 2x + 1 for x <= 0; x^2 - 3 for x > 0 } at x = -3, 0, and 4.',
    lasA3: 'Design a tiered pricing model for a school entrepreneurship food stall.'
  },
  {
    grade: 'Grade 11',
    subject: 'General Mathematics',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GM11-T2-W1',
    topic: 'Simple and Compound Interest & Annuities',
    competency: 'Business Mathematics: Simple vs Compound Interest',
    learningCompetency: 'Computes interest, maturity value, future value, and present value in simple and compound interest environments.',
    contentStandard: 'The learner understands the principles of time value of money and financial instruments.',
    performanceStandard: 'The learner investigates loan options and investment products to make prudent financial decisions.',
    enablingCompetencies: '1. Solves I = Prt. 2. Computes compound interest A = P(1 + r/n)^(nt).',
    subjectCategory: 'Math',
    s1: 'Elicit: Why do banks pay interest on savings? Engage: The power of compounding over 20 years.',
    s2: 'Explore: Spreadsheet modeling of simple vs compound growth. Explain: Compound interest formulas.',
    s3: 'Elaborate: Comparing 3 Philippine commercial bank savings and time-deposit options.',
    s4: 'Evaluate: Comparative problem set on loan amortization and interest computation.',
    lasBg: 'Understanding the time value of money empowers learners to build wealth and avoid exploitative debt.',
    lasA1: 'Compute the maturity value of P50,000 invested at 6% simple interest for 5 years.',
    lasA2: 'Calculate the compound amount if P50,000 is compounded quarterly at 6% annual rate for 5 years. Find the interest difference.',
    lasA3: 'Analyze a motorcycle installment plan and calculate its effective annual interest rate.'
  },
  {
    grade: 'Grade 11',
    subject: 'General Mathematics',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GM11-T3-W1',
    topic: 'Logic, Truth Tables, and Tautologies',
    competency: 'Mathematical Logic: Propositions, Truth Tables & Validity',
    learningCompetency: 'Determines the truth value of compound propositions and establishes logical equivalence using truth tables.',
    contentStandard: 'The learner understands propositional logic, logical connectives, and fallacies in reasoning.',
    performanceStandard: 'The learner establishes the validity of arguments in legal, commercial, and technical debates.',
    enablingCompetencies: '1. Translates English statements into symbolic logic. 2. Identifies converse, inverse, and contrapositive.',
    subjectCategory: 'Math',
    s1: 'Elicit: Logic riddles and paradoxical statements. Engage: Everyday deceptive advertising arguments.',
    s2: 'Explore: Constructing truth tables for conjunction, disjunction, implication. Explain: De Morgan Laws.',
    s3: 'Elaborate: Analyzing legal contracts or warranty claims using propositional logic.',
    s4: 'Evaluate: Truth table verification test for compound logical propositions.',
    lasBg: 'Mathematical logic forms the algorithmic foundation of computer programming and legal deduction.',
    lasA1: 'Symbolize: "If it rains and the electricity is cut, then the computer lab is closed."',
    lasA2: 'Construct the full truth table for ~(p AND q) <-> (~p OR ~q).',
    lasA3: 'Explain the logical fallacy in: "All doctors are smart. Maria is smart, therefore Maria is a doctor."'
  },

  // =========================================================================
  // GRADE 11 — GENERAL SCIENCE
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'General Science',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GS11-T1-W1',
    topic: 'Earth Subsystems & Plate Tectonic Processes',
    competency: 'Earth Subsystems & Plate Tectonics in the Philippine Archipelago',
    learningCompetency: 'Describes the interactions between Earth subsystems and explains how internal heat drives plate tectonics and volcanism in the Philippine archipelago.',
    contentStandard: 'The learner understands the geosphere, hydrosphere, atmosphere, biosphere, and plate boundary dynamics.',
    performanceStandard: 'The learner conducts a community hazard risk assessment for earthquakes, tsunamis, or landslides.',
    enablingCompetencies: '1. Identifies convergent, divergent, and transform boundaries. 2. Explains subduction along the Philippine Trench.',
    subjectCategory: 'Science',
    s1: 'Elicit: Video footage of recent Mindanao earthquakes. Engage: PHIVOLCS FaultFinder digital map search.',
    s2: 'Explore: Modeling tectonic plate motion with graham crackers and frosting. Explain: Mantle convection.',
    s3: 'Elaborate: Preparing a Disaster Risk Reduction evacuation plan for the local barangay.',
    s4: 'Evaluate: Diagram analysis quiz of tectonic plate boundaries and DRRM plan rubric.',
    lasBg: 'The Earth operates as a unified dynamic system where geological movements continuously shape landforms, weather, and habitats.',
    lasA1: 'Draw and label a cross-section showing subduction along the Philippine Trench, indicating magma generation.',
    lasA2: 'Explain why Northern Mindanao experiences both tectonic earthquakes and volcanic activity in 4 scientific sentences.',
    lasA3: 'Formulate an evacuation checklist and route map for your family during a magnitude 7.2 earthquake.'
  },
  {
    grade: 'Grade 11',
    subject: 'General Science',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GS11-T2-W1',
    topic: 'Chemical Bonding & Molecular Structure',
    competency: 'Chemical Bonding, Lewis Dot Structures, and Molecular Geometry',
    learningCompetency: 'Relates electron configuration to periodic properties and predicts ionic vs covalent bonding behaviors.',
    contentStandard: 'The learner understands the octet rule, valence electrons, and intermolecular forces.',
    performanceStandard: 'The learner predicts chemical properties of everyday household and agricultural substances.',
    enablingCompetencies: '1. Draws Lewis electron dot diagrams. 2. Differentiates polar and nonpolar covalent bonds.',
    subjectCategory: 'Science',
    s1: 'Elicit: Why does salt dissolve in water while cooking oil does not? Engage: Polarity demonstration.',
    s2: 'Explore: Constructing ball-and-stick molecular models. Explain: Electronegativity differences.',
    s3: 'Elaborate: Analyzing Safety Data Sheets (SDS) of common agricultural pesticides used in Region X.',
    s4: 'Evaluate: Lewis dot structure drawing quiz and polarity prediction sheet.',
    lasBg: 'Valence electrons govern how atoms interact, forming chemical bonds that dictate physical and chemical characteristics.',
    lasA1: 'Draw Lewis dot structures for H2O, CO2, and NaCl, indicating partial charges.',
    lasA2: 'Predict whether NF3 and CH4 are polar or nonpolar molecules based on electronegativity and geometry.',
    lasA3: 'Explain the role of hydrogen bonding in giving water its unusually high boiling point and surface tension.'
  },
  {
    grade: 'Grade 11',
    subject: 'General Science',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GS11-T3-W1',
    topic: 'Newton Laws of Motion & Momentum',
    competency: 'Kinematics, Newton Laws of Motion, and Impact Mitigation',
    learningCompetency: 'Applies Newton laws of motion and impulse-momentum theorem to analyze and solve real-world vehicular safety problems.',
    contentStandard: 'The learner understands forces, acceleration, momentum, and energy conservation.',
    performanceStandard: 'The learner designs and tests an impact mitigation prototype (egg-drop or vehicle crash test).',
    enablingCompetencies: '1. Solves F = ma with free-body diagrams. 2. Explains impulse J = F * delta_t.',
    subjectCategory: 'Science',
    s1: 'Elicit: Crash test dummy slow-motion footage. Engage: Why do modern cars have crumple zones?',
    s2: 'Explore: Motion sensor cart lab on inclined tracks. Explain: Impulse-momentum theorem.',
    s3: 'Elaborate: Egg-drop engineering challenge using recycled materials to maximize impact duration.',
    s4: 'Evaluate: Free-body diagram problem solving exam and egg-drop engineering rubric.',
    lasBg: 'Newton laws explain the dynamics of motion, providing critical engineering principles for transport safety.',
    lasA1: 'A 1,500-kg vehicle traveling at 20 m/s comes to a stop in 0.5 seconds upon hitting a barrier. Calculate the average impact force.',
    lasA2: 'Draw a complete Free-Body Diagram for a motorcycle traveling at constant velocity on a rough highway.',
    lasA3: 'Explain scientifically why wearing seatbelts and having airbags saves lives during sudden deceleration.'
  },

  // =========================================================================
  // GRADE 11 — LIFE AND CAREER SKILLS
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'Life and Career Skills',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-LCS11-T1-W1',
    topic: 'Self-Awareness, Emotional Intelligence & Personal Values',
    competency: 'Self-Awareness, Emotional Intelligence & Personal Values',
    learningCompetency: 'Analyzes personal strengths, growth areas, and emotional intelligence competencies (Goleman framework) to guide life choices.',
    contentStandard: 'The learner understands personal identity, emotional regulation, and ethical values.',
    performanceStandard: 'The learner creates a comprehensive personal development roadmap aligning values with career ambitions.',
    enablingCompetencies: '1. Performs a Personal SWOT Analysis. 2. Identifies healthy emotional regulation techniques.',
    subjectCategory: 'ESP',
    s1: 'Elicit: Who Am I? reflective shield drawing. Engage: Daniel Goleman 5 EQ domains.',
    s2: 'Explore: Peer-feedback circle on perceived character strengths. Explain: Johari Window model.',
    s3: 'Elaborate: Drafting an actionable Personal SWOT matrix.',
    s4: 'Evaluate: Rubric evaluation of Personal SWOT Portfolio and reflective self-assessment journal.',
    lasBg: 'Self-awareness is the cornerstone of leadership, enabling individuals to manage stress and build resilience.',
    lasA1: 'Complete your Johari Window matrix by listing 4 traits in Open, Blind, Hidden, and Unknown quadrants.',
    lasA2: 'Construct a Personal SWOT analysis focusing on your Senior High School academic and technical skills.',
    lasA3: 'Write a 250-word reflective essay detailing a situation where you successfully applied emotional self-regulation.'
  },
  {
    grade: 'Grade 11',
    subject: 'Life and Career Skills',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-LCS11-T2-W1',
    topic: 'Philippine Labor Market Trends & 21st Century Skills',
    competency: 'Philippine Labor Market Trends & 21st Century In-Demand Skills',
    learningCompetency: 'Investigates emerging career trajectories, TechPro industries, and Fourth Industrial Revolution (4IR) skill requirements in Region X.',
    contentStandard: 'The learner understands economic shifts, industry demands, and lifelong learning competencies.',
    performanceStandard: 'The learner formulates a viable career pathway matching personal competencies with regional labor market needs.',
    enablingCompetencies: '1. Analyzes DOLE/TESDA job demand reports. 2. Identifies transferable technical and soft skills.',
    subjectCategory: 'TLE',
    s1: 'Elicit: Jobs that existed 10 years ago vs today. Engage: Automation and AI impacts in the Philippines.',
    s2: 'Explore: Reviewing DOLE occupational forecasts. Explain: Hard skills vs soft skills in hiring.',
    s3: 'Elaborate: Mapping Senior High School track specializations to high-growth regional industries in Region X.',
    s4: 'Evaluate: Career pathway alignment report and presentation of industry skill requirement matrices.',
    lasBg: 'The contemporary workforce demands adaptive professionals possessing both technical mastery and interpersonal agility.',
    lasA1: 'List 5 high-demand industries in Northern Mindanao / Region X and note 2 essential competencies required by each.',
    lasA2: 'Compare the educational requirements, career growth, and starting compensation of your top 2 career choices.',
    lasA3: 'Draft an action plan detailing the certifications (NC II / NC III) or academic degrees needed to achieve your career goal.'
  },
  {
    grade: 'Grade 11',
    subject: 'Life and Career Skills',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-LCS11-T3-W1',
    topic: 'Financial Literacy & Personal Budgeting Systems',
    competency: 'Financial Literacy, Personal Budgeting & Saving Systems',
    learningCompetency: 'Demonstrates practical financial literacy by drafting personal cash-flow budgets and identifying savings and investment instruments.',
    contentStandard: 'The learner understands principles of sound personal financial management, budgeting, and debt avoidance.',
    performanceStandard: 'The learner develops a realistic personal budget and emergency fund plan.',
    enablingCompetencies: '1. Applies the 50/30/20 budget framework. 2. Differentiates needs from wants.',
    subjectCategory: 'TLE',
    s1: 'Elicit: How do you manage your weekly allowance? Engage: Realities of inflation and purchasing power.',
    s2: 'Explore: Creating an interactive spreadsheet for daily expense tracking. Explain: The 50/30/20 rule.',
    s3: 'Elaborate: Budgeting simulation: Managing a monthly minimum wage salary for a young professional living in Cagayan de Oro.',
    s4: 'Evaluate: Personal monthly budget plan scored against accuracy, realism, and emergency savings allocation.',
    lasBg: 'Financial independence begins with disciplined cash-flow tracking, prioritizing emergency reserves, and smart spending.',
    lasA1: 'Categorize a list of 15 common teen expenses into Essential Needs, Discretionary Wants, and Future Savings.',
    lasA2: 'Draft a weekly budget using the 50/30/20 rule based on a hypothetical allowance of P1,000.',
    lasA3: 'Calculate how long it will take to build a P15,000 emergency fund saving P250 each week.'
  },

  // =========================================================================
  // GRADE 12 — TECHPRO APPLIED SPECIALIZATION
  // =========================================================================
  {
    grade: 'Grade 12',
    subject: 'TechPro Applied Specialization',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-TP12-T1-W1',
    topic: 'Occupational Health, Safety & Equipment Diagnostics',
    competency: 'OH&S Standards, Risk Mitigation, and Diagnostic Protocols',
    learningCompetency: 'Applies national Occupational Health and Safety (OH&S) standards and conducts systematic equipment diagnostics in workshop environments.',
    contentStandard: 'The learner understands workplace safety regulations, hazardous materials protocols, and preventive maintenance routines.',
    performanceStandard: 'The learner performs an end-to-end hazard risk audit of the school workshop and executes diagnostic checklists.',
    enablingCompetencies: '1. Identifies PPE standards according to DOLE regulations. 2. Operates diagnostic multimeters and diagnostic software safely.',
    subjectCategory: 'TLE',
    s1: 'Elicit: Workshop hazard spot-the-error photo challenge. Engage: Real-life industrial safety accident case studies.',
    s2: 'Explore: Hands-on inspection of workshop electrical tools. Explain: 5S methodology and Lockout/Tagout (LOTO) protocols.',
    s3: 'Elaborate: Drafting an OH&S compliance checklist for the school TechPro laboratory.',
    s4: 'Evaluate: Workshop safety inspection practical test and checklist scoring.',
    lasBg: 'Workplace safety protects human life and guarantees long-term productivity and industrial efficiency.',
    lasA1: 'List 5 common electrical and mechanical workshop hazards and state the appropriate PPE required for each.',
    lasA2: 'Create a Lockout/Tagout (LOTO) step-by-step flowchart for servicing heavy machinery.',
    lasA3: 'Conduct a safety audit of a designated workstation in your school laboratory and document 3 recommended improvements.'
  },

  // =========================================================================
  // GRADE 10 — ARALING PANLIPUNAN
  // =========================================================================
  {
    grade: 'Grade 10',
    subject: 'Araling Panlipunan 10',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Linggo 1',
    hours: 4,
    sessions: 4,
    code: 'JHS-AP10-T1-W1',
    topic: 'Mga Isyung Pangkapaligiran at Disaster Risk Reduction',
    competency: 'Pagsusuri sa mga Isyung Pangkapaligiran at Katutubong Pamamahala',
    learningCompetency: 'Nasusuri ang mga suliraning pangkapaligiran sa sariling pamayanan at ang kahalagahan ng Community-Based Disaster Risk Reduction (CBDRRM).',
    contentStandard: 'Nauunawaan ang mga sanhi at implikasyon ng mga hamong pangkapaligiran sa bansa.',
    performanceStandard: 'Nakabubuo ng community action plan para sa pangangalaga ng kapaligiran at kahandaan sa kalamidad.',
    enablingCompetencies: '1. Natutukoy ang Top-down vs Bottom-up DRRM approach. 2. Nasusuri ang epekto ng climate change sa agrikultura.',
    subjectCategory: 'AP',
    s1: 'Elicit: Larawan ng mga nakaraang bagyo at pagbaha sa Mindanao. Engage: Pagsusuri ng kahandaan ng barangay.',
    s2: 'Explore: Pangkatang pagsusuri ng CBDRRM framework. Explain: Apat na yugto ng disaster management.',
    s3: 'Elaborate: Paggawa ng hazard map ng sariling barangay na tumutukoy sa mga ligtas na evacuation centers.',
    s4: 'Evaluate: Pagsusulit sa DRRM concepts at pagmamarka sa nabuong hazard map.',
    lasBg: 'Ang epektibong pamamahala sa kalamidad ay nakasalalay sa pagkakaisa at partisipasyon ng bawat mamamayan sa komunidad.',
    lasA1: 'Ikumpara ang Top-Down Approach at Bottom-Up Approach sa Disaster Risk Reduction Management.',
    lasA2: 'Gumuhit ng payak na hazard map ng inyong purok at markahan ang posibleng banta ng baha o landslide.',
    lasA3: 'Sumulat ng 3 konkretong hakbang na gagawin ng iyong pamilya bago, habang, at pagkatapos ng bagyo.'
  }
];

/**
 * Helper to retrieve distinct grade levels from the BOW database
 */
export function getDistinctGrades(): string[] {
  return [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
    'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];
}

/**
 * Helper to retrieve distinct subjects for a given grade level
 */
export function getSubjectsForGrade(grade: string): string[] {
  // Hardcoded check
  const staticSubjects = Array.from(
    new Set(
      ILAW_BOW_DATABASE.filter(e => e.grade === grade).map(e => e.subject)
    )
  );
  if (staticSubjects.length > 0) {
    return staticSubjects;
  }

  // Dynamic K-12 subject curriculum assignment
  if (grade === 'Grade 1' || grade === 'Grade 2' || grade === 'Grade 3' || grade === 'Grade 4' || grade === 'Grade 5' || grade === 'Grade 6') {
    return [
      'Filipino',
      'English',
      'Mathematics',
      'Science',
      'Araling Panlipunan',
      'MAPEH',
      'Edukasyon sa Pagpapakatao (ESP)',
      'EPP / Home Economics'
    ];
  } else if (grade === 'Grade 7' || grade === 'Grade 8' || grade === 'Grade 9' || grade === 'Grade 10') {
    return [
      'Filipino',
      'English',
      'Mathematics',
      'Science',
      'Araling Panlipunan',
      'MAPEH',
      'Edukasyon sa Pagpapakatao (ESP)',
      'TLE / TechPro'
    ];
  } else {
    // SHS (11-12)
    return [
      'Mabisang Komunikasyon',
      'General Mathematics',
      'Disaster Readiness',
      'Life and Career Skills'
    ];
  }
}

/**
 * Helper to retrieve available terms for a given grade and subject
 */
export function getTermsForSubject(grade: string, subject: string): Array<'Term 1' | 'Term 2' | 'Term 3'> {
  return ['Term 1', 'Term 2', 'Term 3'];
}

/**
 * Helper to retrieve BOW entries for a selected grade, subject, and term
 */
export function getEntriesForTerm(
  grade: string,
  subject: string,
  term: 'Term 1' | 'Term 2' | 'Term 3'
): ILAWBOWEntry[] {
  const staticEntries = ILAW_BOW_DATABASE.filter(
    e => e.grade === grade && e.subject === subject && e.term === term
  );
  if (staticEntries.length > 0) {
    return staticEntries;
  }

  // Define subject categories
  let subjectCategory: 'Filipino' | 'English' | 'Math' | 'Science' | 'AP' | 'MAPEH' | 'TLE' | 'ESP' = 'English';
  if (subject.toLowerCase().includes('filipino') || subject.toLowerCase().includes('komunikasyon')) subjectCategory = 'Filipino';
  else if (subject.toLowerCase().includes('math')) subjectCategory = 'Math';
  else if (subject.toLowerCase().includes('science') || subject.toLowerCase().includes('disaster')) subjectCategory = 'Science';
  else if (subject.toLowerCase().includes('panlipunan') || subject.toLowerCase().includes('ap')) subjectCategory = 'AP';
  else if (subject.toLowerCase().includes('mapeh')) subjectCategory = 'MAPEH';
  else if (subject.toLowerCase().includes('tle') || subject.toLowerCase().includes('epp')) subjectCategory = 'TLE';
  else if (subject.toLowerCase().includes('esp') || subject.toLowerCase().includes('pagpapakatao')) subjectCategory = 'ESP';

  // Topic repository based on subjectCategory
  const topicsMap: Record<typeof subjectCategory, Array<{ topic: string; competency: string; lc: string; cs: string; ps: string }>> = {
    Filipino: [
      {
        topic: 'Wika at Komunikasyon sa Makabagong Panahon',
        competency: 'Pagsusuri sa Konseptong Pangwika at Wikang Pambansa',
        lc: 'Nailalahad ang mga pinagdaanang kasaysayan ng wikang pambansa at ang kahalagahan nito sa pagkakaisa.',
        cs: 'Nauunawaan ang mga batayang konseptong pangwika at kasaysayan ng wika.',
        ps: 'Nakabubuo ng malikhaing sanaysay o talumpati tungkol sa wika.'
      },
      {
        topic: 'Kultura at Sosyolingguwistikang Realidad',
        competency: 'Barayti at Baryasyon ng Wika sa Iba\'t Ibang Rehiyon',
        lc: 'Natutukoy at nasusuri ang mga barayti ng wika (dayalek, sosyolek, idyolek) sa pamayanan.',
        cs: 'Nauunawaan ang ugnayan ng lipunan, kultura, at wika.',
        ps: 'Nakapagsasagawa ng pananaliksik ukol sa local vocabulary.'
      },
      {
        topic: 'Mga Rehistro at Estilo ng Wikang Filipino',
        competency: 'Pagsusuri sa Rehistro ng Wika sa Iba\'t Ibang Larang',
        lc: 'Nabibigyang-kahulugan ang mga salitang ginagamit sa iba\'t ibang propesyon o akademya.',
        cs: 'Nauunawaan ang pagkakaiba ng jargon sa karaniwang wika.',
        ps: 'Nakabubuo ng diksyunaryong pangkabuhayan o bokabularyong teknikal.'
      },
      {
        topic: 'Pragmatiks at Di-Tahasang Pahiwatig',
        competency: 'Kakayahang Pragmatiko sa Komunikasyon',
        lc: 'Naipapaliwanag ang kahalagahan ng pragmatiks sa pag-unawa sa di-tahasang pahiwatig.',
        cs: 'Nauunawaan ang Speech Acts at konteksto ng pakikipag-usap.',
        ps: 'Nakapagsasagawa ng skit na may tamang pahiwatig at magalang na pananalita.'
      },
      {
        topic: 'Tekstong Impormatibo at Kritikal na Pagbasa',
        competency: 'Mapanuring Pagbasa sa Tekstong Impormatibo',
        lc: 'Naiisa-isa ang mga katangian at elemento ng tekstong nagbabahagi ng kaalaman.',
        cs: 'Nauunawaan ang mga anyo, istruktura, at layunin ng tekstong impormatibo.',
        ps: 'Nakabubuo ng isang infographics na nagbibigay ng impormasyon tungkol sa kalusugan.'
      },
      {
        topic: 'Tekstong Deskriptibo at Malikhaing Pagsulat',
        competency: 'Pagsulat ng Malinaw at Masining na Paglalarawan',
        lc: 'Nakasusulat ng paglalarawan gamit ang angkop na pang-uri at pandama.',
        cs: 'Nauunawaan ang kahalagahan ng deskripsyon sa mabisang pagkukuwento.',
        ps: 'Nakabubuo ng talata o tula na naglalarawan sa sariling pamayanan.'
      },
      {
        topic: 'Tekstong Persuweysib at Pangangatwiran',
        competency: 'Mapanuring Pagsusuri sa Tekstong Nanghihikayat',
        lc: 'Natutukoy ang mga propaganda at paraan ng panghihikayat sa mga patalastas at sanaysay.',
        cs: 'Nauunawaan ang mga elemento ng epektibong panghihikayat.',
        ps: 'Nakabubuo ng patalastas o advocacy campaign plan.'
      },
      {
        topic: 'Tekstong Argumentatibo at Lohika',
        competency: 'Pagbuo ng Lohikal na Pangangatwiran',
        lc: 'Nakasusulat ng tekstong argumentatibo na may matatag na ebidensya at lohika.',
        cs: 'Nauunawaan ang pagkakaiba ng opinyon sa katotohanan.',
        ps: 'Nakikilahok sa isang pormal na debate o talakayan.'
      },
      {
        topic: 'Sulating Pananaliksik at Pagpili ng Paksa',
        competency: 'Sistematikong Proseso ng Pananaliksik',
        lc: 'Nakasusulat ng isang panimula at rasyonal para sa napiling paksa ng pananaliksik.',
        cs: 'Nauunawaan ang mga etika at pamamaraan sa pananaliksik.',
        ps: 'Nakabubuo ng balangkas at tentatibong bibliograpiya.'
      },
      {
        topic: 'Pangwakas na Presentasyon ng Pananaliksik',
        competency: 'Diseminasyon ng Sulating Akademiko',
        lc: 'Naipapahayag nang buong husay ang natapos na pananaliksik sa harap ng klase.',
        cs: 'Nauunawaan ang mga pamantayan sa pormal na presentasyon.',
        ps: 'Nakapagtatanggol ng pananaliksik (Oral Defense) gamit ang angkop na kagamitan.'
      }
    ],
    English: [
      {
        topic: 'Critical Reading Strategies in Diverse Texts',
        competency: 'Analyzing Informative and Literary Nonfiction',
        lc: 'Identifies the central thesis, supporting claims, and author\'s tone in academic essays.',
        cs: 'Understand structural elements of academic essays.',
        ps: 'Write an executive summary of a critical text.'
      },
      {
        topic: 'Structural and Textual Analysis Techniques',
        competency: 'Deconstructing Argumentative Paragraphs',
        lc: 'Evaluates the validity of evidence and flags logical fallacies in persuasive columns.',
        cs: 'Understand logic structures and rhetorical devices.',
        ps: 'Formulate counter-claims with solid text citation.'
      },
      {
        topic: 'Oral Communication and Persuasion Principles',
        competency: 'Designing Persuasive Speech Drafts',
        lc: 'Applies rhetorical appeals (ethos, pathos, logos) to construct a compelling address.',
        cs: 'Understand performance metrics of speech delivery.',
        ps: 'Deliver a 3-minute video essay on social changes.'
      },
      {
        topic: 'Pragmatic Aspects of Language and Context',
        competency: 'Context-Aware Linguistic Application',
        lc: 'Differentiates speech acts and adjusts vocabulary registers for diverse social contexts.',
        cs: 'Understand communicative competence theories.',
        ps: 'Draft email responses adapting formal vs. informal tones.'
      },
      {
        topic: 'Academic Writing and Citation Formatting',
        competency: 'APA 7th Edition In-Text Citation Mastery',
        lc: 'Synthesizes literature findings using appropriate citation tags and bibliography logs.',
        cs: 'Understand ethics of intellectual property.',
        ps: 'Format a 3-page literature review outline.'
      },
      {
        topic: 'Drafting the Research Abstract and Rationale',
        competency: 'Formulating Structured Proposals',
        lc: 'Writes a concise executive abstract mapping background, objectives, and significance.',
        cs: 'Understand technical constraints of research summaries.',
        ps: 'Submit a 250-word research proposal outline.'
      },
      {
        topic: 'Formulating Hypotheses and Research Questions',
        competency: 'Developing Rigorous Inquiry Frameworks',
        lc: 'Designs clear, testable research questions aligned with a designated methodological approach.',
        cs: 'Understand theoretical and operational variables.',
        ps: 'Map operational definitions of key research variables.'
      },
      {
        topic: 'Data Collection Procedures and Survey Designs',
        competency: 'Designing Reliable Research Instruments',
        lc: 'Constructs survey questionnaires with high internal validity and ethical consent templates.',
        cs: 'Understand basic sampling methods.',
        ps: 'Draft a 10-item Likert-scale questionnaire.'
      },
      {
        topic: 'Synthesizing Findings and Drawing Recommendations',
        competency: 'Logical Interpretative Presentation',
        lc: 'Synthesizes raw interview quotes or tabular summaries into thematic research results.',
        cs: 'Understand thematic coding principles.',
        ps: 'Formulate actionable institutional policy recommendations.'
      },
      {
        topic: 'Final Peer Evaluation and Oral Presentation',
        competency: 'Professional Academic Defense Protocols',
        lc: 'Defends research findings with evidence-backed arguments and high-quality slide decks.',
        cs: 'Understand presentation design structures.',
        ps: 'Present and submit the finalized Research Dossier.'
      }
    ],
    Math: [
      {
        topic: 'Functions, Relations, and Rational Functions',
        competency: 'Modeling Real-World Scenarios with Rational Functions',
        lc: 'Represents business cost matrices and local community budgets as rational equations.',
        cs: 'Understand functional mappings and domain boundaries.',
        ps: 'Plot real-life rational relationship graphs on coordinate grids.'
      },
      {
        topic: 'Rational Equations and Inequalities',
        competency: 'Solving Multi-Step Rational Equations',
        lc: 'Solves algebraic equations involving variables in the denominator with 100% correctness.',
        cs: 'Understand rational operations and extraneous roots.',
        ps: 'Resolve word problems involving rate, work, and mixtures.'
      },
      {
        topic: 'Inverse Functions and Exponential Relationships',
        competency: 'Deconstructing Inverse Functional Structures',
        lc: 'Determines inverse operations of mathematical mappings and verifies domain symmetry.',
        cs: 'Understand symmetry and logarithmic connections.',
        ps: 'Model compound interest models and half-life decay curves.'
      },
      {
        topic: 'Exponential Equations and Logarithmic Applications',
        competency: 'Resolving Transcendental Equations',
        lc: 'Applies properties of logarithms to simplify and solve complex exponential equations.',
        cs: 'Understand logarithmic definitions and base transmutations.',
        ps: 'Model earthquake Richter scale behaviors in local Region X scenarios.'
      },
      {
        topic: 'Logarithmic Functions and Graphing Dynamics',
        competency: 'Plotting Logarithmic Functional Trends',
        lc: 'Determines asymptotes, intercepts, and trends of logarithmic function curves.',
        cs: 'Understand graphing attributes and translations.',
        ps: 'Analyze sound intensity dB curves under noisy classroom conditions.'
      },
      {
        topic: 'Simple and Compound Interest Calculations',
        competency: 'Mastering Financial Mathematical Equations',
        lc: 'Compares simple vs. compound interest growth rates across differing investment timelines.',
        cs: 'Understand time-value of money algorithms.',
        ps: 'Draft a comparative investment projection table.'
      },
      {
        topic: 'Annuities, Stocks, and Bonds Evaluation',
        competency: 'Deconstructing Capital Investments',
        lc: 'Computes future values of ordinary annuities and evaluates stock dividend yields.',
        cs: 'Understand market trading indices and amortization metrics.',
        ps: 'Create an amortization table for teacher loan programs.'
      },
      {
        topic: 'Propositional Logic, Truth Tables, and Fallacies',
        competency: 'Analyzing Sentential Logical Truth States',
        lc: 'Constructs truth tables for compound statements involving conjunction, disjunction, and implication.',
        cs: 'Understand boolean expressions and formal syntax rules.',
        ps: 'Deconstruct marketing slogans using propositional logic proofs.'
      },
      {
        topic: 'Tautologies, Syllogisms, and Mathematical Induction',
        competency: 'Validating Logic Proofs & Syllogisms',
        lc: 'Demonstrates argument validity using rules of inference and truth-table logical checks.',
        cs: 'Understand valid vs. fallacious argument architectures.',
        ps: 'Write a 2-page induction proof for arithmetic series summation.'
      },
      {
        topic: 'Comprehensive Mathematical Modeling and Case Analysis',
        competency: 'Integrated Problem Solving Operations',
        lc: 'Applies algebraic and financial calculations to design a school-level business solution model.',
        cs: 'Understand multidisciplinary mathematical application principles.',
        ps: 'Present an executive financial prospectus with zero computational drift.'
      }
    ],
    Science: [
      {
        topic: 'Earth Systems, Minerals, and Geological Formations',
        competency: 'Deconstructing Earth\'s Crustal Compositions',
        lc: 'Explains chemical properties of minerals and maps rock-cycle transitions.',
        cs: 'Understand lithospheric dynamics and classification criteria.',
        ps: 'Identify geological specimens based on hardness and cleavage logs.'
      },
      {
        topic: 'Plate Tectonics and Volcanic Activity Mechanics',
        competency: 'Mapping Lithospheric Boundary Dynamics',
        lc: 'Delineates divergent, convergent, and transform plate boundaries and volcanic hazards.',
        cs: 'Understand seismological fault dynamics and magma behaviors.',
        ps: 'Construct a 3D clay model of active tectonic subductions.'
      },
      {
        topic: 'Atmospheric Circulation, Weather, and Climate Change',
        competency: 'Analyzing Global Meteorological Mappings',
        lc: 'Explains Coriolis effect, monsoonal wind changes, and green-house gas entrapments.',
        cs: 'Understand tropospheric convection currents and air masses.',
        ps: 'Draft a localized 10-day barometric weather forecast log.'
      },
      {
        topic: 'Ecosystem Dynamics and Biodiversity Conservation',
        competency: 'Analyzing Tropic Cascade Relationships',
        lc: 'Models energy flow and evaluates human disruptions in local Region X coral sanctuaries.',
        cs: 'Understand ecological pyramids and carbon/nitrogen cycles.',
        ps: 'Design a community-level biodiversity conservation plan.'
      },
      {
        topic: 'Chemical Bonding, Reactions, and Stoichiometry',
        competency: 'Balancing Chemical Reaction Formulas',
        lc: 'Applies conservation of mass to compute reactant mass and products under standard conditions.',
        cs: 'Understand ionic, covalent, and metallic bonds.',
        ps: 'Execute a virtual lab titration and calculate molarity values.'
      },
      {
        topic: 'Newtonian Physics and Gravitational Dynamics',
        competency: 'Resolving Kinematic Vector Equations',
        lc: 'Solves 1D and 2D projectile motion problems utilizing Newton\'s laws of motion.',
        cs: 'Understand vector addition, acceleration, and force balances.',
        ps: 'Build a safe toothpick bridge and analyze its load capacity limits.'
      },
      {
        topic: 'Introduction to Disaster Risk Reduction and Management',
        competency: 'Analyzing Socio-Economic Vulnerabilities',
        lc: 'Differentiates physical, social, and economic vulnerability indicators under typhoon strikes.',
        cs: 'Understand DRRM frameworks and administrative policies.',
        ps: 'Conduct a school building vulnerability survey and log hazards.'
      },
      {
        topic: 'Hazard Mapping and Evacuation Simulation Protocols',
        competency: 'Designing Local Safety Spatial Blueprints',
        lc: 'Plots flood, landslide, and fire vulnerability zones inside school perimeters.',
        cs: 'Understand emergency egress codes and safety spatial layouts.',
        ps: 'Draw a high-fidelity school safety egress blueprint.'
      },
      {
        topic: 'Community-Based DRRM Contingency Planning',
        competency: 'Formulating Actionable Disaster Protocols',
        lc: 'Drafts standard operating procedures for flood response within coastal barangays.',
        cs: 'Understand stakeholder collaboration and disaster response tiers.',
        ps: 'Simulate a table-top disaster drill with complete triage rosters.'
      },
      {
        topic: 'LNNCHS School Disaster Resilience Defense',
        competency: 'Defending Comprehensive Safety Plans',
        lc: 'Presents and defends community-wide resiliency plans before local officials.',
        cs: 'Understand municipal DRR codes and resource mobilization schemes.',
        ps: 'Deliver a final emergency preparedness campaign deck.'
      }
    ],
    AP: [
      {
        topic: 'Mga Isyung Pangkapaligiran at Disaster Risk Reduction',
        competency: 'Pagsusuri sa mga Isyung Pangkapaligiran at Katutubong Pamamahala',
        lc: 'Nasusuri ang mga suliraning pangkapaligiran sa sariling pamayanan at ang kahalagahan ng Community-Based Disaster Risk Reduction (CBDRRM).',
        cs: 'Nauunawaan ang mga sanhi at implikasyon ng mga hamong pangkapaligiran sa bansa.',
        ps: 'Nakabubuo ng community action plan para sa pangangalaga ng kapaligiran at kahandaan sa kalamidad.'
      },
      {
        topic: 'Globalisasyon at Pagbabagong Pang-ekonomiya',
        competency: 'Pagsusuri sa Konsepto at Epekto ng Globalisasyon',
        lc: 'Natataya ang mga implikasyon ng globalisasyon sa ekonomiya, kultura, at pambansang identidad.',
        cs: 'Nauunawaan ang ugnayan ng pandaigdigang kalakalan sa lokal na kabuhayan.',
        ps: 'Nakapagsusulat ng posisyong papel tungkol sa epekto ng globalisasyon sa mga magsasaka.'
      },
      {
        topic: 'Karapatang Pantao at Demokrasya sa Pilipinas',
        competency: 'Pagtataguyod ng Hustisyang Panlipunan',
        lc: 'Nasusuri ang kasalukuyang sitwasyon ng karapatang pantao at ang mga legal na proteksyon sa bansa.',
        cs: 'Nauunawaan ang mga karapatang sibil at pampolitika sa Konstitusyon.',
        ps: 'Nakabubuo ng kampanya para sa karapatan ng kababaihan at kabataan.'
      },
      {
        topic: 'Aktibong Pagkamamamayan at Sibil na Pakikilahok',
        competency: 'Papel ng Mamamayan sa Pamamahala',
        lc: 'Naipapaliwanag ang kahalagahan ng pakikilahok sa mga civil society organizations at local councils.',
        cs: 'Nauunawaan ang konsepto ng participatory governance.',
        ps: 'Nakikilahok sa isang simulated Barangay Assembly o municipal planning session.'
      },
      {
        topic: 'Kasaysayan at Kontemporaryong Isyu ng Mindanao',
        competency: 'Pagsusuri sa Kasaysayan at Kapayapaan sa Mindanao',
        lc: 'Naipapaliwanag ang pinagmulan ng sigalot at ang mga hakbang para sa pangmatagalang kapayapaan sa rehiyon.',
        cs: 'Nauunawaan ang kasaysayan ng Bangsamoro at kultural na pagkakaiba sa Mindanao.',
        ps: 'Nakabubuo ng peace advocacy poster at deklarasyon ng kapayapaan.'
      },
      {
        topic: 'Kahirapan at Sosyo-Ekonomikong Hamon',
        competency: 'Pagtugon sa Kahirapan at Kawalan ng Trabaho',
        lc: 'Nasusuri ang mga sanhi ng kahirapan at ang mga programa ng pamahalaan tulad ng 4Ps.',
        cs: 'Nauunawaan ang ugnayan ng edukasyon, trabaho, at pag-unlad ng bansa.',
        ps: 'Nakabubuo ng mungkahing proyektong pangkabuhayan para sa komunidad.'
      },
      {
        topic: 'Isyung Kasarian at Seksuwalidad',
        competency: 'Pagtataguyod ng Pagkakapantay-pantay ng Kasarian',
        lc: 'Nasusuri ang iba\'t ibang anyo ng diskriminasyon at ang kahalagahan ng Magna Carta of Women.',
        cs: 'Nauunawaan ang konsepto ng gender identity, SOGIE, at pantay na karapatan.',
        ps: 'Nakabubuo ng infographics o forum ukol sa paggalang sa pagkakaiba-iba ng kasarian.'
      },
      {
        topic: 'Edukasyon at Pagpapatatag ng Yamang Tao',
        competency: 'Pagsusuri sa Kalidad at Sistema ng Edukasyon',
        lc: 'Natataya ang mga hamon at reporma sa edukasyon tulad ng MATATAG at K-12 program.',
        cs: 'Nauunawaan ang karapatan sa de-kalidad na edukasyon at mga hamon sa pag-aaral.',
        ps: 'Sumusulat ng bukas na liham sa DepEd ukol sa mga mungkahi ng mag-aaral.'
      },
      {
        topic: 'Katiwalian at Mabuting Pamamahala (Good Governance)',
        competency: 'Pagsugpo sa Korapsyon at Pagtataguyod ng Integridad',
        lc: 'Nasusuri ang epekto ng katiwalian sa tiwala ng mamamayan at sa pambansang badyet.',
        cs: 'Nauunawaan ang tungkulin ng Ombudsman at mga batas laban sa graft.',
        ps: 'Nakabubuo ng audit scorecard o transparent rating para sa mga simulated public projects.'
      },
      {
        topic: 'Pambansang Pagkakaisa at Pag-unlad',
        competency: 'Pagbalangkas ng Vission para sa Kinabukasan',
        lc: 'Nagbabalangkas ng personal at kolektibong ambag para sa pag-unlad ng Pilipinas.',
        cs: 'Nauunawaan ang kahalagahan ng nasyonalismo at pagtutulungan.',
        ps: 'Nagpe-presenta ng 5-year development plan para sa sariling pamayanan.'
      }
    ],
    MAPEH: [
      {
        topic: 'Active Recreation and Physical Fitness Assesment',
        competency: 'Conducting Body Mass Index and Fitness Logging',
        lc: 'Measures and records baseline body metrics and designs a customized workout template.',
        cs: 'Understand guidelines of cardiovascular endurance and strength training.',
        ps: 'Log a 30-day physical fitness progress chart.'
      },
      {
        topic: 'Traditional and Contemporary Music in Region X',
        competency: 'Deconstructing Indigenous Melodic Patterns',
        lc: 'Analyzes rhythms, scales, and cultural instruments used in Bukidnon and Lanao sub-regions.',
        cs: 'Understand ethnomusicological structures and wind/percussion instruments.',
        ps: 'Perform a synchronized local percussion cadence using recycled items.'
      },
      {
        topic: 'Philippine Folk Dances and Creative Choreography',
        competency: 'Choreographing Rhythmic Dance Sequences',
        lc: 'Executes fundamental footsteps of traditional dances (Tinikling, Cariñosa, Singkil).',
        cs: 'Understand performance dimensions, costumes, and historical origins of folk dance.',
        ps: 'Perform a 2-minute choreographed folk fusion dance routine.'
      },
      {
        topic: 'Consumer Health and Product Reliability Evaluations',
        competency: 'Analyzing Health Supplement Claims',
        lc: 'Evaluates nutritional panels and screens marketing jargon for deceptive packaging.',
        cs: 'Understand municipal food and drug codes.',
        ps: 'Draft a warning bulletin regarding unverified local health remedies.'
      },
      {
        topic: 'Mental Health Awareness and Stress Reduction',
        competency: 'Developing Cognitive Resilience Plans',
        lc: 'Identifies chronic stress symptoms and models positive psychological coping strategies.',
        cs: 'Understand chemical pathways of stress and psychological hygiene guidelines.',
        ps: 'Design a classroom-level mental health wellness board.'
      },
      {
        topic: 'Emergency First Aid and Wilderness Triage Roster',
        competency: 'Applying Cardiopulmonary Resuscitation Protocols',
        lc: 'Demonstrates proper bandaging, splinting, and triage classification under simulated emergencies.',
        cs: 'Understand guidelines of basic life support and trauma response.',
        ps: 'Execute a full trauma simulation drill successfully.'
      },
      {
        topic: 'Contemporary Graphic Designs and Local Art Heritage',
        competency: 'Designing Modern Digital Visuals',
        lc: 'Applies vector design theories to produce values-based posters incorporating local motifs.',
        cs: 'Understand visual hierarchy and color harmony rules.',
        ps: 'Submit a digital high-fidelity values poster artwork.'
      },
      {
        topic: 'Athletics, Track and Field, and Team Coordination',
        competency: 'Analyzing Biomechanical Motion Limits',
        lc: 'Identifies errors in running stance or relay passing coordination to maximize speed.',
        cs: 'Understand kinematic efficiency and athletic safety policies.',
        ps: 'Conduct a biomechanical running analysis for peers.'
      },
      {
        topic: 'Epidemic Disease Prevention and Family Hygiene',
        competency: 'Formulating Local Disease Mitigation Plans',
        lc: 'Models vector control strategies to reduce local dengue breeding sites in school premises.',
        cs: 'Understand epidemiologic triads and public health sanitation codes.',
        ps: 'Draft a vector eradication campaign plan.'
      },
      {
        topic: 'Community Environmental Sanitation and Health Auditing',
        competency: 'Evaluating Water Safety Metrics',
        lc: 'Measures pH and water turbidity levels in local runoff sites and designs safe filters.',
        cs: 'Understand sanitary waste management rules.',
        ps: 'Deliver a final municipal water sanitation audit report.'
      }
    ],
    TLE: [
      {
        topic: 'Introduction to Technical Drafting and AutoCAD Interface',
        competency: 'Navigating Coordinate Entry and Sketch Rules',
        lc: 'Configures drawing grids, layouts, and plots basic geometries using computer-aided tools.',
        cs: 'Understand technical drawing codes, standards, and scale factor math.',
        ps: 'Generate a clean orthographic projections layout of a machine part.'
      },
      {
        topic: 'Computer Hardware Servicing and Diagnostic Procedures',
        competency: 'Executing Motherboard Assembly Protocols',
        lc: 'Performs static-safe hardware installations, CPU mounting, and basic BIOS configurations.',
        cs: 'Understand operating system installation requirements and diagnostic metrics.',
        ps: 'Successfully debug a non-POSTing hardware assembly.'
      },
      {
        topic: 'Home Economics: Culinary Sanitation and Knife Safety',
        competency: 'Mastering Professional Knife Cut Geometries',
        lc: 'Executes julienne, chiffonade, and brunoise cuts with high safety focus.',
        cs: 'Understand hazard analysis and critical control point (HACCP) rules.',
        ps: 'Complete a vegetable mise-en-place roster with zero injuries.'
      },
      {
        topic: 'Agricultural Crop Production and Soil Quality Analysis',
        competency: 'Measuring Soil pH and Nutrient Balances',
        lc: 'Executes soil tests and formulates custom organic compost blends based on deficiencies.',
        cs: 'Understand agricultural farming principles and crop rotation cycles.',
        ps: 'Establish a productive vertical vegetable crop row.'
      },
      {
        topic: 'Electrical Installation, Maintenance, and Circuit Wiring',
        competency: 'Wiring 3-Way Switch System Circuits',
        lc: 'Installs non-metallic sheathed cables, junction boxes, and validates terminal loops.',
        cs: 'Understand national electrical safety standards.',
        ps: 'Successfully wire a fully functional 2-light hallway circuit board.'
      },
      {
        topic: 'Robotics and Embedded Microcontroller Systems',
        competency: 'Programming Basic Sensor Loop Triggers',
        lc: 'Programs microcontrollers to collect analog inputs from proximity sensors and route outputs.',
        cs: 'Understand logic gates, memory configurations, and digital operations.',
        ps: 'Assemble a safe autonomous obstacle-avoiding robot model.'
      },
      {
        topic: 'Beauty Care, Cosmetology, and Client Hygiene Policies',
        competency: 'Executing Professional Nail Shaping and Care',
        lc: 'Applies sanitation rules to shape, buff, and detail nails cleanly.',
        cs: 'Understand toxicological safety limits of cosmetological products.',
        ps: 'Complete a client safety cosmetic scorecard with zero issues.'
      },
      {
        topic: 'Plumbing Services and Pipe Joint Assemblage',
        competency: 'Cutting and Joining PVC and Galvanized Pipes',
        lc: 'Measures, threads, and solvent-welds pipe networks to withstand standard pressures.',
        cs: 'Understand building plumbing standards and water distribution layout rules.',
        ps: 'Assemble a leak-proof dual-fixture drainage pipe model.'
      },
      {
        topic: 'Automotive Servicing and Internal Combustion Tune-ups',
        competency: 'Measuring Spark Plug Gap Clearances',
        lc: 'Uses feeler gauges to set spark plug gaps and checks fuel delivery lines.',
        cs: 'Understand four-stroke engine cycle mechanics.',
        ps: 'Diagnose and repair a simulated engine misfire.'
      },
      {
        topic: 'Entrepreneurship and Business Proposal Planning',
        competency: 'Drafting Actionable Micro-Enterprise Plans',
        lc: 'Creates costing matrices, break-even graphs, and marketing rosters for local ventures.',
        cs: 'Understand micro-finance regulations and trade laws.',
        ps: 'Present a viable 5-page startup business prospectus.'
      }
    ],
    ESP: [
      {
        topic: 'Paggalang sa Dignidad at Karapatan ng Kapwa',
        competency: 'Pagsusuri sa Konsepto ng Likas na Dignidad ng Tao',
        lc: 'Naipapaliwanag ang kahalagahan ng pagkilala sa dignidad ng bawat tao anuman ang estado sa buhay.',
        cs: 'Nauunawaan ang mga batayan ng paggalang sa kapwa.',
        ps: 'Nakabubuo ng resolusyon ukol sa pagwawakas ng bullying sa silid-aralan.'
      },
      {
        topic: 'Mapanuring Pag-iisip at Paghahanap sa Katotohanan',
        competency: 'Pagsala sa Fake News at Maling Impormasyon sa Social Media',
        lc: 'Natutukoy ang kahalagahan ng katotohanan at etika sa pagbabahagi ng balita.',
        cs: 'Nauunawaan ang mga pamantayan sa kritikal na pagsusuri.',
        ps: 'Nakabubuo ng fact-checking matrix para sa mga nababasang post.'
      },
      {
        topic: 'Katatagan ng Loob at Pagharap sa mga Hamon sa Buhay',
        competency: 'Paglinang sa Positibong Psychological Hygiene',
        lc: 'Nailalahad ang mga konkretong hakbang upang mapanatili ang kapayapaan ng isip sa gitna ng suliranin.',
        cs: 'Nauunawaan ang mga salik ng emosyonal na kalusugan.',
        ps: 'Gumagawa ng personal wellness journal at coping strategy board.'
      },
      {
        topic: 'Pagmamahal sa Bayan at Aktibong Pakikilahok sa Komunidad',
        competency: 'Pagbuo ng Diwa ng Nasyonalismo',
        lc: 'Nasusuri ang sariling tungkulin sa pagpapanatili ng kapayapaan at kaayusan sa bansa.',
        cs: 'Nauunawaan ang mga tungkulin ng mamamayan sa ilalim ng Saligang Batas.',
        ps: 'Nakikilahok sa isang simulated volunteer project o community sweep.'
      },
      {
        topic: 'Pangangalaga sa Kalikasan bilang Katiwala ng Likha',
        competency: 'Etikal na Pamamahala sa Kapaligiran',
        lc: 'Naipapaliwanag ang pananagutan ng tao sa pangangalaga sa mga likas na yaman para sa susunod na henerasyon.',
        cs: 'Nauunawaan ang mga prinsipyo ng stewardship at ecological ethics.',
        ps: 'Nagpapatupad ng waste segregation campaign sa sariling tahanan.'
      },
      {
        topic: 'Pananampalataya at Ispiritwalidad sa Gitna ng Pagkakaiba',
        competency: 'Pagpapakita ng Paggalang sa Iba\'t Ibang Relihiyon',
        lc: 'Nasusuri ang ugnayan ng pananampalataya sa paggawa ng kabutihan at pagpapakita ng paggalang sa paniniwala ng iba.',
        cs: 'Nauunawaan ang kalayaan sa pananampalataya at interfaith harmony.',
        ps: 'Nakabubuo ng isang interfaith peace declaration.'
      },
      {
        topic: 'Katapatan sa Salita at sa Gawa (Integridad)',
        competency: 'Pagpapanatili ng Personal na Karangalan',
        lc: 'Naipapamalas ang katapatan sa lahat ng pagkakataon, lalo na sa akademiko at pag-aaral.',
        cs: 'Nauunawaan ang konsepto ng plagiarism, pangongopya, at moral na integridad.',
        ps: 'Lumalagda sa isang simulated Integrity Pledge para sa buong taon.'
      },
      {
        topic: 'Matalinong Paggamit ng Oras at Career Planning',
        competency: 'Pagbalangkas ng Plano para sa Kinabukasan',
        lc: 'Natutukoy ang sariling hilig, talento, at kakayahan na angkop sa pipiliing kurso o trabaho.',
        cs: 'Nauunawaan ang kahalagahan ng time management at goal setting.',
        ps: 'Nakabubuo ng Career Road Map para sa susunod na 5 taon.'
      },
      {
        topic: 'Katarungang Panlipunan at Pagkakapantay-pantay',
        competency: 'Pagtulong sa mga Nangangailangan at Marginalized',
        lc: 'Naipapahayag ang kahalagahan ng pagtulong nang walang hinihintay na kapalit sa mga kapus-palad.',
        cs: 'Nauunawaan ang kahalagahan ng equity at social justice.',
        ps: 'Nag-oorganisa ng isang simulated charity o peer tutoring circle.'
      },
      {
        topic: 'Mapayapang Paglutas sa mga Alitan (Conflict Resolution)',
        competency: 'Paglinang sa Kakayahan sa Negosasyon at Kapayapaan',
        lc: 'Naipapakita ang mga pamamaraan ng mapayapang negosasyon upang maiwasan ang pisikal na sakitan.',
        cs: 'Nauunawaan ang mga prinsipyo ng restorative justice at mediation.',
        ps: 'Sumusulat ng iskrip na nagpapakita ng matagumpay na mediation ng guro o kaklase.'
      }
    ]
  };

  const activeSyllabus = topicsMap[subjectCategory] || topicsMap['English'];

  const results: ILAWBOWEntry[] = [];
  const termNumber = term === 'Term 1' ? 1 : term === 'Term 2' ? 2 : 3;

  for (let w = 1; w <= 10; w++) {
    const topicIdx = (w - 1) % activeSyllabus.length;
    const item = activeSyllabus[topicIdx];

    results.push({
      grade,
      subject,
      term,
      termNumber,
      week: w,
      weekLabel: `Linggo ${w}`,
      hours: 4,
      sessions: 4,
      code: `${grade.substring(0, 5).replace(' ', '')}-${subjectCategory}${grade.substring(6)}-T${termNumber}-W${w}`,
      topic: item.topic,
      competency: item.competency,
      learningCompetency: item.lc,
      contentStandard: item.cs,
      performanceStandard: item.ps,
      enablingCompetencies: `1. Natutukoy ang mga pangunahing konseptong may kinalaman sa ${item.topic}. 2. Nasusuri ang mga halimbawa sa komunidad.`,
      subjectCategory,
      s1: `Elicit: Pagpapakita ng panimulang larawan o sitwasyon. Engage: Maikling diskusyon sa silid-aralan ukol sa karanasan ng mag-aaral.`,
      s2: `Explore: Pangkatang talakayan ng mga gabay na tanong. Explain: Pormal na pagtalakay sa paksa: ${item.topic}.`,
      s3: `Elaborate: Indibidwal na pagsagot sa isang mini-worksheet o pagsasagawa ng praktikal na gawain.`,
      s4: `Evaluate: Formative evaluation gamit ang 5-item multiple choice test at pagmamarka sa inihandang rubriko.`,
      lasBg: `Ang paksang ito ay naglalayong talakayin ang ${item.topic} upang ihanda ang mga mag-aaral sa paggamit ng kanilang kaisipan sa mga praktikal na sitwasyon sa buhay.`,
      lasA1: `Sumulat ng isang talata na nagpapaliwanag sa iyong sariling opinyon tungkol sa kahalagahan ng ${item.topic}.`,
      lasA2: `Gumawa ng graphic organizer na nagbubuod sa mga pangunahing ideya na natalakay sa ating klase.`,
      lasA3: `Magbigay ng 3 halimbawa ng aplikasyon ng ${item.topic} na iyong naoobserbahan sa loob ng iyong tahanan o barangay.`
    });
  }

  return results;
}
