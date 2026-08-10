#include "prediction_engine.h"

#include "../fingerprint/fingerprint_engine.h"
#include "../similarity/similarity.h"

#include "../calibration/confidence_calibrator.h"
#include "../calibration/probability_mapper.h"
#include "../calibration/reliability_score.h"

#include "ensemble_engine.h"

#include <algorithm>

using namespace std;

Prediction PredictionEngine::predict(
    const ProcessedText& text,
    const FeatureVector& features)
{
    Prediction prediction;

    double fingerprint =
        FingerprintEngine::overallScore(
            text,
            features
        );

    double similarity =
        Similarity::aiSimilarity(
            features
        );

    double reliability =
        ReliabilityScore::calculate(
            features
        );

    prediction.stylometricScore =
        features.stylometricScore;

    prediction.statisticalScore =
        features.statisticalScore;

    prediction.readabilityScore =
        features.readabilityScore;

    prediction.fingerprintScore =
        fingerprint;

    prediction.similarityScore =
        similarity;

    if(text.words.size() < 20 || reliability < 0.50)
{
    prediction.verdict =
        "Insufficient Linguistic Evidence";

    prediction.aiProbability = 0.0;
    prediction.humanProbability = 0.0;

    prediction.confidence = reliability * 100.0;
    prediction.reliability = reliability * 100.0;

    prediction.reliabilityGrade =
        "Insufficient";

    prediction.evidence.push_back(
        "The available text does not provide sufficient linguistic evidence "
        "for a reliable AI detection decision."
    );

    if(text.words.size() < 20)
    {
        prediction.evidence.push_back(
            "The document contains fewer than 20 words."
        );
    }
    else
    {
        prediction.evidence.push_back(
            "The reliability score is below the minimum threshold required "
            "for a reliable classification."
        );
    }

    prediction.recommendation =
        "Provide a longer and more linguistically informative text sample "
        "for reliable analysis.";

    return prediction;
}

    double rawScore =
        EnsembleEngine::combine(
            features,
            fingerprint,
            similarity,
            reliability
        );

    double calibrated =
        ConfidenceCalibrator::calibrate(
            rawScore
        );

    prediction.aiProbability =
        ProbabilityMapper::map(
            calibrated
        );

    prediction.aiProbability =
        max(
            0.0,
            min(
                100.0,
                prediction.aiProbability
            )
        );

    prediction.humanProbability =
        100.0 -
        prediction.aiProbability;

    prediction.confidence =
        reliability * 100.0;

    prediction.confidence =
        max(
            0.0,
            min(
                100.0,
                prediction.confidence
            )
        );

    prediction.reliability =
        reliability * 100.0;

    prediction.reliability =
        max(
            0.0,
            min(
                100.0,
                prediction.reliability
            )
        );

    if(reliability >= 0.90)
    {
        prediction.reliabilityGrade =
            "Very High";
    }
    else if(reliability >= 0.75)
    {
        prediction.reliabilityGrade =
            "High";
    }
    else if(reliability >= 0.60)
    {
        prediction.reliabilityGrade =
            "Medium";
    }
    else
    {
        prediction.reliabilityGrade =
            "Low";
    }

    if(prediction.aiProbability >= 85.0)
    {
        prediction.verdict =
            "Likely AI Generated";
    }
    else if(prediction.aiProbability >= 65.0)
    {
        prediction.verdict =
            "Possibly AI Generated";
    }
    else if(prediction.aiProbability >= 45.0)
    {
        prediction.verdict =
            "Mixed Characteristics";
    }
    else
    {
        prediction.verdict =
            "Likely Human Written";
    }

    //---------------------------------------
    // Evidence
    //---------------------------------------

    if(features.stylometricScore >= 0.70)
    {
        prediction.evidence.push_back(
            "The text shows a relatively strong "
            "stylometric signal."
        );
    }

    if(features.statisticalScore >= 0.70)
    {
        prediction.evidence.push_back(
            "Statistical characteristics show "
            "a relatively strong structured pattern."
        );
    }

    if(features.readabilityScore >= 0.70)
    {
        prediction.evidence.push_back(
            "Readability characteristics contribute "
            "a relatively strong signal."
        );
    }

    if(features.fingerprintScore >= 0.70)
    {
        prediction.evidence.push_back(
            "AI-related fingerprint patterns show "
            "a relatively strong signal."
        );
    }

    if(features.similarityScore >= 0.70)
    {
        prediction.evidence.push_back(
            "The text shows a relatively strong "
            "similarity-related signal."
        );
    }

    if(features.transitionDensity >= 0.10)
    {
        prediction.evidence.push_back(
            "Structured transition patterns were detected."
        );
    }

    if(features.templateSimilarity >= 0.50)
    {
        prediction.evidence.push_back(
            "The text contains noticeable template-like "
            "structural patterns."
        );
    }

    if(features.sentenceOpeningSimilarity >= 0.50)
    {
        prediction.evidence.push_back(
            "Similar sentence-opening patterns were detected."
        );
    }

    if(features.hedgingScore >= 0.05)
    {
        prediction.evidence.push_back(
            "Hedging language contributes to the detected "
            "linguistic pattern."
        );
    }

    if(prediction.evidence.empty())
    {
        prediction.evidence.push_back(
            "No individual feature produced a strong "
            "standalone signal."
        );
    }

    //---------------------------------------
    // Recommendation
    //---------------------------------------

    if(prediction.aiProbability >= 65.0)
    {
        prediction.recommendation =
            "Review the highlighted linguistic patterns "
            "and supporting evidence before making a final decision.";
    }
    else
    {
        prediction.recommendation =
            "The writing shows predominantly human-like "
            "characteristics based on the available evidence.";
    }

    return prediction;
}