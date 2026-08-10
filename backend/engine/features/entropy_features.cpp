#include "entropy_features.h"

#include <unordered_map>
#include <cmath>

using namespace std;

double EntropyFeatures::wordEntropy(const ProcessedText& text)
{
    if(text.words.empty())
        return 0.0;

    unordered_map<string,int> frequency;

    for(const auto& word : text.words)
        frequency[word]++;

    double entropy = 0.0;

    for(const auto& item : frequency)
    {
        double probability =
            static_cast<double>(item.second) /
            text.words.size();

        entropy -=
            probability *
            log2(probability);
    }

    return entropy;
}

double EntropyFeatures::characterEntropy(const ProcessedText& text)
{
    if(text.normalized.empty())
        return 0.0;

    unordered_map<char,int> frequency;

    int total = 0;

    for(char c : text.normalized)
    {
        if(c == ' ')
            continue;

        frequency[c]++;
        total++;
    }

    if(total == 0)
        return 0.0;

    double entropy = 0.0;

    for(const auto& item : frequency)
    {
        double probability =
            static_cast<double>(item.second) /
            total;

        entropy -=
            probability *
            log2(probability);
    }

    return entropy;
}