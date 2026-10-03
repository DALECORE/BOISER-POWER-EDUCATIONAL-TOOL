import { ILAWBOWEntry } from '../data/ilawBOWDatabase';
import { ILAWCompletePlan, ILAWLearningActivitySheet, ILAWSlide } from '../types/ilawDO3';
import { computeSessionDates } from '../data/calendarConfig';

interface PlanGenerationOptions {
  entry: ILAWBOWEntry;
  teacher: string;
  school: string;
  section: string;
  dates: string;
  division?: string;
  region?: string;
  lessonTitle?: string;
  startDate?: string;
  holidays?: string[];
  sessions?: number;
}

export function generateDO3PlanFromBOWEntry(options: PlanGenerationOptions): ILAWCompletePlan {
  const {
    entry,
    teacher,
    school,
    section,
    dates,
    division = 'Division of Lanao del Norte',
    region = 'Region X – Northern Mindanao',
    lessonTitle,
    startDate,
    holidays = [],
    sessions: requestedSessions
  } = options;

  const sessionCount = requestedSessions || entry.sessions || 4;
  const actualTitle = lessonTitle && lessonTitle.trim() !== '' ? lessonTitle : entry.topic;

  // Compute session dates
  let sessionDateStrings: string[] = Array.from({ length: sessionCount }, (_, i) => `Session ${i + 1}`);
  if (startDate) {
    const datesList = computeSessionDates(startDate, entry.week, holidays, sessionCount);
    if (datesList && datesList.length > 0) {
      sessionDateStrings = datesList.map(d =>
        d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      );
    }
  }

  // Generate dynamic Session Objectives
  const objectives = Array.from({ length: sessionCount }, (_, i) => {
    const sNum = i + 1;
    const sDate = sessionDateStrings[i] || `Session ${sNum}`;
    
    if (sNum === 1) {
      return {
        sessionNumber: 1,
        sessionDate: sDate,
        objectives: [
          `Identify and define foundational principles of ${actualTitle}.`,
          `Examine real-life applications and context within ${entry.subject}.`,
          'Demonstrate active engagement and collaborative problem analysis.'
        ]
      };
    }
    if (sNum === sessionCount) {
      return {
        sessionNumber: sNum,
        sessionDate: sDate,
        objectives: [
          `Evaluate practical mastery and produce the standalone individual written output.`,
          'Reflect on personal learning progress and practical career or civic application.'
        ]
      };
    }
    return {
      sessionNumber: sNum,
      sessionDate: sDate,
      objectives: [
        `Analyze core structures, models, and elements of ${entry.topic}.`,
        'Execute guided collaborative exploration using contextualized graphic organizers or case studies.'
      ]
    };
  });

  // Subject-specific activity generator
  const activitySheets: ILAWLearningActivitySheet[] = Array.from({ length: sessionCount }, (_, i) => {
    const sNum = i + 1;
    const sDate = sessionDateStrings[i] || `Session ${sNum}`;
    return createActivitySheetForSubject(entry, actualTitle, sNum, sDate);
  });

  // Presentation slides
  const presentationSlides: ILAWSlide[] = createSlidesForPlan(entry, actualTitle, teacher, school, sessionDateStrings);

  return {
    id: `ilaw-${entry.grade.toLowerCase().replace(/\s+/g, '-')}-${entry.subject.toLowerCase().replace(/\s+/g, '-')}-t${entry.termNumber}-w${entry.week}`,
    header: {
      lesson: actualTitle,
      learningArea: entry.subject,
      teacher: teacher,
      contentEvaluator: 'Content Evaluator: ____________________',
      languageEvaluator: 'Language Evaluator: ____________________',
      formatEvaluator: 'Format and Layout Evaluator: ____________________',
      school: school,
      division: division,
      region: region,
      gradeLevelAndSection: `${entry.grade} - ${section}`,
      gradeBand: entry.grade.includes('11') || entry.grade.includes('12') ? '11-12' : '7-10',
      term: entry.termNumber,
      bowWeek: `${entry.weekLabel} (${entry.hours} Hours)`,
      inclusiveTeachingDates: dates,
      numberOfSessions: sessionCount,
      references: [
        `DepEd Strengthened Senior High School Curriculum Guide (${entry.subject})`,
        `DepEd Order No. 009, s. 2026 (Three-Term Calendar and Trimester Policy)`,
        `DepEd Order No. 3, s. 2026 (Instructional Leadership and Academic Workflow)`,
        `Official Budget of Work (BOW) — ${entry.grade} ${entry.subject}`
      ],
      declarationOfAIUse:
        'This lesson plan was formulated with the assistance of artificial intelligence tools in drafting, structuring, and organizing competencies, learning tasks, guide questions, and assessment blueprints in compliance with DepEd Order No. 3, s. 2026 Annex A. The teacher-developer thoroughly reviewed, adapted, contextualized, and takes full professional accountability for its pedagogical integrity and alignment with learner needs and curriculum standards.'
    },
    matrix: {
      intentions: `The ${sessionCount}-session learning cycle aims to guide learners in mastering ${actualTitle} within ${entry.subject}. Through contextualized inquiries, collaborative workshops, and structured individual outputs, learners develop critical thinking, disciplinary competence, and authentic real-world problem-solving abilities aligned with DepEd 2026 standards.`,
      competency: {
        melc: entry.learningCompetency,
        content: entry.topic,
        contentStandard: entry.contentStandard,
        performanceStandard: entry.performanceStandard
      },
      objectives: objectives,
      learnerContext: `Learners in ${section} demonstrate diverse socio-economic, linguistic, and academic readiness. Instruction employs multi-tiered scaffolding, high-contrast visual materials, collaborative group structures, and differentiated inquiry challenges to guarantee universal access and mastery.`,
      learningExperience: Array.from({ length: sessionCount }, (_, i) => {
        const sNum = i + 1;
        const sDate = sessionDateStrings[i] || `Session ${sNum}`;
        return {
          sessionNumber: sNum,
          sessionDate: sDate,
          preLesson: {
            engage: {
              time: '10 mins',
              activity: sNum === 1 ? (entry.s1.split('Engage:')[1]?.trim() || `Introductory provocation and multimedia exemplar connecting to ${actualTitle}.`) : `Recap of previous session key concepts through a rapid flash-inquiry game.`
            },
            elicit: {
              time: '10 mins',
              activity: sNum === 1 ? (entry.s1.split('Engage:')[0]?.replace('Elicit:', '').trim() || `Diagnostic check: Activating prior knowledge regarding ${entry.topic}.`) : `Targeted questioning examining theoretical nuances and structural models.`,
              expectedResponses: 'Learners draw upon everyday experiences, prior grade concepts, and regional community practices.'
            }
          },
          flow: {
            explore: {
              time: '25 mins',
              groupActivity: {
                formatType: sNum === 1 ? 'Collaborative Problem Analysis' : 'Matrix Analysis & Workshop Practicum',
                title: `Group Investigation: Deconstructing ${actualTitle}`,
                instructions: 'Work in assigned clusters of 4-5 members to analyze the provided case scenario and record findings on the group matrix.'
              },
              individualOutput: {
                outputType: sNum === sessionCount ? 'Summative Written Output & Reflection' : 'Written Conceptual Map / Analytical Worksheet',
                title: sNum === sessionCount ? 'Mastery Assessment & Reflective Journal' : 'Personal Learning Synthesis',
                instructions: sNum === sessionCount ? 'Complete the individual performance assessment task and write a 250-word synthesis of insights gained.' : 'Individually record the core definitions and draft one concrete real-world example from your own household or community.'
              }
            },
            explain: {
              time: '15 mins',
              synthesisQuestions: [
                `What are the critical elements of ${actualTitle}?`,
                'How does understanding this concept prevent common errors or misunderstandings in everyday life?',
                'In what ways does this topic connect to your chosen academic or TechPro track?'
              ]
            }
          },
          learningResources: [
            'DepEd Learner Material',
            `Contextualized Activity Sheet (LAS ${sNum})`,
            'Audio-visual presentation slide deck'
          ],
          opportunitiesForIntegration: [
            { area: 'Values & Ethics', connection: 'Practicing intellectual honesty, constructive peer critique, and active listening.' },
            { area: 'Career & TechPro', connection: 'Relating analytical thinking to industrial standards and professional competence.' }
          ]
        };
      }),
      assessment: Array.from({ length: sessionCount }, (_, i) => ({
        sessionNumber: i + 1,
        sessionDate: sessionDateStrings[i] || `Session ${i + 1}`,
        formativeTask: `Session ${i + 1} Formative Check: Active completion of LAS ${i + 1} tasks and rubric-scored output.`,
        guidanceAndSupport: 'Provide step-by-step scaffolds, sentence starters, or worked-out examples for developing learners.',
        accommodations: 'Extend time limits by 10 minutes and offer bilingual Filipino/English prompts where beneficial.'
      })),
      waysForward: {
        extendedLearningOpportunities: [
          'Encourage learners to interview local professionals or barangay officials regarding real-world application.',
          'Provide supplemental digital resources and advanced case studies via the class learning management folder.',
          'Facilitate peer mentoring circles pairing proficient students with peers needing remediation.'
        ],
        reflections:
          'Teacher notes on instructional timing, learner engagement levels, common misconceptions identified, and adjustments planned for the succeeding week.'
      }
    },
    activitySheets: activitySheets,
    presentationSlides: presentationSlides
  };
}

