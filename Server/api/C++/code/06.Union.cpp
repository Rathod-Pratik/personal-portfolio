#include <iostream>
#include <cstring> 
using namespace std;

struct Data {
    char Name[23];
    char Course[10]; 
};

int main() {
    Data student1;

    strcpy(student1.Name, "Rathod Pratik");
    strcpy(student1.Course, "BCA");

    cout << "Name: " << student1.Name << endl;
    cout << "Course: " << student1.Course << endl;

    return 0;
}
