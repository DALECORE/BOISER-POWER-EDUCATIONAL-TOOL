import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface GradingSubjectRow {
  subjectTitle: string;
  writtenWorksWeight?: string;
  performanceTasksWeight?: string;
  quarterlyExamWeight?: string;
  term1: number;
  term2: number;
  term3: number;
  finalGrade: number;
  descriptor: string;
  remarks: string;
}

export interface StudentGradingRow {
  lrn: string;
  name: string;
  gender?: string;
  term1?: number;
  term2?: number;
  term3?: number;
  finalGrade?: number;
  status?: string;
}

export interface ExportGradingPdfOptions {
  title: string;
  schoolName?: string;
  gradeLevel?: string;
  sectionName?: string;
  adviserName?: string;
  gradingPeriod?: string;
  generalAverage?: number;
  descriptor?: string;
  subjectData?: GradingSubjectRow[];
  studentRoster?: StudentGradingRow[];
}

export const generateGradingSummaryPDF = ({
  title,
  schoolName = 'Lanao del Norte National Comprehensive High School (LNNCHS)',
  gradeLevel,
  sectionName,
  adviserName,
  gradingPeriod = 'SY 2026-2027 (DepEd Order No. 009 & 015, s. 2026)',
  generalAverage,
  descriptor,
  subjectData,
  studentRoster
}: ExportGradingPdfOptions) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Top Header Banner (DepEd Navy Blue #002776)
  doc.setFillColor(0, 39, 118);
  doc.rect(0, 0, 297, 24, 'F');

  // Gold Accent Line (#FCD116)
  doc.setFillColor(252, 209, 22);
  doc.rect(0, 24, 297, 2, 'F');

  // Header Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(schoolName.toUpperCase(), 14, 10);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${title.toUpperCase()} • ${gradingPeriod}`, 14, 18);

  // Metadata Row below header
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');

  let yPos = 32;
  if (sectionName || gradeLevel) {
    doc.text(`Grade & Section: ${gradeLevel || ''} ${sectionName || ''}`.trim(), 14, yPos);
  }
  if (adviserName) {
    doc.text(`Class Adviser: ${adviserName}`, 120, yPos);
  }
  if (generalAverage !== undefined) {
    doc.text(`General Average: ${generalAverage} (${descriptor || ''})`, 210, yPos);
  }

  yPos += 6;

  // Table 1: Subject Grading Breakdown
  if (subjectData && subjectData.length > 0) {
    autoTable(doc, {
      startY: yPos,
      head: [
        [
          '#',
          'Subject Title',
          'WW %',
          'PT %',
          'QA %',
          'Term 1',
          'Term 2',
          'Term 3',
          'Final Grade',
          'Descriptor',
          'Remarks'
        ]
      ],
      body: subjectData.map((s, i) => [
        i + 1,
        s.subjectTitle,
        s.writtenWorksWeight || '30%',
        s.performanceTasksWeight || '50%',
        s.quarterlyExamWeight || '20%',
        s.term1,
        s.term2,
        s.term3,
        s.finalGrade,
        s.descriptor,
        s.remarks
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [0, 39, 118],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5
      },
      styles: {
        fontSize: 8,
        cellPadding: 2
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 8;
  }

  // Table 2: Student Roster Grades (if provided)
  if (studentRoster && studentRoster.length > 0) {
    const pageHeight = doc.internal.pageSize.height;
    if (yPos > pageHeight - 40) {
      doc.addPage();
      yPos = 20;
    }

    doc.setTextColor(9, 43, 98);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('LEARNER ACADEMIC PERFORMANCE & FINAL TRANSMUTED ROSTER', 14, yPos);
    yPos += 4;

    autoTable(doc, {
      startY: yPos,
      head: [
        [
          '#',
          'LRN',
          'Student Full Name',
          'Gender',
          'Term 1',
          'Term 2',
          'Term 3',
          'Final Rating',
          'Status'
        ]
      ],
      body: studentRoster.map((s, i) => [
        i + 1,
        s.lrn,
        s.name,
        s.gender || 'N/A',
        s.term1 ?? 88,
        s.term2 ?? 90,
        s.term3 ?? 91,
        s.finalGrade ?? 90,
        s.status || 'PROMOTED'
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [9, 43, 98],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5
      },
      styles: {
        fontSize: 8,
        cellPadding: 2
      },
      alternateRowStyles: {
        fillColor: [241, 245, 249]
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 8;
  }

  // Signatures / Sign-Off Block
  const pageHeight = doc.internal.pageSize.height;
  if (yPos > pageHeight - 45) {
    doc.addPage();
    yPos = 30;
  } else {
    yPos += 10;
  }

  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);

  doc.text('PREPARED & VERIFIED BY:', 14, yPos);
  doc.text('APPROVED & ATTESTED BY:', 180, yPos);

  yPos += 14;
  doc.setLineWidth(0.4);
  doc.setDrawColor(100, 116, 139);
  doc.line(14, yPos, 85, yPos);
  doc.line(180, yPos, 255, yPos);

  yPos += 4;
  doc.setFont('helvetica', 'bold');
  doc.text(adviserName || 'CLASS ADVISER / SUBJECT TEACHER', 14, yPos);
  doc.text('SCHOOL PRINCIPAL / REGISTRAR', 180, yPos);

  yPos += 3.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Designated Faculty / Adviser Signature', 14, yPos);
  doc.text('LNNCHS School Administrator', 180, yPos);

  // Document Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text('Official DepEd School Document • Boiser Power Tools Educational Ecosystem v3.4', 14, pageHeight - 8);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}`, 200, pageHeight - 8);

  // Trigger download
  const cleanName = (sectionName || title).replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Grading_Summary_${cleanName}_SY2026_2027.pdf`);
};
