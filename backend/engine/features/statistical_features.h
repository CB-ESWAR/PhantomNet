#ifndef STATISTICAL_FEATURES_H
#define STATISTICAL_FEATURES_H

#include "../models/models.h"

class StatisticalFeatures
{
public:

    static double repetitionScore(
        const ProcessedText& text
    );

    static double zipfScore(
        const ProcessedText& text
    );

};

#endif