#include "statistical_features.h"

#include <unordered_map>
#include <vector>
#include <algorithm>

using namespace std;

double StatisticalFeatures::repetitionScore(const ProcessedText& text)
{
    if(text.words.empty())
        return 0.0;

    unordered_map<string,int> frequency;

    for(const auto& word : text.words)
        frequency[word]++;

    int repeated = 0;

    for(const auto& item : frequency)
    {
        if(item.second > 1)
            repeated += item.second - 1;
    }

    return static_cast<double>(repeated) /
           text.words.size();
}

double StatisticalFeatures::zipfScore(const ProcessedText& text)
{
    if(text.words.size() < 5)
        return 0.0;

    unordered_map<string,int> frequency;

    for(const auto& word : text.words)
        frequency[word]++;

    vector<int> counts;

    for(const auto& item : frequency)
        counts.push_back(item.second);

    sort(
        counts.begin(),
        counts.end(),
        greater<int>()
    );

    double deviation = 0.0;

    for(size_t i=1;i<counts.size();i++)
    {
        double expected =
            (double)counts[0] / (i+1);

        deviation +=
            abs(counts[i]-expected);
    }

    deviation /= counts.size();

    return 1.0/(1.0+deviation);
}