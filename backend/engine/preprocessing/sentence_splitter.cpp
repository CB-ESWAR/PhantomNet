#include "sentence_splitter.h"

#include <cctype>

using namespace std;

vector<string> SentenceSplitter::split(const string& text)
{
    vector<string> sentences;

    string current;

    for(char c : text)
    {
        current += c;

        if(c=='.' || c=='!' || c=='?')
        {
            if(!current.empty())
            {
                while(!current.empty() &&
                      isspace((unsigned char)current.front()))
                {
                    current.erase(current.begin());
                }

                while(!current.empty() &&
                      isspace((unsigned char)current.back()))
                {
                    current.pop_back();
                }

                if(!current.empty())
                    sentences.push_back(current);

                current.clear();
            }
        }
    }

    if(!current.empty())
    {
        while(!current.empty() &&
              isspace((unsigned char)current.front()))
        {
            current.erase(current.begin());
        }

        while(!current.empty() &&
              isspace((unsigned char)current.back()))
        {
            current.pop_back();
        }

        if(!current.empty())
            sentences.push_back(current);
    }

    return sentences;
}