#ifndef SENTENCE_SPLITTER_H
#define SENTENCE_SPLITTER_H

#include <string>
#include <vector>

class SentenceSplitter
{
public:

    static std::vector<std::string> split(
        const std::string& text
    );

};

#endif