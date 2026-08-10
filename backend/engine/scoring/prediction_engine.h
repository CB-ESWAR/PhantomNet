#ifndef PREDICTION_ENGINE_H
#define PREDICTION_ENGINE_H

#include "../models/models.h"

class PredictionEngine
{
public:

    static Prediction predict(
        const ProcessedText& text,
        const FeatureVector& features
    );

};

#endif