#include "syntactic_features.h"

#include <sstream>
#include <vector>
#include <cmath>

using namespace std;

double SyntacticFeatures::averageSentenceLength(
    const ProcessedText& text)
{
    if(text.sentences.empty())
        return 0.0;

    return static_cast<double>(
        text.words.size()
    ) / text.sentences.size();
}

double SyntacticFeatures::sentenceLengthVariance(
    const ProcessedText& text)
{
    if(text.sentences.size() < 2)
        return 0.0;

    vector<int> lengths;

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

    for(int value : lengths)
        mean += value;

    mean /= lengths.size();

    double variance = 0.0;

    for(int value : lengths)
    {
        variance +=
            (value - mean) *
            (value - mean);
    }

    return variance / lengths.size();
}

double SyntacticFeatures::sentenceLengthUniformity(
    const ProcessedText& text)
{
    if(text.sentences.size() < 2)
        return 1.0;

    double variance =
        sentenceLengthVariance(text);

    return 1.0 / (1.0 + variance);
}

double SyntacticFeatures::averageParagraphLength(
    const ProcessedText& text)
{
    if(text.paragraphs.empty())
        return 0.0;

    int totalWords = 0;

    for(const auto& paragraph : text.paragraphs)
    {
        stringstream ss(paragraph);

        string word;

        while(ss >> word)
            totalWords++;
    }

    return static_cast<double>(
        totalWords
    ) / text.paragraphs.size();
}