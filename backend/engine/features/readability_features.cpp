#include "readability_features.h"
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

static int estimateSyllables(
    const ProcessedText& text)
{
    int total = 0;

    const string vowels = "aeiouy";

    for(const auto& word : text.words)
    {
        int syllables = 0;

        bool previousVowel = false;

        for(char c : word)
        {
            bool vowel =
                vowels.find(
                    tolower(c)
                ) != string::npos;

            if(vowel && !previousVowel)
                syllables++;

            previousVowel = vowel;
        }

        if(word.size()>2 &&
           word.back()=='e' &&
           syllables>1)
        {
            syllables--;
        }

        total += max(1,syllables);
    }

    return total;
}

double ReadabilityFeatures::fleschReadingEase(
    const ProcessedText& text)
{
    if(text.sentences.empty() ||
       text.words.empty())
        return 0.0;

    int syllables =
        estimateSyllables(text);

    double words =
        text.words.size();

    double sentences =
        text.sentences.size();

    return
        206.835
        - 1.015 *
        (words / sentences)
        - 84.6 *
        ((double)syllables / words);
}

double ReadabilityFeatures::fleschKincaidGrade(
    const ProcessedText& text)
{
    if(text.sentences.empty() ||
       text.words.empty())
        return 0.0;

    int syllables =
        estimateSyllables(text);

    double words =
        text.words.size();

    double sentences =
        text.sentences.size();

    return
        0.39 *
        (words / sentences)
        +
        11.8 *
        ((double)syllables / words)
        -
        15.59;
}

double ReadabilityFeatures::gunningFogIndex(
    const ProcessedText& text)
{
    if(text.sentences.empty() ||
       text.words.empty())
        return 0.0;

    int complex = 0;

    for(const auto& word : text.words)
    {
        if(word.length() >= 8)
            complex++;
    }

    return
        0.4 *
        (
            (double)text.words.size()
            /
            text.sentences.size()
            +
            100.0 *
            complex /
            text.words.size()
        );
}