#include <iostream>
using namespace std;
class A{
public:
    int a = 100;
};

class B : public A{
public:
    void myfun()
    {
        cout << "Value of A from B class " << a << endl;
    }
};
class C : public A{
public:
    void myfun()
    {
        cout << "Value of A from C class " << a << endl;
    }
};
 int main(){
    B a1;
    C a2;
    a1.myfun();
    a2.myfun();
}