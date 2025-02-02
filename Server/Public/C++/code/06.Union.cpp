#include <iostream>
#include <cstring>
using namespace std;

union Data {
    char Name[23];
    char Course[10];
};

int main() {
    Data student1;

    strcpy(student1.Name, "Rathod Pratik");
    cout << "Name: " << student1.Name << endl;

    // Storing Course in the same union overwrites the Name
    strcpy(student1.Course, "BCA");
    cout << "Course: " << student1.Course << endl;

    return 0;
}
