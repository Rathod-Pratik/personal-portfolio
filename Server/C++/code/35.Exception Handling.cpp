#include <iostream>
using namespace std;

int main() {
    try {
        int numerator = 10;
        int denominator = 0; 

        if (denominator == 0) {
            throw "Division by zero error!";
        }
        /*10/0 give an error*/
        int result = numerator / denominator;
        cout << "Result: " << result << endl;
    } catch (const char* e) {
        cout << "Exception caught: " << e << endl;
    }

    cout << "Program continues after exception handling." << endl;
    return 0;
}
