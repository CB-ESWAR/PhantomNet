#include "tokenizer.h"

#include <cctype>
#include <sstream>

using namespace std;

vector<string> Tokenizer::splitWords(
    const string& text)
{
    vector<string> words;

    string word;

    stringstream stream(text);

    while(stream >> word)
    {
        words.push_back(word);
    }

    return words;
}

ProcessedText Tokenizer::process(
    const string& text)
{
    ProcessedText result;

    result.original = text;

    result.normalized = text;

    for(char& c : result.normalized)
    {
        c = static_cast<char>(
            tolower(
                static_cast<unsigned char>(c)
            )
        );
    }

    result.words =
        splitWords(result.normalized);

    string sentence;

    for(char c : text)
    {
        sentence += c;

        if(c == '.' || c == '!' || c == '?')
        {
            if(!sentence.empty())
            {
                result.sentences.push_back(
                    sentence
                );

                sentence.clear();
            }
        }
    }

    if(!sentence.empty())
    {
        result.sentences.push_back(
            sentence
        );
    }

    string paragraph;

    stringstream paragraphStream(text);

    while(getline(
        paragraphStream,
        paragraph,
        '\n'))
    {
        if(!paragraph.empty())
        {
            result.paragraphs.push_back(
                paragraph
            );
        }
    }

    return result;
}