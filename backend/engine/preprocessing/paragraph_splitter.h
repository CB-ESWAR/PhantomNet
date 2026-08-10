#ifndef PARAGRAPH_SPLITTER_H
#define PARAGRAPH_SPLITTER_H

#include <string>
#include <vector>

class ParagraphSplitter
{
public:

    static std::vector<std::string> split(
        const std::string& text
    );

};

#endif