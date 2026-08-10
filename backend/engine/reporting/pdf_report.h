#ifndef PDF_REPORT_H
#define PDF_REPORT_H

#include "../models/prediction.h"

#include <string>

class PdfReport
{
public:

    static std::string generate(
        const Prediction& prediction
    );

};

#endif