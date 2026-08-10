#include "analysis_service.h"

#include "preprocessing/tokenizer.h"
#include "features/feature_extractor.h"
#include "fingerprint/fingerprint_engine.h"
#include "similarity/similarity.h"
#include "scoring/prediction_engine.h"

using namespace std;

Prediction AnalysisService::analyzeText(
    const string& text)
{
    //---------------------------------------
    // Step 1: Preprocessing
    //---------------------------------------

    ProcessedText processed =
        Tokenizer::process(text);

    //---------------------------------------
    // Step 2: Feature Extraction
    //---------------------------------------

    FeatureVector features =
        FeatureExtractor::extract(
            processed
        );

    //---------------------------------------
    // Step 3: Fingerprint Analysis
    //---------------------------------------

    features.fingerprintScore =
        FingerprintEngine::overallScore(
            processed,
            features
        );

    //---------------------------------------
    // Step 4: Similarity Analysis
    //---------------------------------------

    features.similarityScore =
        Similarity::aiSimilarity(
            features
        );

    //---------------------------------------
    // Step 5: Final Prediction
    //---------------------------------------

    Prediction prediction =
        PredictionEngine::predict(
            processed,
            features
        );

    //---------------------------------------
    // Step 6: Engine Scores
    //---------------------------------------

    prediction.stylometricScore =
        features.stylometricScore;

    prediction.statisticalScore =
        features.statisticalScore;

    prediction.readabilityScore =
        features.readabilityScore;

    prediction.fingerprintScore =
        features.fingerprintScore;

    prediction.similarityScore =
        features.similarityScore;

    //---------------------------------------
    // Step 7: AI Model Similarities
    //---------------------------------------

    prediction.gptSimilarity =
        FingerprintEngine::gptScore(
            processed,
            features
        ) * 100.0;

    prediction.claudeSimilarity =
        FingerprintEngine::claudeScore(
            processed,
            features
        ) * 100.0;

    prediction.geminiSimilarity =
        FingerprintEngine::geminiScore(
            processed,
            features
        ) * 100.0;

    prediction.deepseekSimilarity =
        FingerprintEngine::deepseekScore(
            processed,
            features
        ) * 100.0;

    prediction.copilotSimilarity =
        FingerprintEngine::copilotScore(
            processed,
            features
        ) * 100.0;

    prediction.mistralSimilarity =
        FingerprintEngine::mistralScore(
            processed,
            features
        ) * 100.0;

    prediction.llamaSimilarity =
        FingerprintEngine::llamaScore(
            processed,
            features
        ) * 100.0;

    return prediction;
}