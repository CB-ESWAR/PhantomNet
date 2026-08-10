#ifndef VOCABULARY_PROFILER_H
#define VOCABULARY_PROFILER_H

#include "../models/models.h"

class VocabularyProfiler
{
public:

    static double richness(
        const FeatureVector& features
    );

    static std::string level(
        const FeatureVector& features
    );

};

#endif