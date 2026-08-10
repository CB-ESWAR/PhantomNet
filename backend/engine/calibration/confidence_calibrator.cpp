#include "confidence_calibrator.h"

#include <algorithm>
#include <cmath>

using namespace std;

double ConfidenceCalibrator::calibrate(
    double rawScore)
{
    rawScore =
        max(
            0.0,
            min(1.0, rawScore)
        );

    double calibrated =
        1.0 /
        (
            1.0 +
            exp(
                -8.0 *
                (
                    rawScore - 0.5
                )
            )
        );

    return max(
        0.0,
        min(1.0, calibrated)
    );
}