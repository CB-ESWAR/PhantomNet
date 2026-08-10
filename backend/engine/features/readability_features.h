#ifndef READABILITY_FEATURES_H
#define READABILITY_FEATURES_H

#include "../models/models.h"

class ReadabilityFeatures
{
public:

    static double fleschReadingEase(
        const ProcessedText& text
    );

    static double fleschKincaidGrade(
        const ProcessedText& text
    );

    static double gunningFogIndex(
        const ProcessedText& text
    );

};

#endif