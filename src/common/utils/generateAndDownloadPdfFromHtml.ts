// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

const generateAndDownloadPdfFromHtml = (elementId: string, documentName = 'document') => {
  const input = document.getElementById(elementId);

  if (!input) return;

  // html2canvas(elem).then(canvas => {
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF({
  //     orientation: 'p',
  //     unit: 'px',
  //     format: 'a4'
  //   });
  //   // Setting the font to Times
  //   pdf.setFont('times');
  //   const imgProps = pdf.getImageProperties(imgData);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   pdf.save(`${documentName}.pdf`);
  // });

  // html2canvas(input, {
  //   scale: 1,
  //   windowWidth: input.scrollWidth,
  //   windowHeight: input.scrollHeight,
  //   logging: true,
  //   useCORS: true
  // }).then(canvas => {
  //   const pdf = new jsPDF('p', 'mm', 'a4'); // set to use A4 paper size
  //   const margin = 20; // all sides margin
  //   const contentWidth = 210 - 2 * margin; // the content width
  //   const contentHeight = 297 - 2 * margin; // the content height
  //
  //   const imgWidth = contentWidth;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //   let heightLeft = imgHeight;
  //
  //   let position = margin; // start position for the image on the first page
  //
  //   pdf.addImage(canvas, 'PNG', margin, position, imgWidth, imgHeight);
  //   heightLeft -= contentHeight - position;
  //
  //   while (heightLeft > 0) {
  //     position = margin - (imgHeight - heightLeft); // adjust position for next slice
  //     pdf.addPage();
  //     pdf.addImage(canvas, 'PNG', margin, position, imgWidth, imgHeight);
  //     heightLeft -= contentHeight;
  //   }
  //
  //   pdf.save('document.pdf');
  // });
};

export default generateAndDownloadPdfFromHtml;
