#ifndef ANALYSIS_SERVICE_H
#define ANALYSIS_SERVICE_H

#include <string>

#include "models/models.h"

class AnalysisService
{
public:

    static Prediction analyzeText(
        const std::string& text
    );

};

#endif