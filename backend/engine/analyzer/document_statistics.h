#ifndef DOCUMENT_STATISTICS_H
#define DOCUMENT_STATISTICS_H

#include "../models/models.h"

class DocumentStatistics
{
public:

    static int wordCount(
        const ProcessedText& text
    );

    static int uniqueWordCount(
        const ProcessedText& text
    );

    static int sentenceCount(
        const ProcessedText& text
    );

    static int paragraphCount(
        const ProcessedText& text
    );

    static int characterCount(
        const ProcessedText& text
    );

    static double readingTime(
        const ProcessedText& text
    );

    static double speakingTime(
        const ProcessedText& text
    );
};

#endif