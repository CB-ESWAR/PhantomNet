#ifndef DATASET_ANALYZER_H
#define DATASET_ANALYZER_H

#include <string>

class DatasetAnalyzer
{
public:

    static void analyze(
        const std::string& datasetPath,
        const std::string& outputCSV
    );

};

#endif