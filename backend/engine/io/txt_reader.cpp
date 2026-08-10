#include "txt_reader.h"

#include <fstream>
#include <sstream>

using namespace std;

string TxtReader::read(
    const string& path)
{
    ifstream file(path);

    if(!file.is_open())
    {
        return "";
    }

    stringstream buffer;

    buffer << file.rdbuf();

    file.close();

    return buffer.str();
}