#include "file_loader.h"

#include "txt_reader.h"
#include "pdf_reader.h"
#include "docx_reader.h"

#include <algorithm>

using namespace std;

string FileLoader::load(
    const string& path)
{
    string extension = path;

    transform(
        extension.begin(),
        extension.end(),
        extension.begin(),
        ::tolower
    );

    if(extension.size() >= 4 &&
       extension.substr(extension.size()-4) == ".txt")
    {
        return TxtReader::read(path);
    }

    if(extension.size() >= 4 &&
       extension.substr(extension.size()-4) == ".pdf")
    {
        return PdfReader::read(path);
    }

    if(extension.size() >= 5 &&
       extension.substr(extension.size()-5) == ".docx")
    {
        return DocxReader::read(path);
    }

    return "";
}