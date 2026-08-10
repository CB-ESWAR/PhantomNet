#ifndef FILE_LOADER_H
#define FILE_LOADER_H

#include <string>

class FileLoader
{
public:

    static std::string load(
        const std::string& path
    );

};

#endif