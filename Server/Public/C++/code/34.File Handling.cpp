#include <iostream>
#include <fstream>
#include <string>

using namespace std;
int main()
{
    /*Write content to file*/
    string A = "I am write this to file using file handling";

    /*Using constructor*/
    /*ofstream in("34.File Handle.txt");*/

    /*Using open function*/
    ofstream in;
    in.open("34.File Handle.txt");
    in << A;
    in.close();//Close file

    /*Read from file*/
    string B;
    /*Using constructor*/
    /*ifstream out("34.File Handle.txt");*/

    /*Using open function*/
    ifstream out;
    out.open("34.File Handle.txt");
    getline(out, B);
    cout << B;
    out.close();//Close file
}