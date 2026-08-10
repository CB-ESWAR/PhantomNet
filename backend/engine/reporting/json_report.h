#ifndef JSON_REPORT_H
#define JSON_REPORT_H

#include "../models/prediction.h"

#include <string>

class JsonReport
{
public:

    static std::string generate(
        const Prediction& prediction
    );
};

#endif