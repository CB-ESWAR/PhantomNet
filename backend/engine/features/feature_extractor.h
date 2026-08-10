#ifndef FEATURE_EXTRACTOR_H
#define FEATURE_EXTRACTOR_H

#include "../models/models.h"

class FeatureExtractor
{
public:

    static FeatureVector extract(
        const ProcessedText& text
    );

};

#endif