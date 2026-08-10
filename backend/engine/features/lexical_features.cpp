#include "lexical_features.h"

#include <unordered_map>
#include <unordered_set>

using namespace std;

double LexicalFeatures::vocabularyDiversity(const ProcessedText& text)
{
    if(text.words.empty())
        return 0.0;

    unordered_set<string> unique(
        text.words.begin(),
        text.words.end()
    );

    return static_cast<double>(unique.size()) /
           text.words.size();
}

double LexicalFeatures::typeTokenRatio(const ProcessedText& text)
{
    return vocabularyDiversity(text);
}

double LexicalFeatures::hapaxRatio(const ProcessedText& text)
{
    if(text.words.empty())
        return 0.0;

    unordered_map<string,int> frequency;

    for(const auto& word : text.words)
        frequency[word]++;

    int hapax = 0;

    for(const auto& item : frequency)
    {
        if(item.second == 1)
            hapax++;
    }

    return static_cast<double>(hapax) /
           text.words.size();
}

double LexicalFeatures::lexicalDensity(const ProcessedText& text)
{
    if(text.words.empty())
        return 0.0;

    static unordered_set<string> stopWords =
    {
        "a","an","the","is","am","are","was","were",
        "be","been","being",
        "of","to","in","on","at","for","from",
        "by","with","into","over","under",
        "and","or","but","if","then",
        "this","that","these","those",
        "it","its","as","not"
    };

    int lexical = 0;

    for(const auto& word : text.words)
    {
        if(stopWords.find(word) == stopWords.end())
            lexical++;
    }

    return static_cast<double>(lexical) /
           text.words.size();
}

double LexicalFeatures::averageWordLength(const ProcessedText& text)
{
    if(text.words.empty())
        return 0.0;

    int total = 0;

    for(const auto& word : text.words)
        total += word.length();

    return static_cast<double>(total) /
           text.words.size();
}

double LexicalFeatures::longWordRatio(const ProcessedText& text)
{
    if(text.words.empty())
        return 0.0;

    int count = 0;

    for(const auto& word : text.words)
    {
        if(word.length() >= 7)
            count++;
    }

    return static_cast<double>(count) /
           text.words.size();
}

double LexicalFeatures::uniqueWordRatio(const ProcessedText& text)
{
    if(text.words.empty())
        return 0.0;

    unordered_set<string> unique(
        text.words.begin(),
        text.words.end()
    );

    return static_cast<double>(unique.size()) /
           text.words.size();
}