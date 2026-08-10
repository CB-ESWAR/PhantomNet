#include <iostream>
#include <string>

#include "analysis_service.h"
#include "io/file_loader.h"
#include "reporting/report_generator.h"
#include "reporting/json_report.h"

using namespace std;

int main(int argc, char* argv[])
{
    if(argc > 1 && string(argv[1]) == "--api")
    {
        string text;
        string line;

        while(getline(cin, line))
        {
            if(!text.empty())
                text += "\n";

            text += line;
        }

        if(text.empty())
        {
            cerr << "Input text is empty.";
            return 1;
        }

        Prediction prediction =
            AnalysisService::analyzeText(text);

        cout <<
            JsonReport::generate(prediction);

        return 0;
    }

    cout << "=========================================\n";
    cout << "          PHANTOMNET v1.0\n";
    cout << "=========================================\n\n";

    while(true)
    {
        cout << "1. Analyze Text\n";
        cout << "2. Analyze File\n";
        cout << "3. Exit\n\n";

        cout << "Enter Choice : ";

        int choice;

        if(!(cin >> choice))
        {
            cin.clear();
            cin.ignore(10000, '\n');

            cout << "\nInvalid Choice.\n\n";
            continue;
        }

        cin.ignore(10000, '\n');

        if(choice == 1)
        {
            cout << "\nEnter Text:\n\n";

            string text;
            getline(cin, text);

            if(text.empty())
            {
                cout << "\nInput cannot be empty.\n\n";
                continue;
            }

            Prediction prediction =
                AnalysisService::analyzeText(text);

            cout << "\n";
            cout << ReportGenerator::generate(prediction);
            cout << "\n";
        }
        else if(choice == 2)
        {
            cout << "\nEnter File Path : ";

            string path;
            getline(cin, path);

            string text =
                FileLoader::load(path);

            if(text.empty())
            {
                cout << "\nUnable to read file.\n\n";
                continue;
            }

            Prediction prediction =
                AnalysisService::analyzeText(text);

            cout << "\n";
            cout << ReportGenerator::generate(prediction);
            cout << "\n";
        }
        else if(choice == 3)
        {
            cout << "\nThank you for using PhantomNet.\n";
            break;
        }
        else
        {
            cout << "\nInvalid Choice.\n\n";
        }
    }

    return 0;
}