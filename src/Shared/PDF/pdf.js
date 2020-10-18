import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

export const toPDF = async (id, name) => {
  const input = document.getElementById(id);
  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL('image/png');
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = canvas.height * imgWidth / canvas.width;
  let heightLeft = imgHeight;

  const pdf = new JsPDF('p', 'mm');
  let position = 0;
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  pdf.save(`Fiche-${name}.pdf`);
};
