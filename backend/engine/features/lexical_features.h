#ifndef LEXICAL_FEATURES_H
#define LEXICAL_FEATURES_H

#include "../models/models.h"

class LexicalFeatures
{
public:

    static double vocabularyDiversity(
        const ProcessedText& text
    );

    static double typeTokenRatio(
        const ProcessedText& text
    );

    static double hapaxRatio(
        const ProcessedText& text
    );

    static double lexicalDensity(
        const ProcessedText& text
    );

    static double averageWordLength(
        const ProcessedText& text
    );

    static double longWordRatio(
        const ProcessedText& text
    );

    static double uniqueWordRatio(
        const ProcessedText& text
    );
};

#endif