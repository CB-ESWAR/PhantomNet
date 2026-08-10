#ifndef RHYTHM_FEATURES_H
#define RHYTHM_FEATURES_H

#include "../models/models.h"

class RhythmFeatures
{
public:

    static double burstiness(
        const ProcessedText& text
    );

    static double rhythmConsistency(
        const ProcessedText& text
    );

    static double punctuationRhythm(
        const ProcessedText& text
    );

    static double paragraphRhythm(
        const ProcessedText& text
    );

};

#endif