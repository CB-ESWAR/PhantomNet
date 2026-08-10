#include "paragraph_splitter.h"

#include <sstream>

using namespace std;

vector<string> ParagraphSplitter::split(const string& text)
{
    vector<string> paragraphs;

    stringstream ss(text);

    string line;

    string current;

    while(getline(ss, line))
    {
        if(line.empty())
        {
            if(!current.empty())
            {
                paragraphs.push_back(current);
                current.clear();
            }
        }
        else
        {
            if(!current.empty())
                current += '\n';

            current += line;
        }
    }

    if(!current.empty())
        paragraphs.push_back(current);

    return paragraphs;
}