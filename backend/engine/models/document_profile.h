#ifndef DOCUMENT_PROFILE_H
#define DOCUMENT_PROFILE_H

#include <string>

struct DocumentProfile
{
    // Basic Statistics
    int wordCount = 0;
    int uniqueWords = 0;
    int sentenceCount = 0;
    int paragraphCount = 0;
    int characterCount = 0;

    // Reading Metrics
    double readingTime = 0.0;
    double speakingTime = 0.0;

    // Complexity
    double averageWordLength = 0.0;
    double averageSentenceLength = 0.0;
    double vocabularyRichness = 0.0;

    // Classification
    std::string readabilityLevel;
    std::string writingStyle;

    // Language
    std::string language = "English";
};

#endif