#ifndef TOKENIZER_H
#define TOKENIZER_H

#include <string>
#include "../models/models.h"

class Tokenizer
{
public:

    static ProcessedText process(
        const std::string& text
    );

private:

    static std::vector<std::string> splitWords(
        const std::string& text
    );
};

#endif