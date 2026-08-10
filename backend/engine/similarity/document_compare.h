#ifndef DOCUMENT_COMPARE_H
#define DOCUMENT_COMPARE_H

#include "../models/models.h"

class DocumentCompare
{
public:

    static double compare(
        const FeatureVector& first,
        const FeatureVector& second
    );
};

#endif