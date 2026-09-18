import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { COMPANY, DEFAULT_PROJECTS } from '@/data.jsx';

/**
 * Loads an image from a URL and converts it into Base64 PNG data URL.
 */
function loadImageAsBase64(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      } catch (e) {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/**
 * Generates and downloads the official Nexbuild Architects Company Profile PDF instantly.
 * Pure vector-based jsPDF + autoTable generation — fast download, zero canvas/CORS errors.
 */
export async function generateCompanyProfilePDF(customCompany, customProjects) {
  try {
    const company = customCompany || COMPANY;
    const projects = customProjects && customProjects.length > 0 ? customProjects : DEFAULT_PROJECTS;

    // Load company logo base64 asynchronously
    const logoBase64 = await loadImageAsBase64('/logo.png');

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
    const pageHeight = doc.internal.pageSize.getHeight(); // 297mm

    // Color Palette
    const primaryNavy = [15, 23, 42]; // #0f172a
    const accentOrange = [249, 115, 22]; // #f97316
    const textDark = [30, 41, 59]; // #1e293b
    const textLight = [100, 116, 139]; // #64748b

    // ─────────────────────────────────────────────────────────────
    // PAGE 1: COVER PAGE & EXECUTIVE SUMMARY
    // ─────────────────────────────────────────────────────────────

    // Top Header Banner
    doc.setFillColor(...primaryNavy);
    doc.rect(0, 0, pageWidth, 55, 'F');

    // Accent Line
    doc.setFillColor(...accentOrange);
    doc.rect(0, 55, pageWidth, 3, 'F');

    // Add Logo to top right of header banner if available
    if (logoBase64) {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(pageWidth - 46, 7, 32, 32, 4, 4, 'F');
      try {
        doc.addImage(logoBase64, 'PNG', pageWidth - 44, 9, 28, 28);
      } catch (err) {
        console.warn('Could not render logo in PDF:', err);
      }
    }

    // Company Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('OFFICIAL CORPORATE COMPANY PROFILE & PORTFOLIO', 14, 18);

    doc.setFontSize(18);
    doc.text(company.legalName || company.name, 14, 28);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(203, 213, 225);
    doc.text(company.tagline || 'Designing Spaces. Building Futures.', 14, 35);

    doc.setFontSize(8.5);
    doc.text(
      `Reg No: ${company.companyRegNo || '391105/82/83'} | PAN/VAT: ${company.vatNo || '623604209'} | NEA Certified Structural Engineers`,
      14,
      44
    );
    doc.text(`Head Office: ${company.address || 'Kathmandu, Nepal'} | Tel: ${company.phone || '+977 9843604439'}`, 14, 50);

    // Executive Summary Section
    let yPos = 70;
    doc.setTextColor(...textDark);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('1. EXECUTIVE SUMMARY & CORPORATE OVERVIEW', 14, yPos);

    yPos += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...textDark);

    const descLines = doc.splitTextToSize(
      company.description ||
        'Nexbuild Architects And Construction Pvt. Ltd. is a leading Nepal-based engineering and construction company delivering high-end residential villas, commercial buildings, corporate office fit-outs, and public infrastructure across Kathmandu Valley, Pokhara, Chitwan, and Bagmati Province.',
      182
    );
    doc.text(descLines, 14, yPos);
    yPos += descLines.length * 5 + 4;

    const historyText =
      company.history ||
      `Established in ${company.foundedYear || 2021}, Nexbuild Architects has completed ${projects.length}+ major real-world projects. Our team of senior structural engineers and architects specializes in Vastu-compliant designs, 3D BIM elevation modeling, earthquake-resistant RCC construction following NBC 105:2020 seismic standards, and municipal map approval filings.`;
    const historyLines = doc.splitTextToSize(historyText, 182);
    doc.text(historyLines, 14, yPos);
    yPos += historyLines.length * 5 + 8;

    // Statistics Grid Box
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, yPos, 182, 32, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...accentOrange);
    doc.text(`${projects.length}+`, 35, yPos + 12, { align: 'center' });
    doc.text(`${company.stats?.happyClients || '100+'}`, 80, yPos + 12, { align: 'center' });
    doc.text(`${company.stats?.yearsExperience || '6+'}`, 125, yPos + 12, { align: 'center' });
    doc.text(`${company.stats?.professionals || '25+'}`, 170, yPos + 12, { align: 'center' });

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryNavy);
    doc.text('COMPLETED PROJECTS', 35, yPos + 22, { align: 'center' });
    doc.text('SATISFIED CLIENTS', 80, yPos + 22, { align: 'center' });
    doc.text('YEARS EXPERIENCE', 125, yPos + 22, { align: 'center' });
    doc.text('ENGINEERS & STAFF', 170, yPos + 22, { align: 'center' });

    yPos += 42;

    // Vision & Mission Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textDark);
    doc.text('2. VISION & MISSION', 14, yPos);

    yPos += 6;
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(14, yPos, 182, 22, 2, 2, 'F');
    doc.setTextColor(249, 115, 22);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('OUR VISION:', 18, yPos + 7);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const visionLines = doc.splitTextToSize(company.vision || 'To be Nepal’s leading architectural & construction firm.', 174);
    doc.text(visionLines, 18, yPos + 13);

    yPos += 26;
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(14, yPos, 182, 22, 2, 2, 'F');
    doc.setTextColor(249, 115, 22);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('OUR MISSION:', 18, yPos + 7);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const missionLines = doc.splitTextToSize(company.mission || 'To deliver reliable, NBC-compliant construction with integrity.', 174);
    doc.text(missionLines, 18, yPos + 13);

    yPos += 30;

    // Core Services Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textDark);
    doc.text('3. CORE SERVICES', 14, yPos);

    yPos += 6;
    const servicesList = [
      ['• Residential Design & Construction', 'Villas, Multi-storey Homes, Bungalows, Duplexes'],
      ['• Commercial & Corporate Fit-outs', 'Airlines Offices, Retail Complexes, Hotels, Resorts'],
      ['• Structural Engineering & NBC Compliance', 'Seismic Design (NBC 105:2020), ETABS Analysis'],
      ['• Municipal Map Approval Filings', 'Kathmandu & Lalitpur Municipal Permitting Files'],
      ['• Turnkey Interior Design & Joinery', 'Custom Modular Kitchens, False Ceilings, Lighting']
    ];

    servicesList.forEach(([title, desc]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...primaryNavy);
      doc.text(title, 14, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textLight);
      doc.text(` — ${desc}`, 80, yPos);
      yPos += 5.5;
    });

    // ─────────────────────────────────────────────────────────────
    // PAGE 2: TOP 25 MAJOR COMPLETED PROJECTS SHOWCASE
    // ─────────────────────────────────────────────────────────────
    doc.addPage();

    const top25Projects = projects.slice(0, 25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...textDark);
    doc.text('4. TOP 25 MAJOR COMPLETED PROJECTS SHOWCASE', 14, 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...textLight);
    doc.text('Detailed breakdown of flagship construction & architectural landmarks executed by Nexbuild Architects.', 14, 24);

    const top25Rows = top25Projects.map((p, idx) => [
      (idx + 1).toString(),
      p.title || 'Landmark Project',
      p.location || 'Kathmandu, Nepal',
      p.category || 'Residential',
      p.area || 'Standard',
      (p.year || 2025).toString(),
      p.client || 'Private Client'
    ]);

    autoTable(doc, {
      startY: 28,
      head: [['S.N.', 'Major Project Title', 'Location', 'Category', 'Built Area', 'Year', 'Client Name']],
      body: top25Rows,
      theme: 'grid',
      headStyles: {
        fillColor: [249, 115, 22], // Accent orange
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
        halign: 'left',
      },
      bodyStyles: {
        fontSize: 7.5,
        textColor: [30, 41, 59],
        cellPadding: 2,
      },
      alternateRowStyles: {
        fillColor: [255, 247, 237],
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 54, fontStyle: 'bold' },
        2: { cellWidth: 38 },
        3: { cellWidth: 22 },
        4: { cellWidth: 20 },
        5: { cellWidth: 14, halign: 'center' },
        6: { cellWidth: 24 },
      },
      margin: { left: 14, right: 14, bottom: 15 },
    });

    // ─────────────────────────────────────────────────────────────
    // PAGE 3: EQUIPMENT, CERTIFICATIONS & CONTACT INFO
    // ─────────────────────────────────────────────────────────────
    doc.addPage();
    let endY = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...textDark);
    doc.text('5. EQUIPMENT, TECHNICAL RESOURCES & CERTIFICATIONS', 14, endY);
    endY += 8;

    // Equipment Table
    const equipmentRows = (company.equipment || [
      { category: 'Surveying & Geospatial', items: 'Leica Total Station, Automatic Optical Levels, GPS Survey Instruments' },
      { category: 'Structural Concrete', items: 'Heavy Duty Concrete Mixers, Needle Vibrators, Concrete Batching Units' },
      { category: 'Steel & Formwork', items: 'Rebar Cutting & Bending Machines, Tubular Steel Scaffolding' },
      { category: 'Digital & Computing', items: 'High-Performance 3D CAD/BIM Workstations, Structural ETABS & SAFE' }
    ]).map((eq) => [eq.category, eq.items]);

    autoTable(doc, {
      startY: endY,
      head: [['Resource Category', 'Machinery, Tools & Technical Assets']],
      body: equipmentRows,
      theme: 'striped',
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontSize: 8.5 },
      bodyStyles: { fontSize: 8 },
      margin: { left: 14, right: 14 },
    });

    endY = doc.lastAutoTable.finalY + 12;

    // Registrations Box
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...textDark);
    doc.text('6. LEGAL REGISTRATION & CREDENTIALS', 14, endY);
    endY += 6;

    const certs = company.certifications || [
      { title: 'Company Registration Certificate', details: `Reg No. ${company.companyRegNo || '391105/82/83'}` },
      { title: 'PAN / VAT Certificate', details: `PAN/VAT No. ${company.vatNo || '623604209'}` },
      { title: 'Engineering License', details: 'Nepal Engineers Association (NEA) Certified Structural Engineers' }
    ];

    certs.forEach((c) => {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(14, endY, 182, 10, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...primaryNavy);
      doc.text(c.title, 18, endY + 6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textLight);
      doc.text(`: ${c.details}`, 75, endY + 6.5);
      endY += 12;
    });

    endY += 6;

    // Contact Card Box
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...textDark);
    doc.text('7. CORPORATE HEADQUARTERS & INQUIRIES', 14, endY);
    endY += 6;

    doc.setFillColor(15, 23, 42);
    doc.roundedRect(14, endY, 182, 38, 3, 3, 'F');

    doc.setTextColor(249, 115, 22);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('OFFICIAL CORPORATE CONTACT', 20, endY + 10);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Company Name: ${company.legalName || company.name}`, 20, endY + 18);
    doc.text(`Address: ${company.address || 'Babarmahal, Rajesh Marg, Kathmandu, Nepal'}`, 20, endY + 24);
    doc.text(`Phone / WhatsApp: ${company.phone || '+977 9843604439'} | Email: ${company.email || 'nexbuild44@gmail.com'}`, 20, endY + 30);

    // Apply header & footer on all pages
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      if (i > 1) {
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(148, 163, 184);
        doc.setDrawColor(226, 232, 240);
        doc.line(14, 10, pageWidth - 14, 10);
        doc.text(`${company.legalName || 'Nexbuild Architects'} — Official Company Profile`, 14, 8);
      }

      // Footer
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.setDrawColor(226, 232, 240);
      doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);
      doc.text(`Headquarters: ${company.address || 'Kathmandu, Nepal'} | Tel: ${company.phone || '+977 9843604439'}`, 14, pageHeight - 7);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 28, pageHeight - 7);
    }

    // Save with official filename format
    doc.save('Nexbuild_Architects_Company_Profile.pdf');
    return true;
  } catch (err) {
    console.error('jsPDF generation failed:', err);
    window.print();
    return false;
  }
}
