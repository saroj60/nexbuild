import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates and downloads the official Nexbuild Architects Company Profile PDF.
 * Uses HTML2Canvas + jsPDF with multi-page page breaks and print optimization.
 */
export async function generateCompanyProfilePDF(elementId = 'company-profile-document') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`PDF element with ID "${elementId}" not found. Triggering native print fallback.`);
    window.print();
    return;
  }

  try {
    // Show loading state / cursor
    document.body.style.cursor = 'wait';

    // Temporary print layout adjustment for high-DPI canvas capture
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution (300 DPI equivalent)
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Remaining pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // Save with official filename format
    pdf.save('Nexbuild_Architects_Company_Profile.pdf');
  } catch (err) {
    console.error('Error rendering jsPDF canvas:', err);
    // Fallback to browser print which allows saving as PDF
    window.print();
  } finally {
    document.body.style.cursor = 'default';
  }
}
