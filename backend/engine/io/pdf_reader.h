#ifndef PDF_READER_H
#define PDF_READER_H

#include <string>

class PdfReader
{
public:

    static std::string read(
        const std::string& path
    );

};

#endif