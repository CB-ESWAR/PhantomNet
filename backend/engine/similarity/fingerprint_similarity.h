#ifndef FINGERPRINT_SIMILARITY_H
#define FINGERPRINT_SIMILARITY_H

#include "../models/models.h"

class FingerprintSimilarity
{
public:

    static double compareHuman(
        const FeatureVector& features
    );

    static double compareGPT(
        const FeatureVector& features
    );

    static double compareClaude(
        const FeatureVector& features
    );

    static double compareGemini(
        const FeatureVector& features
    );

    static double compareDeepSeek(
        const FeatureVector& features
    );

    static double compareLlama(
        const FeatureVector& features
    );
};

#endif