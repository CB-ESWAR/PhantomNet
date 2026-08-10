#ifndef TXT_READER_H
#define TXT_READER_H

#include <string>

class TxtReader
{
public:

    static std::string read(
        const std::string& path
    );

};

#endif