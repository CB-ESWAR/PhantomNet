#ifndef RELIABILITY_SCORE_H
#define RELIABILITY_SCORE_H

#include "../models/models.h"

class ReliabilityScore
{
public:

    static double calculate(
        const FeatureVector& features
    );

};

#endif