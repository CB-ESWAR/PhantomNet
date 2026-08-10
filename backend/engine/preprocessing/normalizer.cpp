#include "normalizer.h"

#include <algorithm>
#include <cctype>

using namespace std;

string Normalizer::normalize(const string& text)
{
    string result = text;

    result = normalizeQuotes(result);

    result = normalizePunctuation(result);

    result = toLowerCase(result);

    result = removeExtraSpaces(result);

    return result;
}

string Normalizer::toLowerCase(const string& text)
{
    string result = text;

    transform(
        result.begin(),
        result.end(),
        result.begin(),
        [](unsigned char c)
        {
            return tolower(c);
        }
    );

    return result;
}

string Normalizer::removeExtraSpaces(const string& text)
{
    string result;

    bool previousSpace = false;

    for(char c : text)
    {
        if(isspace((unsigned char)c))
        {
            if(!previousSpace)
            {
                result += ' ';
                previousSpace = true;
            }
        }
        else
        {
            result += c;
            previousSpace = false;
        }
    }

    while(!result.empty() && result.front()==' ')
        result.erase(result.begin());

    while(!result.empty() && result.back()==' ')
        result.pop_back();

    return result;
}

string Normalizer::normalizeQuotes(const string& text)
{
    string result = text;

    for(char& c : result)
    {
        if(c=='`')
            c='\'';
    }

    return result;
}

string Normalizer::normalizePunctuation(const string& text)
{
    string result = text;

    for(char& c : result)
    {
        if(c=='\t')
            c=' ';
    }

    return result;
}