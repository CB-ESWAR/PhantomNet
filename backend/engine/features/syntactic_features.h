#ifndef SYNTACTIC_FEATURES_H
#define SYNTACTIC_FEATURES_H

#include "../models/models.h"

class SyntacticFeatures
{
public:

    static double averageSentenceLength(
        const ProcessedText& text
    );

    static double sentenceLengthVariance(
        const ProcessedText& text
    );

    static double sentenceLengthUniformity(
        const ProcessedText& text
    );

    static double averageParagraphLength(
        const ProcessedText& text
    );

};

#endif