function createActivitySheetForSubject(
  entry: ILAWBOWEntry,
  title: string,
  sessionNum: number,
  sessionDate: string
): ILAWLearningActivitySheet {
  const isFilipino = entry.subjectCategory === 'Filipino';
  const subCategory: string = (entry.subjectCategory || 'Filipino') as string;
  const subName = entry.subject.toLowerCase();

  // Part B.9 Subject-Contextualized Activity Formats
  let formatType = 'Structured Scenario & Case Matrix';
  let scenarioPrompt = isFilipino
    ? `Suriin ang sitwasyong may kinalaman sa ${title}. Pag-usapan sa grupo ang mga sanhi, epekto, at mga mungkahing solusyon.`
    : `Analyze the provided case scenario regarding ${title}. Discuss within your cluster the root mechanisms, stakeholder impacts, and strategic solutions.`;
  let tableHeaders = isFilipino
    ? ['Aspeto ng Pagsusuri', 'Pangyayari / Sitwasyon', 'Pagpapaliwanag ng Grupo', 'Rekomendasyon']
    : ['Analysis Dimension', 'Observed Phenomenon', 'Group Interpretation', 'Actionable Recommendation'];
  let tableRows = [
    ['Foundational Factor', 'Observed in baseline scenario', 'Indicates systemic variable interaction', 'Standardize initial parameters'],
    ['Operational Mechanism', 'Applied during workflow execution', 'Reveals critical leverage points', 'Implement continuous monitoring'],
    ['Impact & Sustainability', 'Post-implementation assessment', 'Confirms positive alignment with goals', 'Document lessons learned']
  ];
  let partBOutputType = 'Critical Reflection & Written Problem Set';

  if (subCategory === 'Filipino' || subName.includes('komunikasyon') || subName.includes('filipino') || subName.includes('panitikan')) {
    formatType = 'Madulang Pagsasadula / Speech Choir / Pagtatalong Pampanitikan (Debate)';
    scenarioPrompt = `Gawain: Magsagawa ng pangkatang pagpapamalas (dula-dulaan, sabayang pagbigkas, o debate) batay sa sitwasyon ng ${title}. Pag-aralan ang tono, persona, at nilalaman ng mensahe bago itanghal.`;
    tableHeaders = ['Karakter / Tungkulin', 'Sitwasyong Pangkomunikasyon', 'Paraan ng Pagpapahayag (Tono/Salita)', 'Etikal na Pamantayan'];
    tableRows = [
      ['Tagapagsalita / Mananalumpati', 'Pormal na pagpupulong ng komunidad', 'Kagalang-galang at may paninindigan', 'Katapatan sa datos at ebidensya'],
      ['Tagapakinig / Tagasuri', 'Open forum at pagtatanong', 'Mapanuri at magalang', 'Bukas ang isip sa magkakaibang pananaw'],
      ['Moderator / Tagapamagitan', 'Pagkakaroon ng debate o tensyon', 'Walang pinapanigan at kalmado', 'Pantay na pagbibigay ng pagkakataon']
    ];
    partBOutputType = 'Indibidwal na Spoken-Word / Malikhaing Sanaysay (150–200 salita)';
  } else if (subCategory === 'Social Studies' || subCategory === 'AP' || subName.includes('araling panlipunan') || subName.includes('history') || subName.includes('kasaysayan')) {
    formatType = 'Timeline Reconstruction, Historical Tableau & Mock Tribunal';
    scenarioPrompt = `Cluster Task: Reconstruct the historical/social timeline of ${title}. Examine primary source evidence and enact a structured mock inquiry to evaluate policy impacts.`;
    tableHeaders = ['Historical Period / Event', 'Primary Evidence Source', 'Stakeholder Perspective', 'Institutional & Policy Impact'];
    tableRows = [
      ['Pre-Reform Context', 'Official archival records & decrees', 'Agricultural & grassroots workers', 'Structural resource imbalances'],
      ['Transition Phase', 'Legislative bills & treaties', 'Reform advocates & state officials', 'Establishment of new regulatory bodies'],
      ['Contemporary Era', 'Modern socio-economic indices', 'Regional Filipino communities', 'Sustainable democratic governance']
    ];
    partBOutputType = 'Primary-Source Analytical Essay & Citizen Reflection';
  } else if (subCategory === 'Science' || subName.includes('science') || subName.includes('agham') || subName.includes('chemistry') || subName.includes('biology')) {
    formatType = 'Hands-On Scientific Investigation, Lab Simulation & Data Gathering';
    scenarioPrompt = `Laboratory Investigation: Conduct structured empirical observations on ${title}. Record quantitative variables in the lab station matrix and verify hypothesis models.`;
    tableHeaders = ['Experimental Trial / Variable', 'Measured Observation', 'Theoretical Principle', 'Error Analysis & Control'];
    tableRows = [
      ['Baseline Control Trial', 'Controlled room temperature & pressure', 'Standard stoichiometric equilibrium', 'Calibrated sensor precision'],
      ['Experimental Treatment A', 'Altered concentration parameter (+25%)', 'Kinetic collision rate elevation', 'Triplicate trial averaging'],
      ['Experimental Treatment B', 'Altered catalyst environment', 'Reduced activation energy barrier', 'Isolated system boundary control']
    ];
    partBOutputType = 'Laboratory Experiment Report & Individual Data Analysis';
  } else if (subCategory === 'Mathematics' || subCategory === 'Math' || subName.includes('math') || subName.includes('calculus') || subName.includes('statistics')) {
    formatType = 'Guided Problem Sets, Computation Stations & Real-World Modeling';
    scenarioPrompt = `Mathematical Modeling Station: Solve multi-step applied equations for ${title}. Conduct peer error-analysis on student sample solutions before formulating optimized models.`;
    tableHeaders = ['Applied Scenario Station', 'Given Parameters & Formula', 'Computed Mathematical Solution', 'Real-World Interpretation'];
    tableRows = [
      ['Station 1: Linear Optimization', 'Revenue function R(x) & cost C(x)', 'Critical break-even threshold calculated', 'Optimal production quota for local SME'],
      ['Station 2: Exponential Growth', 'Population decay model P(t) = P0*e^(kt)', 'Half-life interval derived step-by-step', 'Resource depletion timeline forecast'],
      ['Station 3: Statistical Variance', 'Standard deviation & normal curve z-score', 'Confidence interval 95% verified', 'Quality assurance standard compliance']
    ];
    partBOutputType = 'Independent Step-by-Step Problem Solving & Error Analysis Journal';
  } else if (subCategory === 'TechPro' || subCategory === 'TVL' || subCategory === 'TLE' || subName.includes('tle') || subName.includes('epp') || subName.includes('techpro')) {
    formatType = 'Hands-On Skill Demonstration & Technical Product-Making';
    scenarioPrompt = `Workplace Practicum: Execute standardized workshop procedures for ${title}. Follow occupational safety directives (PPE), calibrate tools, and assemble output specification.`;
    tableHeaders = ['Technical Step / Standard', 'Tool / Equipment Utilized', 'Quality & Tolerance Check', 'Safety & Environmental Protocol'];
    tableRows = [
      ['Preparation & Layout', 'Precision vernier caliper & rule', 'Exact dimensional tolerance (±0.5mm)', 'Zero-debris workbench clearance'],
      ['Fabrication / Execution', 'Approved workshop machine / circuit kit', 'Proper operating speed & feed rate', 'Emergency shut-off mechanism verified'],
      ['Finishing & Quality Audit', 'Multimeter / Inspection gauge', 'DepEd standard specification met', 'Waste sorting & tool turnover completed']
    ];
    partBOutputType = 'Individual Technical Logbook & Job Order Costing Sheet';
  } else if (subCategory === 'MAPEH' || subName.includes('mapeh') || subName.includes('pe') || subName.includes('music') || subName.includes('arts')) {
    formatType = 'Movement / Performance Exhibition & Health Case Analysis';
    scenarioPrompt = `Performance Studio: Execute choreographed physical movement or creative arts composition representing ${title}. Conduct peer biomechanical or aesthetic audits.`;
    tableHeaders = ['Performance Element', 'Choreographic / Artistic Action', 'Biomechanical / Aesthetic Quality', 'Health & Safety Integration'];
    tableRows = [
      ['Rhythmic Dynamic Warm-up', 'Cardiovascular aerobic coordination', 'Target heart rate zone achieved', 'Hydration & joint alignment focus'],
      ['Core Skill Execution', 'Rhythmic routine / vocal cadence', 'Spatial awareness and synchronicity', 'Proper posture & injury prevention'],
      ['Cool-down & Critique', 'Low-intensity static stretching', 'Reflective artistic interpretation', 'Metabolic recovery & cool-down logged']
    ];
    partBOutputType = 'Individual Fitness / Artistic Journal & Health Reflection';
  } else if (subCategory === 'Values' || subCategory === 'ESP' || subName.includes('esp') || subName.includes('values')) {
    formatType = 'Values-Clarification Discussion Circle & Ethical Role-Play';
    scenarioPrompt = `Values Circle: Reflect on ethical dilemmas involving ${title}. Discuss moral agency, community solidarity, and character virtues in your peer cluster.`;
    tableHeaders = ['Moral Dilemma Scenario', 'Stakeholder Conflicting Values', 'Core Ethical Principle (DepEd)', 'Action Plan with Integrity'];
    tableRows = [
      ['Dilemma 1: Peer Pressure vs Honesty', 'Belongingness vs Academic Truth', 'Maka-Diyos / Katapatan', 'Stand firm with respectful dialogue'],
      ['Dilemma 2: Resource Sharing in Need', 'Personal ownership vs Empathy', 'Makatao / Bayanihan', 'Collaborative community food pantry'],
      ['Dilemma 3: Environmental Responsibility', 'Convenience vs Conservation', 'Makakalikasan', 'Zero single-use plastic habit in school']
    ];
    partBOutputType = 'Personal Moral Compass Journal & Commitment Pledge';
  }

  return {
    sessionNumber: sessionNum,
    sessionDate: sessionDate,
    activityTitle: isFilipino
      ? `Gawain sa Pagkatuto Blg. ${sessionNum}: ${title}`
      : `Learning Activity Sheet ${sessionNum}: ${title}`,
    objectives: [
      isFilipino
        ? `1. Naipapaliwanag ang mga pangunahing konsepto ng ${title}.`
        : `1. Explain the fundamental concepts and principles of ${title}.`,
      isFilipino
        ? `2. Naisasagawa ang pangkatang pagsusuri (${formatType}) at nakagagawa ng indibidwal na awtput (${partBOutputType}).`
        : `2. Execute collaborative inquiry (${formatType}) and independently complete the written mastery output (${partBOutputType}).`
    ],
    materials: [
      isFilipino ? 'Kuwaderno, bolpen, modyul ng aralin' : 'Learning module, activity worksheet, writing materials',
      'DepEd Order No. 3, s. 2026 Reference Materials',
      'DepEd Strengthened SHS 2026 Subject Curriculum Guide'
    ],
    instruction: isFilipino
      ? 'Basahin at unawaing mabuti ang bawat bahagi. Isagawa ang Pangkatang Gawain (Bahagi A) kasama ang inyong grupo, at tapusin ang Indibidwal na Awtput (Bahagi B) nang may katapatan at husay.'
      : 'Read all sections carefully. Collaborate with your assigned cluster on Part A, and independently complete the written requirements for Part B adhering to high academic standards.',
    partAGroup: {
      title: isFilipino ? `Bahagi A: Pangkatang Gawain — ${formatType}` : `Part A: Collaborative Group Task — ${formatType}`,
      formatType: formatType,
      scenarioOrPrompt: scenarioPrompt,
      tableData: {
        headers: tableHeaders,
        rows: tableRows
      },
      guidingQuestions: isFilipino
        ? [
            '1. Ano ang pangunahing suliranin o kaisipan na ipinapakita sa sitwasyon?',
            '2. Paano nakaaapekto ang mga elemento ng aralin sa resulta ng gawain?',
            '3. Anong pagpapahalaga (values) ang dapat pairalin sa ganitong kalagayan?'
          ]
        : [
            '1. What is the root cause or core mechanism illustrated in the case?',
            '2. How do the theoretical principles directly influence real-world outcomes in this context?',
            '3. What preventive measures or ethical considerations must be established by the practitioners?'
          ]
    },
    partBIndividual: {
      title: isFilipino ? `Bahagi B: Indibidwal na Awtput — ${partBOutputType}` : `Part B: Individual Output — ${partBOutputType}`,
      outputType: partBOutputType,
      taskPrompt: isFilipino
        ? `Batay sa inyong natutuhan, sumulat ng isang komprehensibong paliwanag o solusyon (150–200 salita) kung paano mo ilalapat ang ${title} sa iyong sariling buhay at kinabukasan.`
        : `Based on your learning, compose an evidence-based synthesis (150–200 words) articulating how you will apply ${title} to professional, civic, or academic challenges.`,
      analysisChallenge: isFilipino
        ? [
            '1. Magbigay ng 2 tiyak na halimbawa kung paano nakatutulong ang araling ito sa iyong pang-araw-araw na gawain.',
            '2. Ipaliwanag ang pinakamahalagang aral na iyong natutuhan sa sesyong ito.',
            '3. Bakit mahalaga ang pagsunod sa pamantayang etikal sa larangang ito?'
          ]
        : [
            '1. Formulate two concrete scenarios where applying this competency prevents significant operational or communication failure.',
            '2. Articulate the single most critical insight you developed during this session.',
            '3. Explain how this knowledge aligns with ethical and professional standards in modern Philippine society.'
          ]
    },
    answerKey: {
      partAAnswers: isFilipino
        ? [
            '1. Sagot sa Sitwasyon: Ang pangunahing suliranin ay ang kakulangan ng pagsasaalang-alang sa persona at konteksto ng kausap, na nagdudulot ng miskomunikasyon.',
            '2. Sagot sa Elemento: Ang wika, tono, at espasyo ay nagdidikta kung paano tatanggapin ang mensahe. Kapag pormal ang lugar, kinakailangan ang pormal na rehistro.',
            '3. Sagot sa Pagpapahalaga: Paggalang, empatiya, at aktibong pakikinig ang mga pangunahing pagpapahalagang kailangang pairalin.'
          ]
        : [
            '1. Analysis Answer: The primary issue stems from misaligned contextual assumptions and failure to calibrate registers to the intended audience.',
            '2. Mechanism Answer: Theoretical principles dictate message fidelity; noise reduction and structured feedback loops ensure clarity.',
            '3. Ethical Answer: Respect for diverse perspectives, transparency, and professional accountability must guide discourse.'
          ],
      partBAnswers: isFilipino
        ? [
            '1. Pagsusuri: Tumpak na natukoy ng mag-aaral ang 2 tiyak na halimbawa na may malinaw na paliwanag ng konteksto.',
            '2. Repleksyon: Naipahayag nang buo ang pinakamahalagang aral na may kaugnayan sa sariling karanasan.',
            '3. Etika: Naipaliwanag ang kahalagahan ng etikal na pamantayan bilang pundasyon ng mapagkakatiwalaang ugnayan.'
          ]
        : [
            '1. Application Challenge: Accurate identification of two authentic real-world scenarios with clear cause-and-effect justification.',
            '2. Synthesis: Insight demonstrates higher-order metacognitive awareness linking theory to practice.',
            '3. Standards: Thorough articulation of ethical responsibility, accuracy, and social impact.'
          ]
    },
    rubric: {
      criteria: [
        {
          criterion: isFilipino ? 'Nilalaman at Kawastuhan' : 'Content & Conceptual Accuracy',
          exemplary4: isFilipino ? 'Komprehensibo, tumpak, at malalim ang pagkaunawa sa konsepto.' : 'Demonstrates complete, nuanced mastery with thorough evidence and precision.',
          proficient3: isFilipino ? 'Tumpak at malinaw ang karamihan sa mga ideya.' : 'Accurate and clear with sufficient explanatory depth.',
          developing2: isFilipino ? 'May mga ideyang tama ngunit may ilang kamalian o kakulangan.' : 'Partial understanding with noticeable gaps or inaccuracies.',
          beginning1: isFilipino ? 'Kulang sa kawastuhan at nangangailangan ng karagdagang gabay.' : 'Limited accuracy requiring substantial remediation.'
        },
        {
          criterion: isFilipino ? 'Organisasyon at Pagsulat' : 'Organization & Clarity of Output',
          exemplary4: isFilipino ? 'Lohikal, maayos ang transisyon, at walang mali sa gramatika.' : 'Logically sequenced with fluid transitions and professional polish.',
          proficient3: isFilipino ? 'Maayos ang daloy at madaling maunawaan.' : 'Clear structure with minor mechanical errors.',
          developing2: isFilipino ? 'May kalituhan sa daloy ng mga talata.' : 'Disorganized progression requiring reader effort.',
          beginning1: isFilipino ? 'Hindi malinaw ang pagkakabuo ng mga ideya.' : 'Lacks coherent structure.'
        },
        {
          criterion: isFilipino ? 'Pagtutulungan sa Grupo' : 'Collaborative Engagement (Part A)',
          exemplary4: isFilipino ? 'Lahat ng kasapi ay aktibo at nag-ambag sa tagumpay ng grupo.' : 'Exemplary teamwork, shared leadership, and mutual respect.',
          proficient3: isFilipino ? 'Karamihan ng kasapi ay nakibahagi nang maayos.' : 'Constructive participation by most cluster members.',
          developing2: isFilipino ? 'Iilan lamang ang gumawa at nag-ambag.' : 'Unequal participation with reliance on 1-2 members.',
          beginning1: isFilipino ? 'Hindi nagkaisa ang grupo sa pagsasagawa.' : 'Failure to collaborate effectively.'
        }
      ]
    },
    notesForUse: [
      isFilipino
        ? 'Para sa Guro: Gamitin ang nakalaang Susi sa Pagwawasto (Answer Key) para sa mabilis at pantay na pagtataya.'
        : 'For Teacher: Reference the Standalone Teacher Answer Key for standardized and efficient evaluation.',
      isFilipino
        ? 'Maaaring ipunin ang mga natapos na LAS sa Student Portfolio bilang patunay ng pag-unlad.'
        : 'Completed sheets should be archived into the student portfolio as evidence of trimester competency mastery.'
    ]
  };
}

