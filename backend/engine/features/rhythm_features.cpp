#include "rhythm_features.h"

#include <sstream>
#include <vector>
#include <cmath>

using namespace std;

double RhythmFeatures::burstiness(
    const ProcessedText& text)
{
    if(text.sentences.size() < 2)
        return 0.0;

    vector<double> lengths;

    for(const auto& sentence : text.sentences)
    {
        stringstream ss(sentence);

        string word;

        int count = 0;

        while(ss >> word)
            count++;

        lengths.push_back(count);
    }

    double mean = 0.0;

    for(double value : lengths)
        mean += value;

    mean /= lengths.size();

    double variance = 0.0;

    for(double value : lengths)
    {
        variance +=
            (value - mean) *
            (value - mean);
    }

    variance /= lengths.size();

    double deviation = sqrt(variance);

    if(mean == 0.0)
        return 0.0;

    return deviation / mean;
}

double RhythmFeatures::rhythmConsistency(
    const ProcessedText& text)
{
    return 1.0 /
           (1.0 + burstiness(text));
}

double RhythmFeatures::punctuationRhythm(
    const ProcessedText& text)
{
    if(text.sentences.empty())
        return 0.0;

    int punctuation = 0;

    for(char c : text.original)
    {
        if(c=='.' ||
           c==',' ||
           c==';' ||
           c==':' ||
           c=='!' ||
           c=='?')
        {
            punctuation++;
        }
    }

    return static_cast<double>(
        punctuation
    ) / text.sentences.size();
}

double RhythmFeatures::paragraphRhythm(
    const ProcessedText& text)
{
    if(text.paragraphs.empty())
        return 0.0;

    int total = 0;

    for(const auto& paragraph : text.paragraphs)
    {
        stringstream ss(paragraph);

        string word;

        while(ss >> word)
            total++;
    }

    return static_cast<double>(
        total
    ) / text.paragraphs.size();
}