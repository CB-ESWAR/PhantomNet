#ifndef MARKDOWN_REPORT_H
#define MARKDOWN_REPORT_H

#include "../models/prediction.h"

#include <string>

class MarkdownReport
{
public:

    static std::string generate(
        const Prediction& prediction
    );

};

#endif