#ifndef NORMALIZER_H
#define NORMALIZER_H

#include <string>

class Normalizer
{
public:

    static std::string normalize(
        const std::string& text
    );

private:

    static std::string toLowerCase(
        const std::string& text
    );

    static std::string removeExtraSpaces(
        const std::string& text
    );

    static std::string normalizeQuotes(
        const std::string& text
    );

    static std::string normalizePunctuation(
        const std::string& text
    );
};

#endif