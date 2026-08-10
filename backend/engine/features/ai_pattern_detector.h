#ifndef AI_PATTERN_DETECTOR_H
#define AI_PATTERN_DETECTOR_H

#include "../models/models.h"

class AIPatternDetector
{
public:

    static double transitionDensity(
        const ProcessedText& text
    );

    static double aiPhraseDensity(
        const ProcessedText& text
    );

    static double sentenceOpeningSimilarity(
        const ProcessedText& text
    );

    static double conclusionSimilarity(
        const ProcessedText& text
    );

    static double hedgingScore(
        const ProcessedText& text
    );

    static double listPatternScore(
        const ProcessedText& text
    );

    static double templateSimilarity(
        const ProcessedText& text
    );

};

#endif