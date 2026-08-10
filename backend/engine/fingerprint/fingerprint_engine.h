#ifndef FINGERPRINT_ENGINE_H
#define FINGERPRINT_ENGINE_H

#include "../models/models.h"

class FingerprintEngine
{
public:

    static double gptScore(
        const ProcessedText& text,
        const FeatureVector& features
    );

    static double claudeScore(
        const ProcessedText& text,
        const FeatureVector& features
    );

    static double geminiScore(
        const ProcessedText& text,
        const FeatureVector& features
    );

    static double deepseekScore(
        const ProcessedText& text,
        const FeatureVector& features
    );

    static double copilotScore(
        const ProcessedText& text,
        const FeatureVector& features
    );

    static double mistralScore(
        const ProcessedText& text,
        const FeatureVector& features
    );

    static double llamaScore(
        const ProcessedText& text,
        const FeatureVector& features
    );

    static double overallScore(
        const ProcessedText& text,
        const FeatureVector& features
    );

};

#endif