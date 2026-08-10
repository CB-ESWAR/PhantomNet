#ifndef DOCX_READER_H
#define DOCX_READER_H

#include <string>

class DocxReader
{
public:

    static std::string read(
        const std::string& path
    );

};

#endif