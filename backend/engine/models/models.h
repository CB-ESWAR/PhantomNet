#ifndef MODELS_H
#define MODELS_H

#include "feature_vector.h"
#include "prediction.h"
#include "document_profile.h"
#include "dashboard_models.h"
struct ProcessedText
{
    std::string original;
    std::string normalized;

    std::vector<std::string> words;

    std::vector<std::string> sentences;

    std::vector<std::string> paragraphs;
};
#endif
