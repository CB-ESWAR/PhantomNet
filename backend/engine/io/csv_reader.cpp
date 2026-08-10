#include "csv_reader.h"

#include <fstream>

using namespace std;

vector<string> CsvReader::read(
    const string& path)
{
    vector<string> rows;

    ifstream file(path);

    if(!file.is_open())
    {
        return rows;
    }

    string line;

    while(getline(file, line))
    {
        rows.push_back(line);
    }

    file.close();

    return rows;
}