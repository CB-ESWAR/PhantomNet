#ifndef ENSEMBLE_ENGINE_H
#define ENSEMBLE_ENGINE_H

#include "../models/models.h"

class EnsembleEngine
{
public:

    static double combine(
        const FeatureVector& features,
        double fingerprintScore,
        double similarityScore,
        double reliabilityScore
    );
};

#endif