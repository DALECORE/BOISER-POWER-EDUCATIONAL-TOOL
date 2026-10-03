/**
 * BOISER MULTILINGUAL VOICE SCRIPTS REPOSITORY
 * Official LNNCHS Portal Dashboard & Faculty Doors Tour Guides
 * Languages: English, Tagalog, Cebuano (Bisaya)
 */

export interface VoiceScriptTranslation {
  language: string;
  code: string;
  script: {
    welcome: string;
    dashboardOverview: string;
    clickingDoors: string;
    accessRestriction: string;
    officialPositions: string;
    insideDoor: string;
    closing: string;
  };
}

export const OFFICIAL_VOICE_SCRIPTS: VoiceScriptTranslation[] = [
  {
    language: 'English',
    code: 'en-US',
    script: {
      welcome: "Welcome to the Official LNNCHS Educational Resources Portal.",
      dashboardOverview: "This is Boiser Power Tools Lite, the Universal DepEd K to 12 Educational Suite. On the dashboard, you'll find the LNNCHS School Forms SF1 to SF10 Multi-Sync Hub, where you can enroll a learner's name and instantly propagate their information across all official school forms. You'll also find the LIS Gateway, LAS Available, LRMDS Resources, the 120-Section LIS Directory, Blank DepEd Templates, the Online System Guide, the Teachers Load and Pag-Sub Assistant, Policy and Memo Documents, and the Official Memos Dashboard. Enjoy learning with Boiser Educational Resources.",
      clickingDoors: "At the bottom of the dashboard, tap the Faculty Doors button to enter the LNNCHS Adviser House and Door-to-Door Tutorial Portal. Here, every adviser and school official has their own dedicated door.",
      accessRestriction: "Important: each door is restricted to its assigned adviser or official only. No one else is permitted to enter a door that does not belong to them. This restriction exists to protect the privacy and security of learner records and official files. Enjoy learning with Boiser Educational Resources.",
      officialPositions: "You will also find dedicated doors for the school's officials: Principal III Anisah A. Sinal, Assistant Principal II Joahn J. Andot, Head Teacher Alma L. Calibo, SHS Registrar Fiel Robinson, JHS Registrar Edalyn Olis, JHS Guidance Counselor Lourdes D. Ong, SHS Guidance Counselors Melvin Tabacon and Nidalyn Jumawan, SHS Overall Coordinator Arvic Villegas, and ICT Coordinator James Deang. Enjoy learning with Boiser Educational Resources.",
      insideDoor: "Once verified as the rightful owner of the door, you will enter and immediately see a 4K TV screen inside, providing a personalized guide. This screen helps each adviser or official navigate their specific tools, such as SF1 to SF10, the Document Vault, Budget of Work, and the Summative Test Hub. Enjoy learning with Boiser Educational Resources.",
      closing: "Thank you for exploring the LNNCHS Portal and Faculty Doors. Please remember: adviser and staff-only access is strictly enforced for every door, to protect all learner and official information. Enjoy learning with Boiser Educational Resources."
    }
  },
  {
    language: 'Tagalog (Filipino)',
    code: 'fil-PH',
    script: {
      welcome: "Maligayang pagdating sa Opisyal na LNNCHS Educational Resources Portal.",
      dashboardOverview: "Ito ang Boiser Power Tools Lite, ang Universal DepEd K to 12 Educational Suite. Sa dashboard, makikita mo ang LNNCHS School Forms SF1 hanggang SF10 Multi-Sync Hub, kung saan maaari mong i-enroll ang pangalan ng mag-aaral at agarang ma-propagate ang impormasyon sa lahat ng opisyal na porma ng paaralan. Makikita rin dito ang LIS Gateway, LAS Available, LRMDS Resources, 120-Section LIS Directory, Blank DepEd Templates, Online System Guide, Teachers Load at Pag-Sub Assistant, Policy and Memo Documents, at Official Memos Dashboard. Enjoy learning with Boiser Educational Resources.",
      clickingDoors: "Sa ibaba ng dashboard, i-tap ang Faculty Doors button para pumasok sa LNNCHS Adviser House at Door-to-Door Tutorial Portal. Dito, ang bawat adviser at opisyal ng paaralan ay may sariling nakalaang pinto.",
      accessRestriction: "Mahalagang paalala: ang bawat pinto ay limitado at para lamang sa nakatalagang adviser o opisyal. Walang ibang pinapayagang pumasok sa pinto na hindi sa kanila. Ang restriksyong ito ay umiiral upang protektahan ang pribasiya at seguridad ng mga rekord ng mag-aaral at mga opisyal na dokumento. Enjoy learning with Boiser Educational Resources.",
      officialPositions: "Makikita mo rin ang mga nakalaang pinto para sa mga opisyal ng paaralan: Principal III Anisah A. Sinal, Assistant Principal II Joahn J. Andot, Head Teacher Alma L. Calibo, SHS Registrar Fiel Robinson, JHS Registrar Edalyn Olis, JHS Guidance Counselor Lourdes D. Ong, SHS Guidance Counselors Melvin Tabacon at Nidalyn Jumawan, SHS Overall Coordinator Arvic Villegas, at ICT Coordinator James Deang. Enjoy learning with Boiser Educational Resources.",
      insideDoor: "Kapag na-verify na ikaw ang may-ari ng pinto, papasok ka at agad mong makikita ang 4K TV screen sa loob na nagbibigay ng personalized guide. Tinutulungan ng screen na ito ang bawat adviser o opisyal na i-navigate ang kanilang mga tiyak na tool tulad ng SF1 hanggang SF10, Document Vault, Budget of Work, at Summative Test Hub. Enjoy learning with Boiser Educational Resources.",
      closing: "Maraming salamat sa pag-explore sa LNNCHS Portal at Faculty Doors. Mangyaring alalahanin: mahigpit na ipinatutupad ang adviser at staff-only access sa bawat pinto upang maprotektahan ang lahat ng impormasyon. Enjoy learning with Boiser Educational Resources."
    }
  },
  {
    language: 'Cebuano (Bisaya)',
    code: 'ceb-PH',
    script: {
      welcome: "Malipayong pag-abot sa Opisyal nga LNNCHS Educational Resources Portal.",
      dashboardOverview: "Kini ang Boiser Power Tools Lite, ang Universal DepEd K to 12 Educational Suite. Sa dashboard, makita nimo ang LNNCHS School Forms SF1 hangtod SF10 Multi-Sync Hub, diin pwede nimo i-enroll ang pangalan sa estudyante ug daling mapanag-iya ang impormasyon sa tanang porma sa eskwelahan. Makita usab dinhi ang LIS Gateway, LAS Available, LRMDS Resources, 120-Section LIS Directory, Blank DepEd Templates, Online System Guide, Teachers Load and Pag-Sub Assistant, Policy and Memo Documents, ug ang Official Memos Dashboard. Enjoy learning with Boiser Educational Resources.",
      clickingDoors: "Sa ubos sa dashboard, i-tap ang FacultyDoors button aron mosulod sa LNNCHS Adviser House ug Door-to-Door Tutorial Portal. Dinhi, ang matag adviser ug opisyal sa eskwelahan adunay kaugalingong pultahan.",
      accessRestriction: "Importante: ang matag pultahan gigahin lamang sa gitahasan nga adviser o opisyal. Walay lain nga gitugotan mosulod sa pultahan nga dili ilaha. Kini nga pagdili gihimo aron maprotektahan ang pribasiya ug seguridad sa mga rekord sa mga estudyante ug opisyal nga dokumento. Enjoy learning with Boiser Educational Resources.",
      officialPositions: "Makita usab nimo ang dedikadong mga pultahan para sa mga opisyal sa eskwelahan: Principal III Anisah A. Sinal, Assistant Principal II Joahn J. Andot, Head Teacher Alma L. Calibo, SHS Registrar Fiel Robinson, JHS Registrar Edalyn Olis, JHS Guidance Counselor Lourdes D. Ong, SHS Guidance Counselors Melvin Tabacon ug Nidalyn Jumawan, SHS Overall Coordinator Arvic Villegas, ug ICT Coordinator James Deang. Enjoy learning with Boiser Educational Resources.",
      insideDoor: "Sa higayon nga mapamatud-an nga ikaw ang tag-iya sa pultahan, mosulod ka ug makita dayon nimo ang 4K TV screen sa sulod nga mohatag og giya. Kini nga screen makatabang sa pag-navigate sa mga piho nga himan sama sa SF1 hangtod SF10, Document Vault, Budget of Work, ug Summative Test Hub. Enjoy learning with Boiser Educational Resources.",
      closing: "Salamat kaayo sa pagsuhid sa LNNCHS Portal ug Faculty Doors. Palihug hinumdomi: estrikto nga gipatuman ang adviser ug staff-only access sa matag pultahan aron maprotektahan ang tanang impormasyon. Enjoy learning with Boiser Educational Resources."
    }
  }
];
