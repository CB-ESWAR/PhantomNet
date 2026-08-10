#ifndef HTML_REPORT_H
#define HTML_REPORT_H

#include "../models/prediction.h"

#include <string>

class HtmlReport
{
public:

    static std::string generate(
        const Prediction& prediction
    );

};

#endif