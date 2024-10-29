#include <iostream>
#include <iomanip>
#include <cstring>
#include <typeinfo>
using namespace std;
int a = 125;

struct data
{
    char name[15];
};
int main()
{

    cout<<"1. Input output operator"<<endl;
    // int a;
    cout << "Hello world" << endl; // cout operator used to display
    // cin >> a;                      //this operator used to get input from the user


    cout<<"2. Scope resolution operator"<<endl;
    cout << ::a << endl; // used to access global variable


    cout<<"3. member referencing operator" <<endl;
    data person1;
    data *person2 = new data;       // use this beacause make new data and assign address to person2 pointer
    strcpy(person1.name, "Hello");  // assign value using dot
    strcpy(person2->name, "World"); // assign value using arrow

    cout << "Access data using dot " << person1.name << endl;    // access using dow
    cout << "Access data using arrow " << person2->name << endl; // access using arrow


    cout<<"4. Memory management operator"<<endl;
    data *B = new data; // make new data and assign location to B pointer
    delete B;           // delete pointer variable


    cout<<"5. manipulators operator"<<endl;
    cout << "this function use for new line " << endl;
    cout << setw(40) << "this function use for set width " << endl;

    double c = 12.8145975456548;
    cout << setprecision(5) << c << endl;
    cout << setprecision(8) << c << endl;

    cout.precision(4);
    cout << fixed << c << endl;
    cout << scientific << c << endl;

    cout << setfill('*') << setw(10) << "123" << endl;


    cout<<"6. Type cast operator"<<endl;
    /*c-style cast*/
    /* int a1=458;
     float f1=(float)a1;
     cout << f1<endl; */

    /*function-style cast*/
    /*float a1=12.1530;
     int f1=int(a1);
     cout<< f1 <<endl;*/

    /*specific cast*/
    /*1. static cast*/
    /*int num = 12;
    double num2 = static_cast<double>(num);
    cout << typeid(num2).name() << endl;*/

    // there are three more cast but it working in class,pointer and constant


    cout<<"7. Arithmetic operator"<<endl;
    int a1 = 4;
    int b1 = 5;

    cout<<"i. unary operator"<<endl;
    a1++;
    ++b1;
    b1--;
    --b1;

    cout<< "ii. binary operator"<<endl;
    cout << a1 + b1 << endl;
    cout << a1 - b1 << endl;
    cout << a1 / b1 << endl;
    cout << a1 * b1 << endl;
    cout << a1 % b1 << endl;

    cout<< "8. Relational operator"<<endl;
    cout << ((a1 == b1) ? "true" : "false") << endl;
    cout << ((a1 != b1) ? "true" : "false") << endl;
    cout << ((a1 <= b1) ? "true" : "false") << endl;
    cout << ((a1 >= b1) ? "true" : "false") << endl;
    cout << ((a1 < b1) ? "true" : "false") << endl;
    cout << ((a1 > b1) ? "true" : "false") << endl;

    cout << "9. Logical operator" << endl;
    cout << ((a1 > b1 && a1 <= b1) ? "true" : "false") << endl;
    cout << ((a1 > b1 || a1 >= b1) ? "true" : "false") << endl;
    cout << ((!a1) ? "true" : "false") << endl;

    cout << "10. bitwise operator" << endl;
    unsigned int a = 60; // Binary: 0011 1100
    unsigned int b = 13; // Binary: 0000 1101

    // Bitwise AND
    cout << "a & b = " << (a & b) <<endl; // Output: 12

    // Bitwise OR
    cout << "a | b = " << (a | b) <<endl; // Output: 61

    // Bitwise XOR
    cout << "a ^ b = " << (a ^ b) <<endl; // Output: 49

    // Bitwise NOT
    cout << "~a = " << (~a) <<endl; // Output: 4294967235 (if unsigned int is 32-bit)

    // Bitwise Left Shift
    cout << "a << 2 = " << (a << 2) <<endl; // Output: 240

    // Bitwise Right Shift
    cout << "a >> 2 = " << (a >> 2) <<endl; // Output: 15

    return 0;
}