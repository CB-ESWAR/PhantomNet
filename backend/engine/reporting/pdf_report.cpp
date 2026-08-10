#include "pdf_report.h"
#include "report_generator.h"

using namespace std;

string PdfReport::generate(
    const Prediction& prediction)
{
    /*
        Placeholder implementation.

        In production this function can
        generate a PDF using a library
        such as libharu or PDFium.

        Currently it returns the same
        formatted report so the backend
        architecture remains complete.
    */

    return ReportGenerator::generate(
        prediction
    );
}