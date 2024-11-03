#include<iostream>
using namespace std;

char a[]="I am global variable";

int main(){
    char a[]="I am local variable";

    cout << a << endl;
    cout << ::a << endl;

    return 0;
}