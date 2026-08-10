#include "document_statistics.h"

#include <unordered_set>

using namespace std;

int DocumentStatistics::wordCount(
    const ProcessedText& text)
{
    return static_cast<int>(
        text.words.size()
    );
}

int DocumentStatistics::uniqueWordCount(
    const ProcessedText& text)
{
    unordered_set<string> unique(
        text.words.begin(),
        text.words.end()
    );

    return static_cast<int>(
        unique.size()
    );
}

int DocumentStatistics::sentenceCount(
    const ProcessedText& text)
{
    return static_cast<int>(
        text.sentences.size()
    );
}

int DocumentStatistics::paragraphCount(
    const ProcessedText& text)
{
    return static_cast<int>(
        text.paragraphs.size()
    );
}

int DocumentStatistics::characterCount(
    const ProcessedText& text)
{
    return static_cast<int>(
        text.original.size()
    );
}

double DocumentStatistics::readingTime(
    const ProcessedText& text)
{
    constexpr double WORDS_PER_MINUTE = 200.0;

    if(text.words.empty())
        return 0.0;

    return text.words.size() /
           WORDS_PER_MINUTE;
}

double DocumentStatistics::speakingTime(
    const ProcessedText& text)
{
    constexpr double WORDS_PER_MINUTE = 130.0;

    if(text.words.empty())
        return 0.0;

    return text.words.size() /
           WORDS_PER_MINUTE;
}