function createSlidesForPlan(
  entry: ILAWBOWEntry,
  topic: string,
  teacher: string,
  school: string,
  sessionDates: string[]
): ILAWSlide[] {
  const slides: ILAWSlide[] = [];
  const sessionCount = sessionDates.length;

  // 1. Title Slide
  slides.push({
    slideNumber: 1,
    sessionNumber: 1,
    type: 'title',
    title: topic,
    subtitle: `${entry.subject} • ${entry.grade} • ${entry.term}`,
    badge: 'ILAW MASTER CLASSROOM SLIDES',
    bodyBullets: [
      `School: ${school}`,
      `Teacher-Developer: ${teacher}`,
      `Curriculum Standard: DepEd Order No. 3, s. 2026`,
      `Instructional Window: ${sessionDates[0] || 'Term Launch'}`
    ],
    speakerNotes: 'Welcome the class. Introduce the week-long learning intentions and explain the assessment criteria.'
  });

  // 2. Learning Objectives Slide
  slides.push({
    slideNumber: 2,
    sessionNumber: 1,
    type: 'objective',
    title: 'Learning Targets',
    subtitle: 'What we will achieve this week',
    badge: 'INTENTIONS',
    bodyBullets: [
      `Understand: ${entry.learningCompetency.substring(0, 80)}...`,
      'Analyze: Real-world applications and contextual cases',
      'Execute: Collaborative workshops and individual mastery outputs',
      'Apply: 21st Century Skills (Critical Thinking & Collaboration)'
    ],
    speakerNotes: 'Read the targets chorally. Emphasize the importance of the competency in their specific track.'
  });

  // Loop through sessions to create dynamic content
  for (let sNum = 1; sNum <= sessionCount; sNum++) {
    const sDate = sessionDates[sNum - 1] || `Session ${sNum}`;
    
    // Session Title Slide (except Session 1 which had the main title)
    if (sNum > 1) {
      slides.push({
        slideNumber: slides.length + 1,
        sessionNumber: sNum,
        type: 'title',
        title: `Session ${sNum}: ${sNum === sessionCount ? 'Final Mastery' : 'Deeping Mastery'}`,
        subtitle: `${topic} • ${sDate}`,
        badge: `ILAW SESSION ${sNum}`,
        bodyBullets: [
          `Target: ${sNum === sessionCount ? 'Summative Synthesis & Reflection' : 'Refining Analytical Models'}`,
          'Review of previous session key concepts',
          'Materials: LAS ' + sNum + ' and project tools'
        ],
        speakerNotes: `Start Session ${sNum}. Review progress from the previous session.`
      });
    }

    // Elicit/Engage for each session
    slides.push({
      slideNumber: slides.length + 1,
      sessionNumber: sNum,
      type: 'engage',
      title: sNum === 1 ? 'Recall & Activate' : 'Session Connection',
      subtitle: sNum === 1 ? 'Connecting to prior knowledge' : 'Review and Bridge',
      badge: `S${sNum}: ELICIT`,
      bodyBullets: [
        sNum === 1 ? `What comes to mind when you hear "${topic}"?` : `Recall the main insight from Session ${sNum - 1}.`,
        'Share your thoughts with your cluster.',
        'How does this relate to your specific track/specialization?'
      ],
      speakerNotes: 'Brief activation activity.'
    });

    // Explore (Group Task)
    slides.push({
      slideNumber: slides.length + 1,
      sessionNumber: sNum,
      type: 'explore',
      title: 'Cluster Investigation',
      subtitle: 'Collaborative Inquiry Phase',
      badge: `S${sNum}: EXPLORE`,
      bodyBullets: [
        `Refer to LAS ${sNum}: Part A (Collaborative Task).`,
        'Work with your assigned team members.',
        'Apply the standard analytical matrix provided.',
        '20 minutes for investigation.'
      ],
      speakerNotes: 'Facilitate group work.'
    });

    // Explain (Direct Instruction)
    slides.push({
      slideNumber: slides.length + 1,
      sessionNumber: sNum,
      type: 'explain',
      title: 'Concept Deep Dive',
      subtitle: 'Theoretical Foundations',
      badge: `S${sNum}: EXPLAIN`,
      bodyBullets: [
        `Key Principle: ${sNum === 1 ? 'Foundational Definitions' : 'Advanced Applications'}`,
        'Understanding the causal relationships',
        'Bridging theory to industrial standards',
        'Answering synthesis questions on LAS ' + sNum
      ],
      speakerNotes: 'Explain the core logic of the session.'
    });

    // Integration Slide (every session)
    slides.push({
      slideNumber: slides.length + 1,
      sessionNumber: sNum,
      type: 'explain',
      title: 'Professional Linkage',
      subtitle: 'Track & Career Integration',
      badge: `S${sNum}: INTEGRATION`,
      bodyBullets: [
        'How this skill is used in the workplace',
        'DepEd NC II/III Alignment (where applicable)',
        'Standards of professional ethics',
        'Preparing for the 21st-century labor market'
      ],
      speakerNotes: 'Make it relevant to their future.'
    });

    // Synthesis/Individual Task
    slides.push({
      slideNumber: slides.length + 1,
      sessionNumber: sNum,
      type: 'synthesis',
      title: 'Individual Synthesis',
      subtitle: 'Mastering the Session Output',
      badge: `S${sNum}: ELABORATE`,
      bodyBullets: [
        `Complete LAS ${sNum}: Part B (Individual Task).`,
        'Apply the 4-Criteria Rubric.',
        'Document your personal insights and findings.',
        'Prepare for peer verification.'
      ],
      speakerNotes: 'Ensure everyone finishes their individual tasks.'
    });
  }

  // Final Wrap-up Slide
  slides.push({
    slideNumber: slides.length + 1,
    sessionNumber: sessionCount,
    type: 'synthesis',
    title: 'Weekly Wrap-Up',
    subtitle: 'From Awareness to Mastery',
    badge: 'WRAP-UP',
    bodyBullets: [
      'Recap of the Week\'s Learning Journey',
      'Submission of all 4/5 Learning Activity Sheets',
      'Preparation for next week\'s BOW competency',
      'Exit Ticket: The most important lesson learned'
    ],
    speakerNotes: 'Close the week. Celebrate their achievements.'
  });

  return slides;
}
