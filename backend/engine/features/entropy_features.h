#ifndef ENTROPY_FEATURES_H
#define ENTROPY_FEATURES_H

#include "../models/models.h"

class EntropyFeatures
{
public:

    static double wordEntropy(
        const ProcessedText& text
    );

    static double characterEntropy(
        const ProcessedText& text
    );

};

#endif