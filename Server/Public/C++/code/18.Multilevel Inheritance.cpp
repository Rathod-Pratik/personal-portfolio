#include<iostream>
#include<cstring>
using namespace std;

class A{
    public:
    string a="This string is used by B";
};
class B:public A{
    public:
     string b =a +"\nThis string is used by C";
};
class C:public B{
    public:
    void myfun(){
        cout << b <<endl;
    }
};
int main(){
    C a;
    a.myfun();
}