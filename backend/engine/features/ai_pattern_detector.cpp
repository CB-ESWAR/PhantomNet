#include "ai_pattern_detector.h"
#include "ai_patterns.h"

#include <algorithm>
#include <string>
#include <cctype>

using namespace std;

double AIPatternDetector::transitionDensity(
    const ProcessedText& text)
{
    if(text.normalized.empty())
        return 0.0;

    int matches = 0;

    for(const auto& phrase : AI_TRANSITIONS)
    {
        size_t pos = 0;

        while(true)
        {
            pos = text.normalized.find(phrase, pos);

            if(pos == string::npos)
                break;

            matches++;

            pos += phrase.length();
        }
    }

    return (double)matches /
           std::max(1, (int)text.sentences.size());
}

double AIPatternDetector::aiPhraseDensity(
    const ProcessedText& text)
{
    if(text.normalized.empty())
        return 0.0;

    int matches = 0;

    for(const auto& phrase : AI_TRANSITIONS)
    {
        size_t pos = 0;

        while(true)
        {
            pos = text.normalized.find(phrase, pos);

            if(pos == string::npos)
                break;

            matches++;

            pos += phrase.length();
        }
    }

    for(const auto& phrase : AI_HEDGING)
    {
        size_t pos = 0;

        while(true)
        {
            pos = text.normalized.find(phrase, pos);

            if(pos == string::npos)
                break;

            matches++;

            pos += phrase.length();
        }
    }

    return (double)matches /
           std::max(1, (int)text.sentences.size());
}

double AIPatternDetector::sentenceOpeningSimilarity(
    const ProcessedText& text)
{
    if(text.sentences.empty())
        return 0.0;

    int matches = 0;

    for(auto sentence : text.sentences)
    {
        transform(
            sentence.begin(),
            sentence.end(),
            sentence.begin(),
            [](unsigned char c)
            {
                return std::tolower(c);
            }
        );

        for(const auto& phrase : AI_OPENINGS)
        {
            if(sentence.rfind(phrase, 0) == 0)
            {
                matches++;
                break;
            }
        }
    }

    return (double)matches /
           text.sentences.size();
}

double AIPatternDetector::conclusionSimilarity(
    const ProcessedText& text)
{
    if(text.sentences.empty())
        return 0.0;

    string last = text.sentences.back();

    transform(
        last.begin(),
        last.end(),
        last.begin(),
        [](unsigned char c)
        {
            return std::tolower(c);
        }
    );

    for(const auto& phrase : AI_ENDINGS)
    {
        if(last.find(phrase) != string::npos)
            return 1.0;
    }

    return 0.0;
}

double AIPatternDetector::hedgingScore(
    const ProcessedText& text)
{
    if(text.words.empty())
        return 0.0;

    int matches = 0;

    for(const auto& word : text.words)
    {
        if(AI_HEDGING.count(word))
            matches++;
    }

    return (double)matches /
           text.words.size();
}

double AIPatternDetector::listPatternScore(
    const ProcessedText& text)
{
    if(text.original.empty())
        return 0.0;

    int bullets = 0;

    for(char c : text.original)
    {
        if(c == '-' || c == '*')
            bullets++;
    }

    return (double)bullets /
           std::max(1, (int)text.sentences.size());
}

double AIPatternDetector::templateSimilarity(
    const ProcessedText& text)
{
    double score = 0.0;

    score += transitionDensity(text);
    score += sentenceOpeningSimilarity(text);
    score += conclusionSimilarity(text);
    score += hedgingScore(text);

    return score / 4.0;
}