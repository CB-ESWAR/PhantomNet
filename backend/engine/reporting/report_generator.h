#ifndef REPORT_GENERATOR_H
#define REPORT_GENERATOR_H

#include "../models/prediction.h"

#include <string>

class ReportGenerator
{
public:

    static std::string generate(
        const Prediction& prediction
    );

};

#endif